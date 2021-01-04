import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import debounceRender from 'react-debounce-render'
import { SelectRow } from '../../../../../../components/Input/Select'
import { Notification } from '../../../../../../helpers/appUtils'
import { useFetchTablesFromDatabase, useFetchSchemaFromDatabase } from '../requests'
import { useDispatch } from 'react-redux'
import { useIntl } from 'react-intl'

const SourceDatabaseField = ({ name, label, schema, databaseName, connectionId }) => {
  const { messages } = useIntl()
  const { tables, loadingTable, error, data } = useFetchTablesFromDatabase({
    connectionId, databaseName, withColumns: true, schema
  })
  const dispatch = useDispatch()

  useEffect(() => {
    error && Notification.error(messages['label.failedToConnect'])
    dispatch({ type: 'setProcessSourceTableColumns', payload: data })
  }, [error?.message, loadingTable])

  return (
    <SelectRow
      options={tables}
      name={name}
      label={label}
      isLoading={loadingTable}
      isMulti
      closeMenuOnSelect={false}
    />)
}

SourceDatabaseField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  databaseName: PropTypes.string,
  connectionId: PropTypes.number,
  schema: PropTypes.string
}

export const SourceSchemaField = ({ name, label, databaseName, connectionId }) => {
  const { messages } = useIntl()
  const { loadingTable, error, schemaOptions } = useFetchSchemaFromDatabase(connectionId, databaseName)

  if (error) {
    Notification.error(messages['label.failedToConnect'])
  }

  return (
    <SelectRow
      options={schemaOptions}
      name={name}
      label={label}
      isLoading={loadingTable}
    />)
}

SourceSchemaField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  databaseName: PropTypes.string,
  connectionId: PropTypes.number
}

export default debounceRender(SourceDatabaseField, 100)