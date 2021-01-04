import { useFetchSWR, useAsync } from '../../../../../helpers/requestHelpers'
import { removeEmptyData } from '../../../../../helpers/appUtils'
import request from '../../../../../helpers/Request'

export const useFetchUserProcesses = () => {
  const { data } = useFetchSWR('/user/processes')
  return data
}

export const useAsyncRefetchData = () => useAsync(data =>
  request.post('/refresh-schema', removeEmptyData(data)), { canThrow: true })
