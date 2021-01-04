/* eslint-disable react/prop-types */
import { DevTool } from '@hookform/devtools'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import React, { useEffect, useState } from 'react'
import { NotificationManager } from '../components/common/react-notifications'
import { LoadingSpinner } from '../views/app/data-quality/setupConnection/Dashboard/SuspenseChart'

export const toggle = (setFunc) => () => setFunc(val => !val)
export const removeEmptyData = R.reject(R.equals(''))

export const Notification = {
  success: (message) => {
    return NotificationManager.success(
      message,
      'Success',
      3000,
      null,
      null,
      ''
    )
  },
  error: (message) => {
    return NotificationManager.error(
      message,
      'Error',
      3000,
      null,
      null,
      ''
    )
  }
}

export const DelayComponent = ({ children, delay = 100 }) => {
  const [render, setRender] = useState()

  useEffect(() => {
    setTimeout(() => {
      setRender(true)
    }, delay)
  }, [])

  return render ? children : <LoadingSpinner />
}

DelayComponent.propTypes = {
  children: PropTypes.element,
  delay: PropTypes.number
}

export const FormDevTool = ({ control }) => {
  return process.env.NODE_ENV === 'development' ? <DevTool control={control} /> : ''
}

export const isRequired = R.compose(R.equals('required'), R.prop('type'))

export function useEffectAsync (effect, inputs) {
  useEffect(() => {
    effect()
  }, inputs)
}

export const usePrevValue = (value) => {
  const [prev, setPrev] = useState()
  useEffect(() => {
    return () => {
      setPrev(value)
    }
  }, [value])
  return prev
}
