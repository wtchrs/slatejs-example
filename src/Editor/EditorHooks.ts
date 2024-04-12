import {useCallback, useState} from 'react'
import {createEditor, Descendant, Editor, Element as SlateElement} from 'slate'
import {withReact} from 'slate-react'
import {withHistory} from 'slate-history'
import {withCodeBlock} from './plugin.ts'

export type EditorState = {
  isMultilineSelected: boolean
  isBold: boolean
  isCodeBlock: boolean
  isHeading: boolean
  isQuote: boolean
}

export function useEditor() {
  const [editor] = useState(() => withReact(withHistory(withCodeBlock(createEditor()))))
  const [state, setState] = useState<EditorState>(() => ({
    isMultilineSelected: false,
    isBold: false,
    isCodeBlock: false,
    isHeading: false,
    isQuote: false,
  }))

  const handleChange = useCallback((value: Descendant[]) => {
    const isAstChange = editor.operations.some(op => op.type === 'set_selection')
    if (isAstChange) {
      const content = JSON.stringify(value)
      localStorage.setItem('content', content)
    }

    const isMultilineSelected = editor.selection ?
      editor.selection.anchor.path[0] !== editor.selection.focus.path[0] :
      false

    const isBoldActive = Editor.marks(editor)?.bold

    const [isCodeBlockActive] = Editor.nodes(editor, {
      match: n => SlateElement.isElement(n) && n.type === 'code',
    })

    const [isHeadingActive] = Editor.nodes(editor, {
      match: n => SlateElement.isElement(n) && n.type === 'heading',
    })

    const [isQuoteActive] = Editor.nodes(editor, {
      match: n => SlateElement.isElement(n) && n.type === 'quote',
    })

    setState({
      isMultilineSelected,
      isBold: !!isBoldActive,
      isCodeBlock: !!isCodeBlockActive,
      isHeading: !!isHeadingActive,
      isQuote: !!isQuoteActive,
    })
  }, [editor])

  return {editor, state, handleChange}
}
