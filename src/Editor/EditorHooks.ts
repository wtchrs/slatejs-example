import {useCallback, useState} from 'react'
import {createEditor, Descendant, Editor, Element as SlateElement} from 'slate'
import {withReact} from 'slate-react'
import {withHistory} from 'slate-history'
import {CustomElementType, Format} from './CustomTypes.ts'
import {withCodeBlocks} from './plugin.ts'

export type ElementState = {
  [type in CustomElementType]: boolean
}

export type LeafState = {
  [format in Format]: boolean
}

export type EditorState =
  & ElementState
  & LeafState
  & { multilineSelected: boolean }

function getInitialValue() {
  const initialElementState = Object.keys(CustomElementType)
    .reduce((acc, key) => {
      acc[key as CustomElementType] = false
      return acc
    }, {} as Record<CustomElementType, boolean>)

  const initialLeafState = Object.keys(Format)
    .reduce((acc, key) => {
      acc[key as Format] = false
      return acc
    }, {} as Record<Format, boolean>)

  return {
    ...initialElementState,
    ...initialLeafState,
    multilineSelected: false,
  } as EditorState
}

function getElementState(editor: Editor) {
  return Object.values(CustomElementType)
    .reduce((acc, key) => {
      const [find] = Editor.nodes(editor, {match: n => SlateElement.isElement(n) && n.type === key})
      acc[key as CustomElementType] = !!find
      return acc
    }, {} as Record<CustomElementType, boolean>) as ElementState
}

function getLeafState(editor: Editor) {
  const marks = Editor.marks(editor)
  console.log(marks)
  return Object.values(Format)
    .reduce((acc, format) => {
      acc[format as Format] = Boolean(marks?.[format as Format])
      return acc
    }, {} as Record<Format, boolean>) as LeafState
}

export function useEditor() {
  const [editor] = useState(() => withReact(withHistory(withCodeBlocks(createEditor()))))
  const [state, setState] = useState<EditorState>(getInitialValue)

  const handleChange = useCallback((value: Descendant[]) => {
    const isAstChange = editor.operations.some(op => op.type === 'set_selection')
    if (isAstChange) {
      const content = JSON.stringify(value)
      localStorage.setItem('content', content)
    }

    const multilineSelected = editor.selection ?
      editor.selection.anchor.path[0] !== editor.selection.focus.path[0] :
      false

    const leafState = getLeafState(editor)
    const elementState = getElementState(editor)

    setState({
      multilineSelected,
      ...leafState,
      ...elementState,
    })
  }, [editor])

  return {editor, state, handleChange}
}
