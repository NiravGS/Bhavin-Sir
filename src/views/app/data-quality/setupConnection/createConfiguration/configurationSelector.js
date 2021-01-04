import * as R from 'ramda'
import { staticDataChecks, staticIgnoreColumns, transformValue } from './helper'
import { getIntl } from '../../../../../IntlProvider'
const intl = getIntl()

/* eslint-disable camelcase */
export const tableSelector = (data) => {
  return data?.map(table => ({
    label: table.object_name,
    value: table.object_id,
    columns: columnsSelector(table.schema_defs)
  }))
}

const columnsSelector = (columns) => {
  return columns?.map(column => ({
    label: column.column_name,
    value: column.column_id,
    dataChecks: {
      ...column
    }
  }))
}

const searchBase = (funcName) => (val, list = []) => R[funcName](R.propEq('value', val), list)

const findIndexByValue = searchBase('findIndex')
export const findByValue = searchBase('find')

const getCurrentTableColumnIndexBase = (state, tableId, columnId) => {
  const tableIndex = findIndexByValue(tableId, state.contentTable)
  const columnIndex = findIndexByValue(columnId, state.contentTable[tableIndex]?.columns)
  return [tableIndex, columnIndex]
}

export const getCurrentTableColumnIndex = (state) => {
  const columnId = state.selectedColumn?.value
  const tableId = state.selectedTable?.value
  return getCurrentTableColumnIndexBase(state, tableId, columnId)
}

export const getCurrentDatachecks = (state, tableId, columnId) => {
  const [tabIndex, colIndex] = getCurrentTableColumnIndexBase(state, tableId, columnId)
  return state.contentTable[tabIndex].columns[colIndex].dataChecks
}

export const getCurrentContentTable = (state) => {
  return findByValue(state.selectedTable.value, state.contentTable)
}

export const hasUnsavedChanges = (state) => {
  const [tableId] = getCurrentTableColumnIndex(state)
  return !R.equals(state.contentTable[tableId], state.contentTableInitial[tableId])
}

const hasSomeDiff = (initialDataChecks, dataChecks) => {
  return (dq) => {
    if (R.equals(initialDataChecks[dq], null) && R.equals(dataChecks[dq], 'N')) {
      return false
    }
    return !R.equals(dataChecks[dq], initialDataChecks[dq])
  }
}

export const currentContentTableDiff = (state) => {
  if (!state.contentTable) return null
  const [tableId] = getCurrentTableColumnIndex(state)
  const currentContentTable = state.contentTable?.[tableId]
  const initialCont = state.contentTableInitial?.[tableId]

  const colsToSave = currentContentTable?.columns?.flatMap((col, index) => {
    const initialDataChecks = initialCont.columns[index].dataChecks
    const hasDiff = R.keys(col.dataChecks).some(hasSomeDiff(initialDataChecks, col.dataChecks))
    return hasDiff ? col : []
  })

  return { ...currentContentTable, columns: colsToSave }
}

const getLabelByColumn = R.memoizeWith(R.identity, (col) => {
  return R.find(R.propSatisfies(R.includes(col), 'column'), staticDataChecks)?.label
})

const hasValidValue = (dataChecks) => {
  return (dq) => !R.includes(dq, staticIgnoreColumns) &&
  dataChecks[dq] &&
  !R.equals(dataChecks[dq], 'N') &&
  getLabelByColumn(dq)
}

const getColumnChangesWithDataChecks = (table) => {
  return table.columns.flatMap(({ dataChecks, label }) => {
    return R.keys(dataChecks)
      .filter(hasValidValue(dataChecks))
      .map(dcKey => {
        const dataCheckLabel = getLabelByColumn(dcKey)
        const dataCheckValue = transformValue(dataChecks, dcKey)
        return {
          tableName: table.label,
          columnName: label,
          dataCheckRawColumn: dcKey,
          dataCheckColumn: intl.messages?.[`label.${dataCheckLabel}`],
          dataCheckValue
        }
      })
  })
}

const handleSpecificCases = (changes) => {
  return R.reject(R.propEq('dataCheckRawColumn', 'col_range_uplt'), changes)
}

export const getTableChangesToReview = (contentTable) => {
  return contentTable?.flatMap((table) => {
    const changes = getColumnChangesWithDataChecks(table)
    return handleSpecificCases(changes)
  })
}
