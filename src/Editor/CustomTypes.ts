import {BaseEditor} from 'slate'
import {ReactEditor} from 'slate-react'

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

export type ListElement = {
  type: 'list'
  children: CustomText[]
}

export type TextElement = ParagraphElement | HeadingElement | CodeElement | QuoteElement | ListElement

export type CustomElement = TextElement

export type FormattedText = {
  text: string
  bold?: true
}

export type CustomText = FormattedText

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
