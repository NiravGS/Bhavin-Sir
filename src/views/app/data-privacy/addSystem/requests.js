import { useAsync } from '../../../../helpers/requestHelpers'
import { removeEmptyData } from '../../../../helpers/appUtils'
import request from '../../../../helpers/Request'

export const useAsyncCreateConnection = () => useAsync(data =>
  request.post('/data-integration/connection', removeEmptyData(data)))

export const useAsyncCheckExistingConnection = () => useAsync(connectionName =>
  request.post('/data-integration/connection-name-exists', { connectionName }))

export const useAsynctestConnection = () => useAsync(data =>
  request.post('/src-connection/test', removeEmptyData(data)))
