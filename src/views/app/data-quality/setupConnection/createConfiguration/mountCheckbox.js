import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup, Input, Label, UncontrolledTooltip } from 'reactstrap'
import IntlMessages from '../../../../../helpers/IntlMessages'
import { findByValue, getCurrentContentTable } from './configurationSelector'
import { isChecked, staticDataChecks, getVisualValue } from './helper'

const CheckBox = ({ label, onChange, ...rest }) => (
  <FormGroup check>
    <Label check>
      <Input type='checkbox' onChange={onChange} {...rest} />
      <IntlMessages id={`label.${label}`} />
    </Label>
  </FormGroup>
)

CheckBox.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func
}

export const mountCheckBox = (onChange, currentDataChecks, disabled, intl) => {
  return staticDataChecks.map((item) => {
    const checked = isChecked(item, currentDataChecks)
    const visualValue = getVisualValue(item, currentDataChecks, intl)

    return {
      element: (
        <div className='d-flex flex-column'>
          <CheckBox
            data-testid={`${item?.label}_checkbox`}
            onChange={() => onChange(item)}
            name={`dataChecks.${item.label}`}
            label={item.label}
            checked={checked}
            disabled={disabled}
          />
          <Label className='mb-0 text-muted '>
            {visualValue}
          </Label>
        </div>
      ),
      ...item
    }
  })
}

const checkedDataChecksLabel = (dataChecks) => {
  return staticDataChecks.filter((item) => isChecked(item, dataChecks))
}

export const mountColumns = (columns, state, intlLabels) => {
  const currentTable = getCurrentContentTable(state)
  return columns?.map(({ label, value }) => {
    const currentColumn = findByValue(value, currentTable?.columns)
    let selectedItems = checkedDataChecksLabel(currentColumn?.dataChecks)
    selectedItems = selectedItems?.map(item => intlLabels?.[`label.${item.label}`])

    return {
      label,
      value,
      selectedItems: selectedItems.length,
      element: (
        <div className='d-flex justify-content-between'>
          <Label className='mb-0'>{label}</Label>
          {
            selectedItems.length
              ? (
                <>
                  <div id={label} data-testid={`tooltip_${label}`}>({selectedItems.length})</div>
                  <UncontrolledTooltip placement='top' target={label}>
                    {selectedItems.join(', ')}
                  </UncontrolledTooltip>
                </>)
              : ''
          }

        </div>
      )
    }
  })
}
