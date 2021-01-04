import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'
import { useProcessId } from '../../../../data-quality/setupConnection/createConfiguration/helper'

const HiddenInputs = ({ baseName }) => {
  const { register } = useFormContext()
  const processId = useProcessId()
  return (
    <>
      <input
        name={`${baseName}.id`}
        ref={register}
        type='hidden'
      />
      <input
        name={`${baseName}.processId`}
        ref={register}
        type='hidden'
        value={processId}
      />
    </>
  )
}

HiddenInputs.propTypes = {
  baseName: PropTypes.string
}

export default HiddenInputs
