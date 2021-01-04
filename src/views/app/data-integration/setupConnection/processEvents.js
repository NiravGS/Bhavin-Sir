import * as R from 'ramda'
import { useSelector } from 'react-redux'

const initialState = {
  schedules: [],
  targetInfo: { createTargetTables: true },
  sourceInfo: { table: [], cloudType: 'aws', fileInputs: [] },
  showReview: false,
  basicInfo: {
    processName: '',
    processDescription: '',
    active: false
  },
  processConnections: [],
  fileColumns: {}
}

const reducerCreateProcess = (state = initialState, action) => {
  switch (action.type) {
    case 'addSchedule': {
      const newAddedSchedules = [...state.schedules, action.payload]
      return { ...state, schedules: newAddedSchedules }
    }
    case 'removeSchedule': {
      const newSchedules = R.reject(R.equals(action.payload), state.schedules)
      return { ...state, schedules: newSchedules }
    }
    case 'setSourceInfo': {
      const systemName = getSystemName(state.processConnections, action.payload?.system)
      return {
        ...state,
        sourceInfo: {
          ...action.payload,
          systemName,
          isFileSystem: R.equals('fileSystem', action.payload.type)
        }
      }
    }
    case 'setTargetInfo': {
      return {
        ...state,
        targetInfo: {
          ...action.payload,
          systemName: getSystemName(state.processConnections, action.payload?.system)
        }
      }
    }

    case 'cleanTargetColumns': {
      return {
        ...state,
        targetInfo: R.pick(
          ['type', 'system', 'database', 'systemName', 'createTargetTables'],
          state.targetInfo
        )
      }
    }
    case 'setShowReview': {
      return { ...state, showReview: {} }
    }
    case 'setProcessBasicInfo': {
      return { ...state, basicInfo: action.payload }
    }
    case 'setProcessSourceTableColumns': {
      return { ...state, sourceTableColumns: action.payload }
    }
    case 'setProcessConnections': {
      return { ...state, processConnections: action.payload }
    }
    case 'setInitialProcessData': {
      return { ...state, ...action.payload }
    }
    case 'setObjectList': {
      return { ...state, objectList: action.payload }
    }
    case 'setFileColumns': {
      return { ...state, fileColumns: { ...state.fileColumns, [action.payload.name]: action.payload.columns } }
    }

    case 'cleanProcessContent': {
      return initialState
    }

    default:
      return state
  }
}

const getSystemName = (processConnections, systemId) => (
  processConnections
    .find(R.propEq('value', systemId))
  ?.label)

const getProcess = R.prop('process')
export const useSelectorProcess = () => useSelector(R.prop('process'), R.equals)

export const useSelectorProcessBasicInfo = () => useSelector(R.compose(R.prop('basicInfo'), getProcess), R.equals)
export const useSelectorSourceInformation = () => useSelector(R.compose(R.prop('sourceInfo'), getProcess), R.equals)
export const useSelectorTargetInformation = () => useSelector(R.compose(R.prop('targetInfo'), getProcess), R.equals)
export const useSelectorSchedules = () => useSelector(R.compose(R.prop('schedules'), getProcess), R.equals)

export default reducerCreateProcess
