import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import { FormGroup, Label } from 'reactstrap'
import IntlMessages from '../../../../../helpers/IntlMessages'
import SelectDataBaseField from '../SelectDataBaseField'
import { useFetchUserConnections } from './requests'
import { selectDatabase } from './selector'

const SelectExistingDatabase = () => {
  const { watch } = useFormContext()
  const data = useFetchUserConnections()
  const contentList = selectDatabase(data)
  const type = watch('type')

  return (
    <>
      <SelectDataBaseField content={contentList} />
      <FormGroup>
        <Label for='database-source-name'>
          <IntlMessages id='label.database-source-name' />
        </Label>
        <Controller
          id='database-source-name'
          as={Select}
          options={type?.sourceMaster}
          classNamePrefix='react-select'
          className='react-select'
          name='sourceName'
        />
      </FormGroup>

    </>
  )
}

export default SelectExistingDatabase
