import styled, { css, DefaultTheme } from 'styled-components'
import { TextFieldProps } from '.'

export const InputWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    background: ${theme.colors.lightGray};
    border-radius: 0.2rem;
    padding: 0 ${theme.spacings.xsmall};
    border: 0.2rem solid;
    border-color: ${theme.colors.lightGray};
    &:focus-within {
      box-shadow: 0 0 0.5rem ${theme.colors.primary};
    }
  `}
`

export const Icon = styled.div<Pick<TextFieldProps, 'iconPosition'>>`
  ${({ theme, iconPosition }) => css`
    color: ${theme.colors.gray};
    width: 2.5rem;
    display: flex;
    //mudando a posição do icone da direita para a esquerda dependendo do parametro
    order: ${iconPosition === 'right' ? 1 : 0};
    & > svg {
      width: 100%;
    }
  `}
`

export const Input = styled.input<Pick<TextFieldProps, 'iconPosition'>>`
  ${({ theme, iconPosition }) => css`
    color:  ${theme.colors.black};
    font-family: ${theme.font.family};
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} 0;
    padding-${iconPosition}: ${theme.spacings.xsmall};
    background: transparent;
    border: 0;
    outline: none;
    width: 100%;

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 ${theme.spacings.small} ${theme.colors.lightGray} inset;
      filter: none;
    }

  `}
`

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.black};
    cursor: pointer;
  `}
`

export const ErrorMessage = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    color: ${theme.colors.red};
  `}
`

const wrapperModifiers = {
  disabled: (theme: DefaultTheme) => css`
    //definindo que todos estes componentes irão ter as mesmas configs
    ${Label},
    ${Input},
    ${Icon} {
      cursor: not-allowed;
      color: ${theme.colors.gray};

      &::placeholder {
        color: currentColor;
      }
    }
  `,
  errorMessage: (theme: DefaultTheme) => css`
    ${InputWrapper} {
      border-color: ${theme.colors.red};
    }
    ${Icon},
    ${Label} {
      color: ${theme.colors.red};
    }
  `
}

export const Wrapper = styled.div<
  Pick<TextFieldProps, 'disabledInput'> & { errorMessage?: boolean }
>`
  ${({ theme, disabledInput, errorMessage }) => css`
    ${!!errorMessage && wrapperModifiers.errorMessage(theme)};
    ${disabledInput && wrapperModifiers.disabled(theme)};
  `}
`
