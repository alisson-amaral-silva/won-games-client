import * as S from './styles'
import { InputHTMLAttributes, useState } from 'react'

export type RadioProps = {
  onCheck?: (status: boolean) => void
  label?: string
  labelFor?: string
  labelColor?: 'white' | 'black'
  isChecked?: boolean
  value?: string | ReadonlyArray<string> | number
} & InputHTMLAttributes<HTMLInputElement>

const Radio = ({
  onCheck,
  label,
  labelFor = '',
  labelColor = 'white',
  isChecked = false,
  value,
  ...props
}: RadioProps) => {
  // controlled component (state)
  const [checked, setChecked] = useState(isChecked)

  const onChange = () => {
    const status = !checked // true => false => true
    setChecked(status)

    if (onCheck) {
      onCheck(status)
    }
  }

  return (
    <S.Wrapper>
      <S.Input
        id={labelFor}
        type="radio"
        onChange={onChange}
        checked={checked}
        value={value}
        {...props}
      />
      {!!label && (
        <S.Label htmlFor={labelFor} labelColor={labelColor}>
          {label}
        </S.Label>
      )}
    </S.Wrapper>
  )
}

export default Radio
