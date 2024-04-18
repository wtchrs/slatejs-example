import {CustomEditor} from './CustomTypes.ts'
import {Editor, Element as SlateElement, Range, Transforms} from 'slate'

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

export function withImages(editor: CustomEditor) {
  const {isVoid, insertBreak} = editor

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertBreak = () => {
    const [match] = Editor.nodes(editor, {
      match: n => SlateElement.isElement(n) && n.type === 'image',
    })

    if (match && editor.selection && Range.isCollapsed(editor.selection)) {
      Transforms.insertNodes(editor, {type: 'paragraph', children: [{text: ''}]})
      return
    }

    insertBreak()
  }

  return editor
}
