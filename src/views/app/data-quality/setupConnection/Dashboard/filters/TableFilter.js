import React from 'react'
import * as R from 'ramda'
import Select from 'react-select'
import { useFilterState, useFilterDispatch } from './events'

const TableFilter = () => {
  const { selectedTable, contentTable } = useFilterState()
  const dispatch = useFilterDispatch()

  return (
    <Select
      options={contentTable}
      classNamePrefix='react-select'
      className='react-select'
      placeholder='Table'
      id='table-select'
      isClearable={!R.isEmpty(selectedTable)}
      clearValue={() => {
        dispatch({ type: 'cleanTableAndColumn' })
      }}
      onChange={(table) => {
        dispatch({ type: 'setSelectedTable', payload: table })
      }}
    />
  )
}

export default TableFilter
