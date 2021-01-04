import PropTypes from 'prop-types'
import React from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import IntlMessages from '../../../../../helpers/IntlMessages'

const IntervalDropdown = ({ onChangeInterval, selected, data }) => {
  return (
    <UncontrolledDropdown data-testid='interval-dropdown' className='d-flex justify-content-end'>
      <DropdownToggle caret color='primary' className='btn-xs' outline>
        <IntlMessages id={`label.${selected.label}`} />
      </DropdownToggle>
      <DropdownMenu right>
        {
          data.map((interval, index) => {
            return (
              <DropdownItem data-testid={`interval-${interval.value}`} onClick={() => onChangeInterval(interval)} key={`${index}_time`}>
                <IntlMessages id={`label.${interval.label}`} />
              </DropdownItem>
            )
          })
        }
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

IntervalDropdown.propTypes = {
  onChangeInterval: PropTypes.func,
  selected: PropTypes.object,
  data: PropTypes.array
}

export default IntervalDropdown
