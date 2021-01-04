import { useIntl } from 'react-intl'
import { formatDefaultOption } from '../../../../components/Input/Select'
import { removeEmptyData } from '../../../../helpers/appUtils'
import request from '../../../../helpers/Request'
import { axiosGetSwr, useAsync, useAsyncWithDefaultValidation, useFetchSWR } from '../../../../helpers/requestHelpers'

export const useAsyncSaveData = () => useAsync(data =>
  request.post('/src-connection', removeEmptyData(data)), { canThrow: true })

export const useAsyncCreateProcess = () => useAsync(data =>
  request.post('/only-process', removeEmptyData(data)).then(res => res.data),
{ canThrow: true }
)

export const useAsyncFetchSchema = () => useAsync(async (connectionId) => {
  const response = await axiosGetSwr(`/user/schemas/${connectionId}`)
  return response?.map(item => formatDefaultOption(item.schemaname))
})

export const useAsyncFetchDbInfoByProcessId = () => {
  const [runFetchDbInfo, loadingFetch, fetchResponse] = useAsync(
    processId => request.get(`/fetch/${processId}`),
    { canThrow: true }
  )
  return { runFetchDbInfo, loadingFetch, fetchResponse }
}

export const useAsyncGetConfiguration = (processId) => {
  const { data, isValidating } = useFetchSWR(`/config/${processId}`)
  return {
    configuration: data,
    loading: isValidating
  }
}

const validateConnNameExistsRequest = connectionName => {
  return request.post('/src-connection/checkNameExists', { connectionName })
    .then(res => res.data)
}

export const useAsyncValidateConnNameExists = () => {
  const { messages } = useIntl()
  return useAsyncWithDefaultValidation(
    validateConnNameExistsRequest,
    'conn_name_already_exists',
    () => messages['label.error.connectionNameExists']
  )
}
