import {BaseEditor} from 'slate'
import {ReactEditor} from 'slate-react'

export type RemoveDash<T extends string> =
  T extends `${infer Head}-${infer Tail}` ? `${Head}${RemoveDash<Capitalize<Tail>>}` : T

export type CustomEditor = BaseEditor & ReactEditor

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type HeadingElement = {
  type: 'heading'
  children: CustomText[]
}

export type CodeElement = {
  type: 'code'
  children: CustomText[]
}

export type QuoteElement = {
  type: 'quote'
  children: CustomText[]
}

export type ListItemElement = {
  type: 'list-item'
  children: CustomText[]
}

export type ImageElement = {
  type: 'image'
  url: string
  alt: string
  children: CustomText[]
}

export type TextElement = ParagraphElement | HeadingElement | CodeElement | QuoteElement | ListItemElement
export type CustomElement = TextElement | ImageElement

export type CustomElementType = CustomElement['type']
export type CustomElementTypeKey = RemoveDash<CustomElementType>
export const CustomElementType: Readonly<Record<CustomElementTypeKey, CustomElementType>> = {
  paragraph: 'paragraph',
  heading: 'heading',
  code: 'code',
  quote: 'quote',
  listItem: 'list-item',
  image: 'image',
}

export type Format = 'bold' | 'italic' | 'underline' | 'line-through'
export type FormatKey = RemoveDash<Format>
export const Format: Readonly<Record<FormatKey, Format>> = {
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  lineThrough: 'line-through',
}

export type FormattedText =
  & { text: string }
  & { [key in Format]?: true }

export type CustomText = FormattedText

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
