import {CustomEditor} from './CustomTypes.ts'
import {Editor, Element as SlateElement, Transforms} from 'slate'

export function withCodeBlocks(editor: CustomEditor) {
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
