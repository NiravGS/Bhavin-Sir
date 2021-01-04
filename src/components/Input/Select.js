import PropTypes from 'prop-types'
import * as R from 'ramda'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes'
import ReactSelect from 'react-select'
import { Col, FormGroup, Label, Row } from 'reactstrap'
import IntlMessages from '../../helpers/IntlMessages'
const get = require('lodash.get')

export const formatDefaultOption = value => ({ label: value, value: value })

const getValue = (options, value) => {
  if (options && R.or(R.is(Number, value), R.is(String, value))) {
    return options.find(R.propEq('value', value))
  }
  if (options && R.is(Array, value)) {
    return options?.filter(option => value.includes(option?.value))
  }
  return value
}

const Select = ({ options, name, label, isMultiCheckbox, notSpaced, onChange, rules, ...rest }) => {
  const intlMessages = useIntl()?.messages
  const { defaultValues, setValue, errors } = useFormContext()
  const SelectComponent = isMultiCheckbox && !rest.isDisabled ? ReactMultiSelectCheckboxes : ReactSelect

  return (
    <div className={`${notSpaced ? '' : 'mb-3'} multi-checkbox`}>

      <FormGroup className='mb-0'>
        <div className='d-flex justify-content-between'>
          {label && (
            <Label for={label}>
              {`${intlMessages[label]} ${rules?.required ? ' *' : ''}`}
            </Label>)}
          {rest.isMulti && (
            <p
              onClick={() => setValue(name, options?.map(R.prop('value')))}
              className={`m-0 p-0 ${rest.isLoading ? 'text-muted' : 'btn btn-link'}`}
            >
              <IntlMessages id='label.selectAll' />
            </p>
          )}
        </div>
        <Controller
          name={name}
          defaultValue={defaultValues?.[name] ?? rest.defaultValue ?? null}
          rules={rules}
          render={({ onChange: formOnChange, onBlur, value }) => {
            const selected = getValue(options, value)
            return (
              <SelectComponent
                id={label || name}
                placeholder={rest.isDisabled ? '' : intlMessages['label.selectPaceholder']}
                onBlur={onBlur}
                onChange={val => {
                  const valueOnly = Array.isArray(val) ? R.map(R.prop('value'), val) : val?.value
                  formOnChange(valueOnly)
                  onChange && onChange(valueOnly)
                }}
                value={selected}
                options={options}
                classNamePrefix='react-select'
                className={`react-select ${get(errors, name) ? 'error-border' : ''}`}
                isDisabled={rest.isLoading}
                {...rest}
              />)
          }}
        />
      </FormGroup>
    </div>
  )
}

export const SelectRow = (props) => (
  <Row>
    <Col>
      <Select {...props} />
    </Col>
  </Row>
)

Select.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  name: PropTypes.string,
  label: PropTypes.string,
  isMultiCheckbox: PropTypes.bool,
  notSpaced: PropTypes.bool,
  rules: PropTypes.object
}

export default Select
