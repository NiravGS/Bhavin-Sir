import * as R from 'ramda'
import { getCurrentDatachecks, getCurrentTableColumnIndex, tableSelector } from './configurationSelector'

export const configReducer = (state, action) => {
  switch (action.type) {
    case 'setConfiguration': {
      const configuration = action.payload?.configData
      const contentTable = tableSelector(configuration)
      return {
        ...state,
        staticContentTableInitial: contentTable, // to compare on review with contentTableInitial
        contentTableInitial: contentTable, // to compare on the page and update after save
        configuration,
        basicInfo: action.payload?.basicInfo,
        contentTable // to do the current changes without save
      }
    }
    case 'setSelectedTable': {
      return { ...state, selectedTable: action.payload, selectedColumn: undefined, currentDataChecks: {} }
    }
    case 'selectNextTable': {
      const [tableIndex] = getCurrentTableColumnIndex(state)
      const nextSelectedTable = state.contentTable?.[tableIndex + 1]
      return nextSelectedTable
        ? { ...state, selectedTable: nextSelectedTable, selectedColumn: undefined, currentDataChecks: {} }
        : state
    }
    case 'setNextPendingTable': {
      return { ...state, pendingTable: action.payload }
    }
    case 'updateInitialContent': {
      return { ...state, contentTableInitial: state.contentTable }
    }
    case 'discardChanges': {
      const newContentTable = R.clone(state.contentTableInitial)
      const [tableId] = getCurrentTableColumnIndex(state)
      newContentTable[tableId] = state.contentTableInitial[tableId]
      return { ...state, contentTable: newContentTable }
    }
    case 'setSelectedColumn': {
      let currentDataChecks = {}
      const tableId = state.selectedTable.value
      currentDataChecks = getCurrentDatachecks(state, tableId, action.payload.value)
      return { ...state, selectedColumn: action.payload, currentDataChecks }
    }
    case 'changeDataCheck': {
      const newContentTable = R.clone(state.contentTable)

      const [tabIndex, colIndex] = getCurrentTableColumnIndex(state)
      const colDataChecks = newContentTable[tabIndex]?.columns[colIndex].dataChecks
      const currentDataChecks = {
        ...colDataChecks,
        [action.payload.column]: action.payload.value
      }

      newContentTable[tabIndex]
        .columns[colIndex]
        .dataChecks = currentDataChecks
      return { ...state, contentTable: newContentTable, currentDataChecks }
    }
    default:
      return state
  }
}

export const resetColumn = (dispatch, column) => {
  const cols = Array.isArray(column) ? column : [column]
  cols.forEach(col => {
    dispatch({ type: 'changeDataCheck', payload: { column: col, value: null } })
  })
}
