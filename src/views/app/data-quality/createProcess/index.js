import { yupResolver } from '@hookform/resolvers'
import * as R from 'ramda'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import * as yup from 'yup'
import Button from '../../../../components/button'
import Input from '../../../../components/Input/Input'
import Select from '../../../../components/Input/Select'
import LayoutBase from '../../../../components/LayoutContainer'
import { Notification, toggle } from '../../../../helpers/appUtils'
import IntlMessages from '../../../../helpers/IntlMessages'
import { getIntl } from '../../../../IntlProvider'
import { selectDatabase, selectSourceNames } from '../setupConnection/existingConnection/selector'
import AskFetchModal from '../setupConnection/newConnection/AskFetchModal'
import { databaseHasSchemaField } from '../setupConnection/newConnection/formLabelFields'
import { useAsyncCreateProcess, useAsyncFetchDbInfoByProcessId, useAsyncFetchSchema } from '../setupConnection/requests'
import SelectDataBaseField from '../setupConnection/SelectDataBaseField'
import { useFetchConnections } from './requests'
import { useValidateProcessName, validateProcessName } from './useValidateProcessName'

const messages = getIntl()?.messages

const validations = () => yupResolver(yup.object().shape({
  processName: yup.string().required(messages['formError.processReq']),
  connectionId: yup.number().required(messages['formError.sourceReq']),
  type: yup.string().required(messages['formError.dbTypeReq'])
}))

const CreateProcess = () => {
  const formInstance = useForm({
    resolver: validations()
  })
  const connData = useFetchConnections()
  const asyncFetchDbInfo = useAsyncFetchDbInfoByProcessId()
  const [askFetch, setAskFetch] = useState(false)
  const history = useHistory()

  const { executeValidation, loadingValidation } = useValidateProcessName()
  const [runCreateProcess, loadingProcess, createdProcessResponse] = useAsyncCreateProcess()
  const [runFetchSchemas, loadingSchemas, schemaOptions] = useAsyncFetchSchema()

  const { watch, setValue, handleSubmit } = formInstance
  const type = watch('type')
  const connectionId = watch('connectionId')

  const createdProcessId = createdProcessResponse?.processId

  const onSubmit = async (data) => {
    try {
      const res = await validateProcessName(data?.processName);
      if (!res?.error) {
        await runCreateProcess(data)
        setAskFetch(true)
        Notification.success(messages['label.processCreated'])
      }
    } catch {
      Notification.error(messages['formError.failedToCreateProcess'])
    }
  }

  const redirectToExistingProcess = () => {
    const url = '/app/data-quality/set-up-connection/create-configurations'
    setTimeout(() => {
      history.push(`${url}/${createdProcessId}`)
    }, 100)
  }

  const hasSchema = databaseHasSchemaField(type)

  useEffect(() => {
    if (hasSchema && connectionId) {
      runFetchSchemas(connectionId)
    }
  }, [hasSchema, connectionId])

  return (
    <LayoutBase label='create-process' md={11} lg={8} style={{ minHeight: '400px' }}>
      <FormProvider {...formInstance}>
        <form className='av-tooltip tooltip-label-right'>
          <Row>
            <Col>
              <Input label='label.processName' name='processName' formclass='error-l-100' />
              <SelectDataBaseField
                onChange={() => setValue('sourceName', null)}
                content={selectDatabase(connData)}
              />
              <Select
                label='label.database-source-name'
                id='database-source-name'
                options={selectSourceNames(connData, type)}
                name='connectionId'
              />
              {hasSchema && (
                <Select
                  id='database-source-name'
                  options={schemaOptions}
                  name='schema'
                  label='label.sourceSchema'
                  isLoading={loadingSchemas}
                />
              )}
            </Col>
          </Row>
          <Row className='pt-5 justify-content-center'>
            <Col xs={12} md='auto'>
              <Button
                loading={R.or(loadingValidation, loadingProcess)}
                size='lg'
                color='primary'
                onClick={handleSubmit(onSubmit)}
              >
                <IntlMessages id='label.create' />
              </Button>
            </Col>
          </Row>
        </form>
      </FormProvider>
      <AskFetchModal
        open={askFetch}
        asyncFetchDbInfo={asyncFetchDbInfo}
        processId={createdProcessId}
        onFinishFetch={redirectToExistingProcess}
        toggle={toggle(setAskFetch)}
      />
    </LayoutBase>
  )
}

CreateProcess.propTypes = {}

export default CreateProcess
