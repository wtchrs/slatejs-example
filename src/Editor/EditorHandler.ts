import {CodeElement, CustomEditor, CustomElement, CustomElementType, Format} from './CustomTypes.ts'
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
  const paragraphs = lines.map(line => ({type: CustomElementType.paragraph, children: [{text: line}]}))

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

  const newCodeElement: SlateElement = {
    type: CustomElementType.code,
    children: [{text: ''}],
  }

  if (selectedNodes.length > 0) {
    const texts = selectedNodes.map(([node]) => (node as CustomElement).children.map((n) => n.text).join())
    newCodeElement.children[0].text = texts.join('\n')
    console.log(newCodeElement.children[0].text)
    Transforms.removeNodes(editor, {at: editor.selection as Range})
  }

  Transforms.insertNodes(editor, newCodeElement, {at: start})
}
