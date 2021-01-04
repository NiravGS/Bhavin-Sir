import { useEffect } from 'react'

export const useEffectUnmountCancel = (func, params = [], time = 100) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      func()
    }, time)
    return () => {
      clearTimeout(timeout)
    }
  }, params)
}
