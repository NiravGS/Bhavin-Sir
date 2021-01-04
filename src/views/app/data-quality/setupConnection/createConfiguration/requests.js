import { useAsync, axiosGetSwr, useFetchSWR } from '../../../../../helpers/requestHelpers'
import useSWR from 'swr'
import request from '../../../../../helpers/Request'

export const useAsyncCreateConfig = () => useAsync((processId, data) => {
  return request.post(`/config/${processId}`, data)
}, { canThrow: true })

export const useAsyncCreateSchedule = () => useAsync((processId, data) => {
  return request.post(`/schedule/${processId}`, data)
}, { canThrow: true })

export const useSwrFetchBasicInfo = (processId) => {
  return useSWR(`/source-master/${processId}`, axiosGetSwr, { suspense: true, revalidateOnFocus: false, revalidateOnReconnect: false })
}

export const useSwrFetchSchedules = (processId) => {
  return useFetchSWR(`/schedule/${processId}`, { suspense: false })
}

export const deleteSchedule = (schedule) => {
  return request.post(`/schedule-delete/${schedule.process_id}`, schedule)
}
