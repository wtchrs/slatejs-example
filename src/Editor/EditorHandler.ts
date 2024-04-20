import {CodeElement, CustomEditor, CustomElementType, Format} from './CustomTypes.ts'
import {Editor, Element as SlateElement, Node, Range, Transforms} from 'slate'
import {EditorState} from './EditorHooks.ts'

export function toggleMark(editor: CustomEditor, state: EditorState, format: Format) {
  if (state[format]) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export function toggleBlock(editor: CustomEditor, state: EditorState, type: CustomElementType) {
  const isActive = state[type]

  Transforms.setNodes(
    editor,
    {type: isActive ? CustomElementType.paragraph : type},
    {match: n => SlateElement.isElement(n) && n.type !== CustomElementType.code},
  )
}

export function toggleCodeBlock(editor: CustomEditor, {code}: EditorState) {
  if (code) {
    disableCodeBlock(editor)
  } else {
    enableCodeBlock(editor)
  }
}

function disableCodeBlock(editor: CustomEditor) {
  const [[codeBlock, path]] = Editor.nodes(editor, {
    at: editor.selection as Range,
    match: n => SlateElement.isElement(n) && n.type === CustomElementType.code,
  })

  Transforms.removeNodes(editor, {
    at: path,
    match: n => SlateElement.isElement(n) && n.type === CustomElementType.code,
  })

  const lines = (codeBlock as CodeElement).children[0].text.split('\n')
  const paragraphs = lines.map(line => ({type: 'paragraph', children: [{text: line}]} as SlateElement))

  Transforms.insertNodes(editor, paragraphs, {at: path})
}

function enableCodeBlock(editor: CustomEditor) {
  const selectedNodes = Array.from(
    Editor.nodes(editor, {
      at: editor.selection as Range,
      match: (node: Node) => SlateElement.isElement(node) && Editor.isBlock(editor, node),
    }),
  )

  const start = selectedNodes[0][1]

  const newCodeElement = {
    type: 'code',
    children: [{text: ''}],
  } as SlateElement

  if (selectedNodes.length > 0) {
    const texts = selectedNodes.map(([node]) => (node as SlateElement).children.map((n) => n.text).join())
    newCodeElement.children[0].text = texts.join('\n')
    Transforms.removeNodes(editor, {at: editor.selection as Range})
  }

  Transforms.insertNodes(editor, newCodeElement, {at: start})
}

export function handleBackspace(editor: CustomEditor, state: EditorState) {
  const {selection} = editor
  const {paragraph, code} = state

  if (selection && Range.isCollapsed(selection) && !paragraph && !code) {
    // Change the type of the current node to paragraph if the cursor is at the beginning of the editor
    const {offset, path} = selection.anchor
    if (offset === 0 && path[1] === 0) {
      Transforms.setNodes(editor, {type: CustomElementType.paragraph})
      return
    }
  }

  if (
    selection && Range.isCollapsed(selection) &&
    selection.anchor.offset === 0 && selection.anchor.path.length === 2 && selection.anchor.path[1] === 0
  ) {
    // Delete the current element if the before element is image and the current element is empty
    const before = Editor.before(editor, selection, {unit: 'character'})
    console.log('before: ', before)

    if (before && before.offset === 0 && before.path.length == 2 && before.path[1] === 0) {
      const [beforeMatch] = Editor.nodes(editor, {
        at: before,
        match: n => SlateElement.isElement(n) && n.type === CustomElementType.image,
      })
      console.log('beforeMatch: ', beforeMatch)
      if (beforeMatch) {
        const [match] = Editor.nodes(editor, {at: selection, match: n => SlateElement.isElement(n)})
        const [node] = match
        console.log('node: ', node)
        if (node && SlateElement.isElement(node) && node.children.length === 1 && node.children[0].text === '') {
          console.log('delete')
          Transforms.delete(editor, {at: selection, unit: 'block'})
        }
        console.log('return')
        return
      }
    }
  }

  Transforms.delete(editor, {reverse: true, unit: 'character'})
}
