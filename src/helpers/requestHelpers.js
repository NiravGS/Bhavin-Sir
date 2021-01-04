import qs from 'qs'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Notification } from './appUtils'
import request from './Request'

export const axiosGetSwr = url => request.get(url).then(res => res?.data)

export const useFetchSWR = (func, options = {}) => {
  // refactor to think a alternative to dedupingInterval: 15 * 1000 * 60,
  // it is still getting from cache even when revalidateOnMount is true (check from scratch)
  // todo create another fetch with and without deduping
  return useSWR(func,
    axiosGetSwr, {
      // dedupingInterval: 15 * 1000 * 60,
      suspense: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      ...options
    })
}

export const useAsync = (asyncFunction, options) => {
  const [pending, setPending] = useState(false)
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)

  const execute = (...params) => {
    setPending(true)
    setValue(null)
    setError(null)
    return asyncFunction(...params)
      .then(response => {
        setValue(response)
        return response
      })
      .catch((error, err) => {
        setError(error)
        if (options?.canThrow) throw error
      })
      .finally(() => setPending(false))
  }

  useEffect(() => {
    if (options?.immediate) {
      (async () => {
        await execute()
      })()
    }
  }, [])

  return [execute, pending, value, error]
}

export const mountParams = params => qs.stringify(params, { addQueryPrefix: true, skipNulls: true })

export const useResponseErrorNotification = (value, errorCode, errorNotification) => {
  useEffect(() => {
    if (value?.error?.name === errorCode) {
      Notification.error(errorNotification(value?.error))
    }
  }, [value?.error?.name])
}

export const useAsyncWithDefaultValidation = (asyncRequest, errorCode, errorNotification) => {
  const [executeValidation, loadingValidation, value] = useAsync(asyncRequest)
  useResponseErrorNotification(value, errorCode, errorNotification)

  const hasError = !!value?.error
  return [executeValidation, loadingValidation, hasError]
}
