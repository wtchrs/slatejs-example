import {CustomEditor, CustomElementType, Format} from './CustomTypes'
import {toggleMark, toggleBlock, toggleCodeBlock} from './EditorHandler'
import {
  BiCodeAlt,
  BiBold,
  BiHeading,
  BiSolidQuoteLeft,
  BiListUl,
} from 'react-icons/bi'
import {EditorState} from './EditorHooks'

type Props = {
  editor: CustomEditor
  state: EditorState
}

const Toolbar = ({editor, state}: Props) => {
  return (
    <div className="toolbar border-b-2 px-2 bg-slate-50 flex">
      <button
        className={state.heading ? ' bg-slate-200' : ''}
        onMouseDown={(event) => {
          event.preventDefault()
          toggleBlock(editor, state, CustomElementType.heading)
        }}>
        <BiHeading className="h-5 w-5 m-1"/>
      </button>

      <button
        className={state.quote ? ' bg-slate-200' : ''}
        onMouseDown={(event) => {
          event.preventDefault()
          toggleBlock(editor, state, CustomElementType.quote)
        }}>
        <BiSolidQuoteLeft className="h-5 w-5 m-1"/>
      </button>

      <button
        className={state[CustomElementType.listItem] ? ' bg-slate-200' : ''}
        onMouseDown={(event) => {
          event.preventDefault()
          toggleBlock(editor, state, CustomElementType.listItem)
        }}>
        <BiListUl className="h-5 w-5 m-1"/>
      </button>

      <button
        className={state.code ? ' bg-slate-200' : ''}
        onMouseDown={(event) => {
          event.preventDefault()
          toggleCodeBlock(editor, state)
        }}>
        <BiCodeAlt className="h-5 w-5 m-1"/>
      </button>

      <div className="border-l-2 h-full mx-2"></div>

      <button
        className={state.bold ? ' bg-slate-200' : ''}
        onMouseDown={(event) => {
          event.preventDefault()
          toggleMark(editor, state, Format.bold)
        }}>
        <BiBold className="h-5 w-5 m-1"/>
      </button>
    </div>
  )
}

export default Toolbar
