import { useState, InputHTMLAttributes } from 'react'

import * as S from './styles'

export type TextFieldProps = {
  onInput?: (value: string) => void
  label?: string
  initialValue?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  disabledInput?: boolean
  errorMessage?: string
} & InputHTMLAttributes<HTMLInputElement>

const TextField = ({
  label,
  initialValue = '',
  onInput,
  icon,
  iconPosition = 'left',
  disabledInput = false,
  errorMessage,
  name,
  ...props
}: TextFieldProps) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    setValue(newValue)

    !!onInput && onInput(newValue)
  }

  return (
    <S.Wrapper disabledInput={disabledInput} errorMessage={!!errorMessage}>
      {!!label && <S.Label htmlFor={name}>{label}</S.Label>}
      <S.InputWrapper>
        {!!icon && <S.Icon iconPosition={iconPosition}>{icon}</S.Icon>}
        <S.Input
          iconPosition={iconPosition}
          type="text"
          onChange={onChange}
          value={value}
          disabled={disabledInput}
          name={name}
          {...(label ? { id: name } : {})}
          {...props}
        />
      </S.InputWrapper>
      {!!errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
    </S.Wrapper>
  )
}

export default TextField
