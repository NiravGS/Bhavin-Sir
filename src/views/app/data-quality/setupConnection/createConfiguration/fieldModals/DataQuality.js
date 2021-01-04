import PropTypes from 'prop-types'
import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useIntl } from 'react-intl'
import { InputRadio } from '../../../../../../components/Input/Input'

export const DataQualityFields = ({ register, errors }) => {
  const { messages } = useIntl()
  return (
    <>
      <InputRadio
        label='label.quality'
        errors={errors}
        register={register({ required: messages['formError.fieldRequired'] })}
        name='dataQuality'
        content={[
          { label: 'label.goodData', value: 'G' },
          { label: 'label.badData', value: 'B' }]}
      />
    </>
  )
}

DataQualityFields.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object
}

export const changeDataCheckAction = (value, column) => {
  return {
    type: 'changeDataCheck',
    payload: {
      column,
      value: value
    }
  }
}
