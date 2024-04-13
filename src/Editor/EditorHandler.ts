import {CodeElement, CustomEditor, CustomElement, ParagraphElement} from './CustomTypes.ts'
import {Editor, Element as SlateElement, Node, Range, Transforms} from 'slate'
import {EditorState} from './EditorHooks.ts'

export function toggleBoldMark(editor: CustomEditor, {isBold}: EditorState) {
  if (isBold) {
    Editor.removeMark(editor, 'bold')
  } else {
    Editor.addMark(editor, 'bold', true)
  }
}

export function toggleHeadingBlock(editor: CustomEditor, {isHeading}: EditorState) {
  Transforms.setNodes(
    editor,
    {type: isHeading ? 'paragraph' : 'heading'},
    {match: n => SlateElement.isElement(n) && n.type !== 'code'},
  )
}

export function toggleQuoteBlock(editor: CustomEditor, {isQuote}: EditorState) {
  Transforms.setNodes(
    editor,
    {type: isQuote ? 'paragraph' : 'quote'},
    {match: n => SlateElement.isElement(n) && n.type !== 'code'},
  )
}

export function toggleListItemBlock(editor: CustomEditor, {isList}: EditorState) {
  const {selection} = editor
  if (!selection) return

  if (isList) {
    // const listElement = Editor.above(editor, {
    //   at: editor.selection as Range,
    //   match: n => SlateElement.isElement(n) && n.type === 'list'
    // })
    // Transforms.unwrapNodes(editor, {match: n => SlateElement.isElement(n) && n.type === 'list'})
    Transforms.setNodes(
      editor,
      {type: 'paragraph'},
      {match: n => SlateElement.isElement(n) && n.type === 'list-item'},
    )
  } else {
    Transforms.setNodes(
      editor,
      {type: 'list-item'},
      {match: n => SlateElement.isElement(n) && n.type !== 'code'},
    )
  }
}

export function toggleCodeBlock(editor: CustomEditor, {isCodeBlock}: EditorState) {
  if (isCodeBlock) {
    disableCodeBlock(editor)
  } else {
    enableCodeBlock(editor)
  }
}

function disableCodeBlock(editor: CustomEditor) {
  const [[codeBlock, path]] = Editor.nodes(editor, {
    at: editor.selection as Range,
    match: n => SlateElement.isElement(n) && n.type === 'code',
  })

  Transforms.removeNodes(editor, {
    at: path,
    match: n => SlateElement.isElement(n) && n.type === 'code',
  })

  const lines = (codeBlock as CodeElement).children[0].text.split('\n')
  const paragraphs: ParagraphElement[] = lines.map(line => ({type: 'paragraph', children: [{text: line}]}))

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
    type: 'code',
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
