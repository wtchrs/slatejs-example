import {ReactNode, useCallback} from 'react'
import {Editor, Element as SlateElement, Transforms} from 'slate'
import {ReactEditor, useSlate} from 'slate-react'
import {BiPlus} from 'react-icons/bi'

type Props = {
  children: ReactNode | ReactNode[]
  element: SlateElement
}

const AddBelowButton = ({element, children}: Props) => {
  const editor = useSlate()

  const handleAddNewElement = useCallback(() => {
    const path = ReactEditor.findPath(editor, element)
    const insertPath = [path[path.length - 1] + 1]

    console.log('editor.children:', editor.children)
    console.log('element:', element)
    console.log('path:', path)
    console.log('insertPath:', insertPath)

    Transforms.insertNodes(
      editor,
      {type: 'paragraph', children: [{text: ''}]},
      {at: insertPath},
    )

    const cursorPoint = Editor.point(editor, insertPath)
    Transforms.select(editor, {anchor: cursorPoint, focus: cursorPoint})
  }, [editor, element])

  return (
    <div className="relative z-0 px-10 group/new-button">
      <div className="group/tooltip">
        <button
          className="absolute left-1 top-2 hover:bg-gray-200 text-gray-400 px-2 py-1 rounded transition-opacity opacity-0 group-hover/new-button:opacity-100"
          onClick={handleAddNewElement}
        >
          <BiPlus/>
        </button>
        <div
          className="absolute z-10 left-1 top-9 py-1 px-2 bg-black text-white rounded transition-opacity opacity-0 hidden group-hover/tooltip:opacity-100 group-hover/tooltip:block">
          Click to add below
        </div>
      </div>
      {children}
    </div>
  )
}

export default AddBelowButton
