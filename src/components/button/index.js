import React from 'react'
import PropTypes from 'prop-types'
import { Button as ButtonStrap } from 'reactstrap'

const loadingClass = 'btn-multiple-state show-spinner'

const Button = ({ loading, children, disabled, icon, className, outline, ...rest }) => {
  return (
    <ButtonStrap
      disabled={disabled || loading}
      data-testid='custom-button'
      className={`${loading ? loadingClass : ''} ${className}`}
      outline={loading ? false : outline}
      {...rest}
    >
      {loading && (
        <span className='spinner d-inline-block'>
          <span className='bounce1' />
          <span className='bounce2' />
          <span className='bounce3' />
        </span>)}

      <span className='label d-flex align-items-center justify-content-center'>
        {icon && !loading ? (
          <i className={`${icon} p-0 pr-2 buttonIcon`} />
        ) : ''}
        {children}
      </span>
    </ButtonStrap>
  )
}

Button.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.any,
  loading: PropTypes.bool,
  icon: PropTypes.string,
  className: PropTypes.string,
  outline: PropTypes.bool
}

export default Button
