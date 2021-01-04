import React from 'react'
import * as R from 'ramda'
import { useFormContext } from 'react-hook-form'
import Input from '../../../../../components/Input/Input'
import { getFieldsByDb } from './formLabelFields'
import Select from '../../../../../components/Input/Select'

const isSelectType = val => val?.type === 'select'

const inputTypes = {
  password: 'password',
  port: 'number'
}

export const ConnectionFields = () => {
  const { getValues } = useFormContext()
  const { type } = getValues()
  const fields = getFieldsByDb(type)
  return (
    <>
      {
        fields && fields.map((field, index) => {
          const keyVal = `key_${index}`

          if (isSelectType(field)) {
            return (
              <Select
                key={keyVal}
                formclass='error-l-75'
                label={`label.${field.name}`}
                options={field.options}
                name={field.name}
              />
            )
          }

          return (
            <Input
              key={keyVal}
              formclass='error-l-75'
              label={`label.${field}`}
              name={field}
              type={inputTypes[field] || 'text'}
            />
          )
        })
      }
    </>
  )
}
