import PropTypes from 'prop-types'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Container } from 'reactstrap'
import Button from '../../../../../components/button'
import Input from '../../../../../components/Input/Input'
import { useAsyncValidateConnNameExists } from '../requests'
import SelectDataBaseField from '../SelectDataBaseField'

const SelectNewDatabase = ({ showConnectionFields }) => {
  const { trigger, watch } = useFormContext()
  const [
    validateConnectionNameExists,
    loadingConnNameValidation
  ] = useAsyncValidateConnNameExists()

  const submitToShowConnFields = async () => {
    const response = await validateConnectionNameExists(watch('sourceName'))
    const isFieldValid = await trigger(['sourceName'])
    if (isFieldValid && !response?.error) {
      showConnectionFields()
    }
  }
  return (
    <>
      <SelectDataBaseField />
      <Input
        formclass='error-l-100'
        label='label.database-source-name'
        name='sourceName'
      />
      <Container className='mt-3 d-flex justify-content-center'>
        <Button
          loading={loadingConnNameValidation}
          onClick={submitToShowConnFields} size='lg' color='primary'
        >
          Ok
        </Button>
      </Container>
    </>
  )
}

SelectNewDatabase.propTypes = {
  showConnectionFields: PropTypes.func
}

export default SelectNewDatabase
