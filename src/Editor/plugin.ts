import {CustomEditor} from './CustomTypes.ts'
import {Editor, Element as SlateElement, Transforms} from 'slate'

// Slate plugin that handles the code block
export function withCodeBlock(editor: CustomEditor) {
  const {insertBreak} = editor

  editor.insertBreak = () => {
    const [match] = Editor.nodes(editor, {
      match: n => SlateElement.isElement(n) && n.type === 'code',
    })

    if (match) {
      Transforms.insertText(editor, '\n')
      return
    }

    insertBreak()
  }

  return editor
}
