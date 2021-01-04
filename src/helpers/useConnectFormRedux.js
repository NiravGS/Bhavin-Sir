import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { serialize } from './serializeFile'

export const useConnectFormWithRedux = (actionType, formInstance, newInformation) => {
  const [didReset, setDidReset] = useState(false)
  const allFields = formInstance.watch()
  const dispatch = useDispatch()

  useEffect(() => {
    setDidReset(true)
    formInstance.reset(newInformation)
    return () => {
      formInstance.reset()
    }
  }, [])

  const serializedFields = serialize(allFields)
  useDeepCompareEffect(() => {
    const handler = setTimeout(() => {
      if (didReset) {
        dispatch({ type: actionType, payload: serializedFields })
      }
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [serializedFields, actionType])
}
