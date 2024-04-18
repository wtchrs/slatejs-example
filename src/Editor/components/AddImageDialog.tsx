import {useCallback, useState} from 'react'
import {Transforms} from 'slate'
import {useSlate} from 'slate-react'

type Props = {
  isDialogOpen: boolean
  handleClose: () => void
}

const AddImageDialog = ({isDialogOpen, handleClose}: Props) => {
  const editor = useSlate()
  const [imageUrl, setImageUrl] = useState('')
  const [altText, setAltText] = useState('')

  const handleAddImage = useCallback((imageUrl: string, altText: string) => {
    Transforms.insertNodes(editor, {
      type: 'image',
      url: imageUrl,
      alt: altText,
      children: [{text: ''}],
    })

    setImageUrl('')
    setAltText('')
  }, [editor])

  return (
    <>
      {isDialogOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
          onClick={handleClose}
        >
          <div className="bg-white p-6 rounded shadow-lg" onClick={event => event.stopPropagation()}>

            <h2 className="text-xl font-bold mb-4">Add Image</h2>

            <div className="mb-4">
              <label htmlFor="imageUrl" className="block font-bold mb-2">Image URL</label>
              <input
                className="border rounded px-3 py-2 w-full"
                type="text" id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="altText" className="block font-bold mb-2">Alt Text</label>
              <input
                className="border rounded px-3 py-2 w-full"
                type="text" id="altText" value={altText} onChange={e => setAltText(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  handleAddImage(imageUrl, altText)
                  handleClose()
                }}
              >
                Add
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default AddImageDialog
