import Editor from './Editor'

function App() {
  return (
    <div className="container mx-auto max-w-4xl h-screen">
      <h1 className="flex-none">React Slate.js Rich Text Editor</h1>
      <div className="my-5 border-2 rounded h-[calc(100%-6rem)]">
        <Editor/>
      </div>
    </div>
  )
}

export default App
