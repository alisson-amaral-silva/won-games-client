import * as S from './styles'

export type DropdownProps = {
  title: React.ReactNode
  children: React.ReactNode
}

const Dropdown = ({ title, children }: DropdownProps) => {
  return (
    <S.Wrapper>
      <h1>{title}</h1>
      <S.Title>{title}</S.Title>
      <S.Content>{children}</S.Content>
    </S.Wrapper>
  )
}

export default Dropdown
