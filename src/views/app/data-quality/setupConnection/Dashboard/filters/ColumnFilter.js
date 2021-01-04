import React from 'react'
import * as R from 'ramda'
import Select from 'react-select'
import { useFilterState, useFilterDispatch } from './events'

const ColumnFilter = () => {
  const { selectedColumn, selectedTable } = useFilterState()
  const dispatch = useFilterDispatch()

  const columns = R.defaultTo([], selectedTable?.columns)
  return (
    <Select
      options={columns}
      value={selectedColumn}
      placeholder='Column'
      id='column-select'
      isClearable={!R.isEmpty(selectedColumn)}
      isDisabled={R.isEmpty(columns)}
      clearValue={() => dispatch({ type: 'cleanColumn' })}
      classNamePrefix='react-select'
      className='react-select'
      onChange={(col) => dispatch({ type: 'setSelectedColumn', payload: col })}
    />
  )
}

export default ColumnFilter
