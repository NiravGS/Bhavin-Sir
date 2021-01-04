import { formatDefaultOption } from '../../../../components/Input/Select'
import { mountParams, useFetchSWR } from '../../../../helpers/requestHelpers'
import { getIntl } from '../../../../IntlProvider'
import { mountConnectionSelect, tablesFieldSelector } from '../selector'


const intlMessages = getIntl()?.messages

export const useFetchUserConnections = () => {
    const { data } = useFetchSWR('/data-integration/connections')
    return { connections: mountConnectionSelect(data), allData: data }
}

export const useFetchTablesFromDatabase = (filters, suspense) => {
    const urlParams = mountParams(filters)
    const shouldRequest = filters.connectionId && filters.databaseName
    console.log(urlParams)
    const { data, error } = useFetchSWR(
        () => shouldRequest ? `/data-integration/tables${urlParams}` : '', { suspense })

    if (data?.error?.name === 'ConnectionError') {
        return { error: intlMessages['label.failedToConnect'] }
    }
    const tables = tablesFieldSelector(data)

    return { tables, data, loadingTable: shouldRequest && !data && !error, error }
}

export const useFetchSchemaFromDatabase = ({ connectionId, databaseName }) => {
    const shouldRequest = connectionId && databaseName
    const { data, error } = useFetchSWR(
        () => shouldRequest
            ? `/data-integration/schemas/${databaseName}/${connectionId}`
            : '', { suspense: false })

    const schemaOptions = data?.map(item => formatDefaultOption(item.schemaname))
    return { schemaOptions, loadingTable: shouldRequest && !data && !error, error }
}