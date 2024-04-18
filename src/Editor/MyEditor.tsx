import {useMemo, useState} from 'react'
import {Descendant} from 'slate'
import {Editable, Slate} from 'slate-react'
import renderEditorElement from './renderEditorElement.tsx'
import renderLeaf from './renderLeaf.tsx'
import Toolbar from './Toolbar'
import {useEditor} from './EditorHooks'
import AddImageDialog from './components/AddImageDialog.tsx'
import {handleBackspace} from './EditorHandler.ts'

const defaultEditorContent: Descendant[] = [
  {
    type: 'heading',
    children: [{text: 'A line of text in a heading.'}],
  },
  {
    type: 'code',
    children: [{text: 'Hello, World!!!'}],
  },
  {
    type: 'paragraph',
    children: [{text: 'Hello, World!!!'}],
  },
  {
    type: 'quote',
    children: [{text: 'Hello, World!!!'}],
  },
  {
    type: 'list-item',
    children: [{text: 'Hello, World!!!'}],
  },
  {
    type: 'list-item',
    children: [{text: 'Second!!!'}],
  },
]

const MyEditor = () => {
  const {editor, state, handleChange} = useEditor()

  const [isDialogOpen, setDialogOpen] = useState(false)

  const content = localStorage.getItem('content')
  const initialValue = useMemo(() => content ? JSON.parse(content) : defaultEditorContent, [content])

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={handleChange}
    >
      <div className="h-full flex flex-col">
        <Toolbar state={state} setDialogOpen={setDialogOpen}/>

        <div className="py-5 flex-auto flex flex-col overflow-auto">
          <Editable
            className="flex-auto focus:outline-none"
            onKeyDown={event => {
              if (event.key === 'Backspace') {
                event.preventDefault()
                handleBackspace(editor, state)
              }
            }}
            renderElement={renderEditorElement}
            renderLeaf={renderLeaf}
          />
        </div>
      </div>

      <AddImageDialog isDialogOpen={isDialogOpen} handleClose={() => setDialogOpen(false)}/>
    </Slate>
  )
}

export default MyEditor
