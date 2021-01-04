/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import {
  Provider,
  createStoreHook,
  createDispatchHook,
  createSelectorHook
} from 'react-redux'
import React, { createContext, useContext, useReducer } from 'react'
import { createStore } from 'redux'

export const mountDefaultProvider = (reducer, defaultReducer) => {
  const StateContext = createContext()
  const DispatchContext = createContext()

  function DefaultProvider ({ children, extraValue = {} }) {
    const [state, dispatch] = useReducer(reducer, defaultReducer)

    return (
      <StateContext.Provider value={{ ...state, ...extraValue }}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </StateContext.Provider>
    )
  }

  DefaultProvider.propTypes = {
    children: PropTypes.any,
    extraValue: PropTypes.object
  }

  const useDispatch = () => useContext(DispatchContext)
  const useState = () => useContext(StateContext)

  return [DefaultProvider, useDispatch, useState]
}

export const mountReduxCustomProvider = (rootReducer, initialState) => {
  const MyContext = React.createContext(initialState)

  const useStore = createStoreHook(MyContext)
  const useDispatch = createDispatchHook(MyContext)
  const useSelector = createSelectorHook(MyContext)

  const myStore = createStore(rootReducer, initialState)

  function ReduxProvider ({ children }) {
    return (
      <Provider context={MyContext} store={myStore}>
        {children}
      </Provider>
    )
  }

  return [useStore, useDispatch, useSelector, ReduxProvider]
}
