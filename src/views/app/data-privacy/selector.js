import * as R from 'ramda'
import { formatDefaultOption } from '../../../components/Input/Select'
import { getIntl } from '../../../IntlProvider'
// import { databaseHasSchemaField } from '../../data-quality/setupConnection/newConnection/formLabelFields'

const intlMessages = getIntl()?.messages

export const tablesFieldSelector = (tables) => {
    return tables?.map?.(item => formatDefaultOption(item.tableName))
}

export const columnFieldSelector = (columns = []) => R.map(R.prop('column_name'), columns)

export const mountConnectionSelect = R.map(con => ({
    label: con.connectionName,
    value: con.connectionId,
}))


export const databaseFieldSelector = (connections, connectionId) => {
    const selectedConnection = R.find(R.propEq('connectionId', connectionId), connections)
    return selectedConnection?.connectionDatabase
        ?.map(({ databaseName }) => ({ label: databaseName, value: databaseName }))
}