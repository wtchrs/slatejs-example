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

export type CustomElement = ParagraphElement | HeadingElement | CodeElement | QuoteElement | ListItemElement

export type CustomElementTypeKey = RemoveDash<CustomElementType>
export type CustomElementType = CustomElement['type']
export const CustomElementType: Readonly<Record<CustomElementTypeKey, CustomElementType>> = {
  paragraph: 'paragraph',
  heading: 'heading',
  code: 'code',
  quote: 'quote',
  listItem: 'list-item',
}

export type FormatKey = RemoveDash<Format>
export type Format = 'bold'
export const Format: Readonly<Record<FormatKey, Format>> = {
  bold: 'bold',
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
