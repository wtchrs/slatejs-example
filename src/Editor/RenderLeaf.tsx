import {RenderLeafProps} from 'slate-react'

const renderLeaf = (props: RenderLeafProps) => {
  return (
    <span{...props.attributes} className={props.leaf.bold ? 'font-bold' : ''}>
      {props.children}
    </span>
  )
}

export default renderLeaf
