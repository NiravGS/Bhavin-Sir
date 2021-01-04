/* eslint-disable react/prop-types */
import * as R from 'ramda'
import React from 'react'

const ActionButton = ({ onClick, type, className }) => (
  <i
    className={`simple-icon-${type} btn btn-empty p-0 iconStroke ${className}`}
    style={{ fontSize: '18px' }}
    onClick={onClick}
  />
)

export const AddRemoveButton = ({ length, index, onAdd, onRemove }) => {
  const hasOnlyFirstItem = R.equals(length, 1)
  const isLastItem = R.equals(length, index + 1)

  if (hasOnlyFirstItem) {
    return (
      <ActionButton type='plus' onClick={onAdd} />
    )
  }

  if (isLastItem) {
    return (
      <div className='d-flex'>
        <ActionButton type='plus' onClick={onAdd} />
        <ActionButton type='minus' onClick={onRemove} className='ml-2' />
      </div>
    )
  }

  return (
    <ActionButton type='minus' onClick={onRemove} />
  )
}
