import {CustomEditor} from './CustomTypes'
import {toggleBoldMark, toggleCodeBlock, toggleHeadingBlock, toggleQuoteBlock} from './EditorHandler'
import {BiCodeAlt, BiBold, BiHeading, BiSolidQuoteLeft} from 'react-icons/bi'
import {EditorState} from './EditorHooks'

type Props = {
  editor: CustomEditor
  state: EditorState
}

const Toolbar = ({editor, state}: Props) => {
  return (
    <div className="border-b-2 bg-slate-50">
      <button
        className={'m-1 p-0 justify-center hover:bg-slate-200' + (state.isHeading ? ' bg-slate-200' : '')}
        onMouseDown={(event) => {
          event.preventDefault()
          toggleHeadingBlock(editor, state)
        }}>
        <BiHeading className="h-5 w-5 m-1"/>
      </button>

      <button
        className={'m-1 p-0 justify-center hover:bg-slate-200' + (state.isQuote ? ' bg-slate-200' : '')}
        onMouseDown={(event) => {
          event.preventDefault()
          toggleQuoteBlock(editor, state)
        }}>
        <BiSolidQuoteLeft className="h-5 w-5 m-1"/>
      </button>

      <button
        className={'m-1 p-0 justify-center hover:bg-slate-200' + (state.isCodeBlock ? ' bg-slate-200' : '')}
        onMouseDown={(event) => {
          event.preventDefault()
          toggleCodeBlock(editor, state)
        }}>
        <BiCodeAlt className="h-5 w-5 m-1"/>
      </button>

      <button
        className={'m-1 p-0 justify-center hover:bg-slate-200' + (state.isBold ? ' bg-slate-200' : '')}
        onMouseDown={(event) => {
          event.preventDefault()
          toggleBoldMark(editor, state)
        }}>
        <BiBold className="h-5 w-5 m-1"/>
      </button>
    </div>
  )
}

export default Toolbar
