import PropTypes from 'prop-types'
import * as R from 'ramda'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Table } from 'reactstrap'
import { formatDefaultOption } from '../../../../../../components/Input/Select'
import { Notification } from '../../../../../../helpers/appUtils'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import {
  useSelectorProcess, useSelectorSourceInformation,
  useSelectorTargetInformation
} from '../../processEvents'
import { useFetchTablesFromDatabase } from '../requests'
import TargetInformationRow from './TargetInformationRow'

const selectColumnFromTable = (tableColumns, tableName) => {
  const columns = tableColumns?.find?.(R.propEq('tableName', tableName))?.columns
  return columns?.map(formatDefaultOption)
}

const TargetInformationTable = ({ databaseName, connectionId, schema }) => {
  const { createTargetTables } = useSelectorTargetInformation()
  const { table: sourceTables, fileInputs, isFileSystem } = useSelectorSourceInformation()
  const { sourceTableColumns } = useSelectorProcess()
  const { messages } = useIntl()
  const sourceContent = R.or(fileInputs, sourceTables)

  const {
    tables, error, loadingTable
  } = useFetchTablesFromDatabase({ databaseName, connectionId, schema }, false)

  useEffect(() => {
    error && Notification.error(messages['label.failedToConnect'])
  }, [error?.message])

  return (
    <Table>
      <thead>
        <tr>
          <th style={{ width: '20%' }}>
            <IntlMessages
              id={`label.${fileInputs ? 'fileInput' : 'sourceTable'}`}
            />
          </th>
          <th><IntlMessages id='label.targetTable' />*</th>
          <th style={{ width: '12%' }}><IntlMessages id='label.ingestionType' /></th>
          <th style={{ width: '12%' }}><IntlMessages id='label.cdcColumns' /></th>
          <th style={{ width: '13%' }}><IntlMessages id='label.scdType' /></th>
          <th style={{ width: '12%' }}><IntlMessages id='label.scdColumns' /></th>
        </tr>
      </thead>
      <tbody>
        {sourceContent?.map((contentItem) => {
          if (!isFileSystem) {
            return (
              <TargetInformationRow
                key={contentItem}
                itemName={contentItem}
                columns={selectColumnFromTable(sourceTableColumns, contentItem)}
                tables={tables}
                loadingTable={loadingTable}
                baseName={`targetItems[${contentItem}]`}
                createTargetTables={createTargetTables}
              />)
          } else {
            const columns = contentItem?.extractedColumns?.map(formatDefaultOption)
            return (
              <TargetInformationRow
                key={contentItem?.localId}
                showTargetTableText={createTargetTables}
                itemName={contentItem.filePath}
                columns={columns}
                loadingTable={loadingTable}
                tables={tables}
                baseName={`targetItems[${contentItem?.localId}]`}
                createTargetTables={createTargetTables}
              />
            )
          }
        }

        )}
      </tbody>
    </Table>
  )
}

TargetInformationTable.propTypes = {
  databaseName: PropTypes.string,
  connectionId: PropTypes.number,
  schema: PropTypes.string
}

export default TargetInformationTable
