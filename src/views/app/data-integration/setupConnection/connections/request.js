import { useFetchSWR, useAsync } from '../../../../../helpers/requestHelpers'
import request from '../../../../../helpers/Request'

export const useConnections = () => {
    return useFetchSWR('/data-integration/connections')
}

export const useASyncDeleteProcess = () => {
    return useAsync(connectionId =>
        request.delete(`/data-integration/connection/${connectionId}`))
}