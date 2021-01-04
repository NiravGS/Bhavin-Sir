/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import * as R from 'ramda'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Col, Row } from 'reactstrap'
import { SelectRow } from '../../../../../../components/Input/Select'
import { getSourceTypes } from '../../../../staticFields'
import {
  connectionFieldSelector,
  databaseFieldSelector,
  hasSchemaFieldSelector
} from '../../selector'
import SourceDatabaseField, { SourceSchemaField } from './SourceDatabaseField'

const isEqualToDatabase = R.equals('database')

const ConnectionInformationDatabase = ({
  connections,
  databaseOptionDisabled,
  prefixLabel,
  hasRowStageSchema,
  hasTable
}) => {
  const { watch } = useFormContext()

  const system = watch('system')
  const schema = watch('schema')
  const rawSchema = watch('rawSchema')
  const stageSchema = watch('stageSchema')
  const databaseName = watch('database')

  const databaseOptions = databaseFieldSelector(connections, system, databaseOptionDisabled)
  const hasSchema = hasSchemaFieldSelector(connections, system)
  const allSchemaIsFilled = R.or(
    R.and(R.and(hasSchema, !hasRowStageSchema), schema),
    R.and(hasRowStageSchema, schema, rawSchema, stageSchema)
  )
  const hasNeededDatabaseFields = R.and(databaseName, R.or(allSchemaIsFilled, !hasSchema))
  return (
    <>
      <SelectRow options={databaseOptions} name='database' label={`label.${prefixLabel}Database`} />
      {R.and(hasSchema, databaseName) && (
        <>
          {hasRowStageSchema && (
            <Row>
              <Col xs={12} md={6}>
                <SourceSchemaField
                  databaseName={databaseName}
                  connectionId={system}
                  label='label.rawSchema'
                  name='rawSchema'
                />
              </Col>
              <Col xs={12} md={6}>
                <SourceSchemaField
                  databaseName={databaseName}
                  connectionId={system}
                  label='label.stageSchema'
                  name='stageSchema'
                />
              </Col>
            </Row>
          )}
          <SourceSchemaField
            databaseName={databaseName}
            connectionId={system}
            label={`label.${prefixLabel}Schema`}
            name='schema'
          />

        </>)}
      {hasTable && hasNeededDatabaseFields && (
        <SourceDatabaseField
          databaseName={databaseName}
          connectionId={system}
          schema={schema}
          name='table'
          label={`label.${prefixLabel}Tables`}
        />
      )}
    </>

  )
}

const ConnectionInformationForm = ({
  prefixLabel, connections, hasTable,
  hasRowStageSchema,
  databaseOptionDisabled, hasLocalFileOption,
  onlyDatabase, onChangeType
}) => {
  const { watch, setValue } = useFormContext()

  const type = watch('type')

  const cleanSelectField = field => setValue(field, null)

  const cleanDatabaseFields = () => {
    cleanSelectField('database')
    cleanSelectField('table')
  }

  const handleChangeType = () => {
    onChangeType && onChangeType()
    cleanSelectField('system')
    cleanDatabaseFields()
  }

  const onChangeSystem = () => {
    cleanDatabaseFields()
  }

  const isDatabase = isEqualToDatabase(type)

  const connectionOptions = connectionFieldSelector(
    connections,
    type,
    { hasLocalFile: R.and(!isDatabase, hasLocalFileOption) }
  )

  return (
    <Row>
      <Col>
        <Row className='d-flex justify-content-center'>
          <Col xs={12} md={6}>
            <SelectRow
              options={getSourceTypes(onlyDatabase)}
              name='type'
              rules={{ required: true }}
              onChange={handleChangeType}
              defaultValue={onlyDatabase ? 'database' : ''}
              label={`label.${prefixLabel}Type`}
              isDisabled={onlyDatabase}
            />
            <SelectRow
              options={connectionOptions}
              name='system'
              onChange={onChangeSystem}
              rules={{ required: true }}
              label={`label.${prefixLabel}System`}
            />
          </Col>
        </Row>
        {isDatabase && (
          <Row className='d-flex justify-content-center'>
            <Col xs={12} md={6}>
              <ConnectionInformationDatabase
                connections={connections}
                databaseOptionDisabled={databaseOptionDisabled}
                prefixLabel={prefixLabel}
                hasRowStageSchema={hasRowStageSchema}
                hasTable={hasTable}
              />

            </Col>
          </Row>

        )}
      </Col>
    </Row>
  )
}

ConnectionInformationForm.propTypes = {
  prefixLabel: PropTypes.string,
  connections: PropTypes.array,
  hasTable: PropTypes.bool,
  onlyDatabase: PropTypes.bool
}

export default ConnectionInformationForm
