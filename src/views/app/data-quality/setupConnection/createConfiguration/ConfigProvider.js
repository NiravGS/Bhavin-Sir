import PropTypes from 'prop-types'
import React, { createContext, useContext, useReducer } from 'react'
import { configReducer } from './events'

const ConfigStateContext = createContext()
const ConfigDispatchContext = createContext()

export function ConfigProvider ({ children }) {
  const [state, dispatch] = useReducer(configReducer, {
    selectedTable: {}
  })
  return (
    <ConfigStateContext.Provider value={state}>
      <ConfigDispatchContext.Provider value={dispatch}>
        {children}
      </ConfigDispatchContext.Provider>
    </ConfigStateContext.Provider>
  )
}

ConfigProvider.propTypes = {
  children: PropTypes.any
}

export const useConfigDispatch = () => useContext(ConfigDispatchContext)
export const useConfigState = () => useContext(ConfigStateContext)
