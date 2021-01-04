/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import * as R from 'ramda'
import React, { memo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { BottomNavigation } from '../../../../../../components/wizard/BottomNavigation'
import { FormDevTool, Notification } from '../../../../../../helpers/appUtils'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useConnectFormWithRedux } from '../../../../../../helpers/useConnectFormRedux'
import {
  useSelectorSourceInformation,
  useSelectorTargetInformation
} from '../../processEvents'
import ConnectionInformationForm from '../connectionInformationForm'
import { useFetchUserConnections } from '../requests'
import TargetInformationFile from './TargetInformationFile'
import TargetInformationTable from './TargetInformationTable'

const sourceFormHasSameConnection = (
  { type: sourceType, system: sourceSytemConnection },
  { type: targetType, system: targetSytemConnection }
) => {
  return R.and(
    R.equals(sourceSytemConnection, targetSytemConnection),
    R.equals(sourceType, targetType)
  )
}

const isFileType = R.equals('fileSystem')

const TargetInformation = ({ next, prev }) => {
  const sourceInformation = useSelectorSourceInformation()
  const targetInformation = useSelectorTargetInformation()
  const formInstance = useForm()
  const { messages } = useIntl()
  const connections = useFetchUserConnections()

  useConnectFormWithRedux('setTargetInfo', formInstance, targetInformation)

  const { database: sourceDatabase, type: sourceType } = sourceInformation
  const isSameConnection = sourceFormHasSameConnection(sourceInformation, targetInformation)
  const databaseOptionDisabled = isSameConnection ? sourceDatabase : undefined

  const { database, system, schema, type } = targetInformation
  const targetTypeIsFile = isFileType(type)

  const hasNeededFileFields = (targetTypeIsFile && system)

  const sourceTypeIsFile = isFileType(sourceType)

  const onValidateErrors = () => {
    Notification.error(messages['formError.requiredFields'])
  }

  return (
    <FormProvider {...formInstance}>
      <Row className='d-flex justify-content-center'>
        <Col xs={12} md={6} />
      </Row>
      <Row className='d-flex justify-content-center'>

        <Col>
          <ConnectionInformationForm
            databaseOptionDisabled={databaseOptionDisabled}
            prefixLabel='target'
            connections={connections}
            hasRowStageSchema
            onlyDatabase={sourceTypeIsFile}
          />
          <Row className='d-flex justify-content-center'>
            <Col xs={12} md={6}>
              <FormGroup check>
                <Label check>
                  <Input
                    innerRef={formInstance.register}
                    name='createTargetTables'
                    type='checkbox'
                  />
                  <IntlMessages id='label.createTargetTables' />
                </Label>
              </FormGroup>
            </Col>
          </Row>

        </Col>
      </Row>
      <Row className='mt-2'>
        <Col>
          <TargetInformationTable
            databaseName={database}
            connectionId={system}
            schema={schema}
          />
        </Col>
      </Row>
      {hasNeededFileFields && (
        <Row className='mt-2'><Col><TargetInformationFile /></Col></Row>
      )}
      <BottomNavigation
        onClickNext={(...params) => formInstance.handleSubmit(() => next(...params), onValidateErrors)()}
        onClickPrev={prev}
        className='justify-content-center mt-3'
        prevLabel={messages['wizard.prev']}
        nextLabel={messages['wizard.next']}
      />
      <FormDevTool control={formInstance.control} />
    </FormProvider>
  )
}

TargetInformation.propTypes = {
  sourceTables: PropTypes.array
}

export default memo(TargetInformation, R.equals)
