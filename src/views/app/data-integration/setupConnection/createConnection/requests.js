import { useAsync,useFetchSWR, useAsyncWithDefaultValidation } from '../../../../../helpers/requestHelpers'
import { removeEmptyData } from '../../../../../helpers/appUtils'
import request from '../../../../../helpers/Request'
import { useIntl } from 'react-intl'

export const useAsyncCreateConnection = () => useAsync(data =>
  request.post('/data-integration/connection', removeEmptyData(data)))

export const useAsyncCheckExistingConnection = () => useAsync(connectionName =>
  request.post('/data-integration/connection-name-exists', { connectionName }))

export const useAsyncFetchExistingConnection = (connectionID) => {
  return useFetchSWR(`/data-integration/connections/${connectionID}`)
}


export const checkExistingConnection = async connectionName =>
  request.post('/data-integration/connection-name-exists', { connectionName }).then(r => r.data)

export const useAsyncValidateConnNameExists = () => {
  const { messages } = useIntl()
  return useAsyncWithDefaultValidation(
    checkExistingConnection,
    'conn_name_already_exists',
    () => messages['label.error.connectionNameExists']
  )
}