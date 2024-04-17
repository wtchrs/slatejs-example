import {ReactEditor, RenderElementProps, useSlate} from 'slate-react'
import {useCallback} from 'react'
import {ImageElement} from '../CustomTypes.ts'
import {Transforms} from 'slate'

const EditorImageElement = ({attributes, element}: RenderElementProps) => {
  const editor = useSlate()

  const handleDelete = useCallback(() => {
    const path = ReactEditor.findPath(editor, element)
    Transforms.removeNodes(editor, {at: path})
  }, [editor, element])

  const imageElement = element as ImageElement

  return (
    <div {...attributes} className="relative">
      <img
        className="w-full h-auto loading-skeleton"
        src={imageElement.url}
        alt={imageElement.alt}
      />
      <button
        className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded"
        onMouseDown={handleDelete}
      >
        Delete
      </button>
    </div>
  )
}

export default EditorImageElement
