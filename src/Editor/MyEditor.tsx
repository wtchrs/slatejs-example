import {useMemo} from 'react'
import {Descendant} from 'slate'
import {Editable, Slate} from 'slate-react'
import renderElement from './RenderElement'
import renderLeaf from './RenderLeaf'
import Toolbar from './Toolbar'
import {useEditor} from './EditorHooks'

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

  const content = localStorage.getItem('content')
  const initialValue = useMemo(() => content ? JSON.parse(content) : defaultEditorContent, [content])

  return (
    <div className="h-full flex flex-col">
      <Toolbar editor={editor} state={state}/>
      <div className="p-5 flex-auto flex flex-col overflow-auto">
        <Slate
          editor={editor}
          initialValue={initialValue}
          onChange={handleChange}
        >
          <Editable
            className="flex-auto focus:outline-none"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </Slate>
      </div>
    </div>
  )
}

export default MyEditor
