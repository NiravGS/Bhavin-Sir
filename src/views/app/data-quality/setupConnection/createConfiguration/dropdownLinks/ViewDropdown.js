import PropTypes from 'prop-types'
import React from 'react'
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import DropdownItemLink from './DropdownItemLink'

const ViewDropdown = ({ processId }) => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret color='primary' outline>
        <IntlMessages id='label.dashboard' />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItemLink
          disabled={!processId}
          to={`/app/data-quality/set-up-connection/technical-dashboards/${processId}`}
          label='label.technicalDashboard'
        />
        <DropdownItemLink
          disabled={!processId}
          to={`/app/data-quality/set-up-connection/business-dashboards/${processId}`}
          label='label.businessDashboard'
        />
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

ViewDropdown.propTypes = {
  processId: PropTypes.string
}

export default ViewDropdown
