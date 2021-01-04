import React from 'react'
import PropTypes from 'prop-types'
import { DropdownItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import IntlMessages from '../../../../../../helpers/IntlMessages'

const DropdownItemLink = ({ label, to, ...rest }) => {
  return (
    <DropdownItem className='pt-1 pl-4 pb-1 btn btn-link btn-empty' {...rest} disabled={!!rest.disabled}>
      <NavLink to={to}>
        &nbsp;<IntlMessages id={label} />
      </NavLink>
    </DropdownItem>
  )
}

DropdownItemLink.propTypes = {
  label: PropTypes.string,
  to: PropTypes.string
}

export default DropdownItemLink
