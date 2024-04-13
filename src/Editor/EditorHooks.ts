import {useCallback, useState} from 'react'
import {createEditor, Descendant, Editor, Element as SlateElement} from 'slate'
import {withReact} from 'slate-react'
import {withHistory} from 'slate-history'
import {withCodeBlocks} from './plugin.ts'

export type EditorState = {
  multilineSelected: boolean
  isBold: boolean
  isCodeBlock: boolean
  isHeading: boolean
  isQuote: boolean
  isList: boolean
}

export function useEditor() {
  const [editor] = useState(() => withReact(withHistory(withCodeBlocks(createEditor()))))
  const [state, setState] = useState<EditorState>(() => ({
    multilineSelected: false,
    isBold: false,
    isCodeBlock: false,
    isHeading: false,
    isQuote: false,
    isList: false,
  }))

  const handleChange = useCallback((value: Descendant[]) => {
    const isAstChange = editor.operations.some(op => op.type === 'set_selection')
    if (isAstChange) {
      const content = JSON.stringify(value)
      localStorage.setItem('content', content)
    }

    const multilineSelected = editor.selection ?
      editor.selection.anchor.path[0] !== editor.selection.focus.path[0] :
      false

    const isBold = !!Editor.marks(editor)?.bold

    const [codeMatch] = Editor.nodes(editor, {
      match: n => SlateElement.isElement(n) && n.type === 'code',
    })

    const [headingMatch] = Editor.nodes(editor, {
      match: n => SlateElement.isElement(n) && n.type === 'heading',
    })

    const [quoteMatch] = Editor.nodes(editor, {
      match: n => SlateElement.isElement(n) && n.type === 'quote',
    })

    const [listMatch] = Editor.nodes(editor, {
      match: n => SlateElement.isElement(n) && n.type === 'list-item',
    })

    setState({
      multilineSelected,
      isBold,
      isCodeBlock: !!codeMatch,
      isHeading: !!headingMatch,
      isQuote: !!quoteMatch,
      isList: !!listMatch,
    })
  }, [editor])

  return {editor, state, handleChange}
}
