import PropTypes from 'prop-types'
import React from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import DropdownItemLink from './DropdownItemLink'

const ManageDropdown = ({ processId }) => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret color='secondary' outline>
        <IntlMessages id='label.manage' />
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
        <DropdownItem disabled>
          <IntlMessages id='label.alerts' />
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

ManageDropdown.propTypes = {
  processId: PropTypes.string
}

export default ManageDropdown
