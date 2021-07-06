import * as S from './styles'
import Heading from 'components/Heading'
import Checkbox from 'components/Checkbox'
import Radio from 'components/Radio'
import Button from 'components/Button'
import { useState } from 'react'

export type ItemProps = {
  title: string
  name: string
  type: string
  fields: Field[]
}

type Field = {
  label: string
  name: string
}

type Values = {
  //propriedade dinamica => string definition
  [field: string]: boolean | string
}

export type ExploreSidebarProps = {
  items: ItemProps[]
  initialValues?: Values
}

const ExploreSidebar = ({ items, initialValues = {} }: ExploreSidebarProps) => {
  const [values, setValues] = useState(initialValues)

  return (
    <S.Wrapper>
      {items.map((item) => (
        <div key={item.title}>
          <Heading lineBottom lineColor="secondary" size="small">
            {item.title}
          </Heading>
          {item.type === 'checkbox' &&
            item.fields.map((field) => (
              <Checkbox
                key={field.label}
                name={field.name}
                label={field.label}
                labelFor={item.name}
                isChecked={!!values[field.name]}
              />
            ))}
          {item.type === 'radio' &&
            item.fields.map((field) => (
              <Radio
                key={field.name}
                id={field.name}
                value={field.name}
                name={item.name}
                label={field.label}
                labelFor={field.name}
                defaultChecked={field.name === values[item.name]}
              />
            ))}
        </div>
      ))}
      <Button fullWidth size="medium">
        Filter
      </Button>
    </S.Wrapper>
  )
}

export default ExploreSidebar
