import Heading from 'components/Heading'
import React from 'react'
import * as S from './styles'

export type TextContentProps = {
  title?: string
  content: string
}

const TextContext = ({ title, content }: TextContentProps) => (
  <S.Wrapper>
    {!!title && (
      <Heading lineLeft lineColor="secondary">
        {title}
      </Heading>
    )}

    <div dangerouslySetInnerHTML={{ __html: content }} />
  </S.Wrapper>
)

export default TextContext
