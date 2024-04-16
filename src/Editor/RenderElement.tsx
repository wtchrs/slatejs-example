import {RenderElementProps} from 'slate-react'
import {CustomElementType} from './CustomTypes.ts'

const renderElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case CustomElementType.heading:
      return <h2 {...props.attributes}>{props.children}</h2>

    case CustomElementType.code:
      return (
        <pre>
          <code {...props.attributes}>
            {props.children}
          </code>
        </pre>
      )

    case CustomElementType.quote:
      return (
        <blockquote {...props.attributes}>
          {props.children}
        </blockquote>
      )

    case CustomElementType.listItem:
      return <li {...props.attributes}>{props.children}</li>

    default:
      return <p {...props.attributes}>{props.children}</p>
  }
}

export default renderElement
