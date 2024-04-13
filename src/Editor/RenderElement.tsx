import {RenderElementProps} from 'slate-react'

const renderElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case 'heading':
      return <h2 {...props.attributes}>{props.children}</h2>

    case 'code':
      return (
        <pre>
          <code {...props.attributes}>
            {props.children}
          </code>
        </pre>
      )

    case 'quote':
      return (
        <blockquote {...props.attributes}>
          {props.children}
        </blockquote>
      )

    case 'list-item':
      return <li {...props.attributes}>{props.children}</li>

    default:
      return <p {...props.attributes}>{props.children}</p>
  }
}

export default renderElement
