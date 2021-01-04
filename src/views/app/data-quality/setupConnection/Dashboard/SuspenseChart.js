/* eslint-disable react/prop-types */
import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'reactstrap'
import { Notification } from '../../../../../helpers/appUtils'
import IntlMessages from '../../../../../helpers/IntlMessages'

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static defaultProps = {
    fallback: (
      <div style={{ minHeight: '300px' }}>
        <IntlMessages id='label.failedToLoad' />
      </div>)
  }

  static getDerivedStateFromError () {
    return { hasError: true }
  }

  componentDidCatch (error, errorInfo) {
    Notification.error('failed to get data!')
    console.log(error, errorInfo)
  }

  render () {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export const SuspenseWithHandler = ({ children }) => {
  return (
    <ErrorBoundary>
      <SuspenseChart>
        {children}
      </SuspenseChart>
    </ErrorBoundary>
  )
}

export const LoadingSpinner = () => {
  return (
    <div style={{ minHeight: '300px' }} className='w-100 d-flex justify-content-center align-items-center'>
      <Spinner color='primary' />
    </div>
  )
}

export const SuspenseChart = ({ children }) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  )
}

SuspenseChart.propTypes = {
  children: PropTypes.element
}
