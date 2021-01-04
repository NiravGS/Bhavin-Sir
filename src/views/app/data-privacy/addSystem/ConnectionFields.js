import React from 'react'
import { useFormContext } from 'react-hook-form'

import Input from '../../../../components/Input/Input'
import Select from '../../../../components/Input/Select'

import { getFieldsByDb } from './staticFields'

const isSelectType = val => val?.type === 'select'

export default () => {
  const { getValues } = useFormContext()
  const fields = getFieldsByDb()
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

          const inputType = field !== 'password' ? 'text' : 'password'
          return (
            <Input
              key={keyVal}
              formclass='error-l-75'
              label={`label.${field}`}
              name={field}
              type={inputType}
            />
          )
        })
      }
    </>
  )
}
