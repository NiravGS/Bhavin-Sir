import { combineReducers } from 'redux'
import settings from './settings/reducer'
import menu from './menu/reducer'
import authUser from './auth/reducer'
import reducerCreateProcess from '../views/app/data-integration/setupConnection/processEvents'
import viewProcesses from '../views/app/data-integration/setupConnection/processes/reducer'

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  process: reducerCreateProcess,
  viewProcesses
})

export default reducers
