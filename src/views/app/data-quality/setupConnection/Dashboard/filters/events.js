import { mountDefaultProvider } from '../../../../../../helpers/mountDefaultProvider'
import { getMonths } from './MonthFilter'
const { currentMonthIndex, months } = getMonths()

export const filterReducer = (state, action) => {
  switch (action.type) {
    case 'setSelectedTable': {
      return { ...state, selectedTable: action.payload, selectedColumn: {} }
    }
    case 'setSelectedColumn': {
      return { ...state, selectedColumn: action.payload }
    }
    case 'cleanTableAndColumn': {
      return { ...state, selectedTable: {}, selectedColumn: {} }
    }
    case 'cleanColumn': {
      return { ...state, selectedColumn: {} }
    }
    case 'setInterval': {
      return { ...state, selectedInterval: action.payload }
    }
    case 'setSelectedMonth': {
      return { ...state, selectedMonth: action.payload }
    }
    default:
      return state
  }
}

const [FilterProvider, useFilterDispatch, useFilterState] = mountDefaultProvider(filterReducer, {
  selectedInterval: { label: 'weekly', value: 7 },
  selectedMonth: months[currentMonthIndex]
})

export const useFiltersToRequest = () => {
  const state = useFilterState()
  return {
    days: state.selectedInterval?.value,
    objectId: state.selectedTable?.value,
    columnId: state.selectedColumn?.value,
    monthName: state.selectedMonth?.value
  }
}

export { FilterProvider, useFilterDispatch, useFilterState }
