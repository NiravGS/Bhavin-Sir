import request from '../../../../../helpers/Request'
import { useAsync, useFetchSWR } from '../../../../../helpers/requestHelpers'
import { processAskTypeEvents } from './ProcessActionButtons'

export const useSwrFetchAllProcess = () => {
  const { data, mutate } = useFetchSWR('/data-integration/process')
  return [data, mutate]
}

export const useASyncActivation = (action) => {
  const active = action === processAskTypeEvents.activate ? 'Y' : 'N'
  return useAsync(processId =>
    request.post(`/data-integration/process/active/${processId}?active=${active}`))
}

export const useASyncDeleteProcess = () => {
  return useAsync(processId =>
    request.delete(`/data-integration/process/${processId}`))
}
