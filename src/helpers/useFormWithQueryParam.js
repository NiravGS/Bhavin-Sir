import * as qs from 'query-string'
import { useEffect, useState } from 'react'
import * as R from 'ramda'
import { useHistory, useLocation } from 'react-router-dom'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useWatch } from 'react-hook-form'

const paseByKey = (parsed, conversionFunc) => {
  const parsedConverted = {}
  R.keys(parsed).forEach(key => {
    parsedConverted[key] = conversionFunc[key] ? conversionFunc[key](parsed[key]) : parsed[key]
  })
  return parsedConverted
}

export const useFormWithQueryParam = (formInstance, conversionFunc = {}) => {
  const location = useLocation()
  const [didUpdate, setDidUpdate] = useState(false)
  const history = useHistory()
  const allValues = useWatch({ control: formInstance.control })

  useEffect(() => {
    const parsed = qs.parse(location.search)
    const parsedConverted = paseByKey(parsed, conversionFunc)
    if (!R.equals(parsedConverted, allValues)) formInstance.reset(parsedConverted)
    setDidUpdate(true)
  }, [location.search])

  useDeepCompareEffect(() => {
    if (didUpdate) {
      history.push({
        pathname: history.location.pathname,
        search: qs.stringify(allValues, { addQueryPrefix: true })
      })
    }
  }, [allValues])
}
