import {RenderLeafProps} from 'slate-react'
import {Format} from './CustomTypes.ts'

const formatToClassName = {
  [Format.bold]: 'font-bold',
  [Format.italic]: 'italic',
  [Format.underline]: 'underline',
  [Format.lineThrough]: 'line-through',
}

const renderLeaf = (props: RenderLeafProps) => {
  const className = Object.values(Format)
    .filter(format => Boolean(props.leaf[format]))
    .map(format => formatToClassName[format])
    .join(' ')

  return (
    <span{...props.attributes} className={className.trimStart()}>
      {props.children}
    </span>
  )
}

export default renderLeaf
