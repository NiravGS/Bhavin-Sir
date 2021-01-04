/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'
import { FormGroup, Input as InputReact, Label } from 'reactstrap'
import IntlMessages from '../../helpers/IntlMessages'
import { useIntl } from 'react-intl'

const Input = ({ name, label, labelElement, formclass, errors, ...rest }) => {
  const { errors: errorContext, register, defaultValues } = useFormContext() ?? {}
  const error = errors || errorContext
  const message = error?.[name]?.message
  return (
    <FormGroup className={formclass}>
      <Label className='w-100' for={name}>
        {label ? <IntlMessages id={label} /> : labelElement}
      </Label>
      <InputReact
        id={name}
        type='text'
        className='form-control'
        defaultValue={defaultValues?.[name]}
        name={name}
        innerRef={register}
        {...rest}
      />
      {message ? <div data-testid='err-message' className='invalid-feedback d-block'>{message}</div> : ''}
    </FormGroup>
  )
}

export const InputRadio = ({ label, name, content, errors, register }) => {
  const { errors: errorContext, register: contextRegister, defaultValues } = useFormContext() ?? {}
  const error = errors || errorContext
  const message = error?.[name]?.message
  const { messages } = useIntl()
  return (
    <FormGroup tag='fieldset'>
      <Label><IntlMessages id={label} /></Label>
      <div className='d-flex align-items-center flex-row'>
        {content.map((item, index) => {
          return (
            <div key={`keyRadio_${index}`} className='form-checkbox ml-4 mr-4'>
              <input
                ref={register || contextRegister}
                defaultValue={defaultValues?.[name]}
                type='radio' className='form-check-input'
                id={item.label} name={name} value={item.value} checked={item.checked}
              />
              <label className='form-checkbox-label' htmlFor={item.label}>{messages[item.label]}</label>
            </div>)
        })}

      </div>
      {message ? <div data-testid='err-message' className='invalid-feedback d-block'>{message}</div> : ''}
    </FormGroup>
  )
}

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  formclass: PropTypes.string,
  errors: PropTypes.object,
  labelElement: PropTypes.element
}

export default Input
