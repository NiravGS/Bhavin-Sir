import { useSelector, useDispatch } from 'react-redux'
import * as R from 'ramda'
const initial = {
  currentProcess: {},
  showProcessModal: false,
  executions: []
}

const defaultToCurrectProccess = R.defaultTo(initial.currentProcess)

const viewProcesses = (state = initial, action) => {
  switch (action.type) {
    case 'toggleProcessModal':
      return {
        ...state,
        showProcessModal: !state.showProcessModal,
        currentProcess: defaultToCurrectProccess(action.payload)
      }

    case 'cleanProcessModal':
      return { ...state, showProcessModal: false, currentProcess: initial.currentProcess }

    case 'setProcessViewInfo':
      return { ...state, currentProcess: defaultToCurrectProccess(action.payload) }

    case 'setProcessExecutionList':
      return { ...state, executions: action.payload }

    default: return { ...state }
  }
}

export const useToggleModal = () => {
  const dispatch = useDispatch()
  return {
    toggleModal: (process) => dispatch({ type: 'toggleProcessModal', payload: process }),
    cleanModal: () => dispatch({ type: 'cleanProcessModal' })
  }
}

export const useViewProcesses = () => useSelector(R.prop('viewProcesses'))

export default viewProcesses
