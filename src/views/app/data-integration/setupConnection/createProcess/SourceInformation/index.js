/* eslint-disable react/prop-types */
import * as R from 'ramda'
import React, { memo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Col, Label, Row } from 'reactstrap'
import Input, { InputRadio } from '../../../../../../components/Input/Input'
import { BottomNavigation } from '../../../../../../components/wizard/BottomNavigation'
import { FormDevTool, Notification } from '../../../../../../helpers/appUtils'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useConnectFormWithRedux } from '../../../../../../helpers/useConnectFormRedux'
import { getIntl } from '../../../../../../IntlProvider'
import { useSelectorSourceInformation } from '../../processEvents'
import ConnectionInformationForm from '../connectionInformationForm'
import { useFetchUserConnections } from '../requests'
import FileInputs from './FileInputs'
import FileInputsForFile from './FileInputsForFile'

const { messages } = getIntl()

const HandleFileInputs = ({ sourceInfo, name }) => {
  if (
    !R.equals(sourceInfo.type, 'fileSystem') ||
    R.isNil(sourceInfo.system)
  ) return ''

  if (sourceInfo.system === 'localSystem') { return <FileInputs name={name} /> }

  return <FileInputsForFile name={name} />
}

const SourceInformation = ({ next }) => {
  const connections = useFetchUserConnections()
  const sourceInfo = useSelectorSourceInformation()

  const formInstance = useForm()
  useConnectFormWithRedux('setSourceInfo', formInstance, sourceInfo)

  const onValidateErrors = () => {
    Notification.error(messages['formError.requiredFields'])
  }

  return (
    <FormProvider {...formInstance}>
      <form>
        <Row className='d-flex justify-content-center'>
          <Col>
            <Row className='d-flex justify-content-center'>
              <Col xs={12} md={6}>
                <InputRadio
                  label='label.cloudType'
                  name='cloudType'
                  content={[
                    { label: 'label.cloudType.aws', value: 'aws' },
                    { label: 'label.cloudType.gcp', value: 'gcp' },
                    { label: 'label.cloudType.azure', value: 'azure' }
                  ]}
                />
              </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
              <Col xs={12} md={6}>
                <Input label='label.cloudBucket' name='cloudBucket' />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <ConnectionInformationForm
                  prefixLabel='source'
                  connections={connections}
                  hasTable
                  hasLocalFileOption
                  onChangeType={() => formInstance.setValue('fileInputs', null)}
                />
                <HandleFileInputs sourceInfo={sourceInfo} name='fileInputs' />
              </Col>
            </Row>
            {
              R.isNil(sourceInfo.system) && (
                <Row className='d-flex justify-content-center'>
                  <Col xs={12} md={6}>
                    <Link to='/app/data-integration/set-up-connection/create-connection?from=createProcess' className='btn btn-link'>
                      <Label className='mt-1'>
                        <IntlMessages id='label.addNewSource' />
                      </Label>
                    </Link>
                  </Col>
                </Row>
              )
            }
          </Col>
        </Row>
        <BottomNavigation
          onClickNext={(...params) => formInstance.handleSubmit(() => next(...params), onValidateErrors)()}
          className='justify-content-center'
          prevLabel={messages['wizard.prev']}
          nextLabel={messages['wizard.next']}
        />
      </form>
      <FormDevTool control={formInstance.control} />
    </FormProvider>
  )
}

export default memo(SourceInformation, R.equals)
