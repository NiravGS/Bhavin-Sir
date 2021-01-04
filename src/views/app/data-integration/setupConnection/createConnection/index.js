import qs from 'qs'
import * as R from 'ramda'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import Button from '../../../../../components/button'
import Input from '../../../../../components/Input/Input'
import Select, { SelectRow } from '../../../../../components/Input/Select'
import LayoutBase from '../../../../../components/LayoutContainer'
import { Notification, removeEmptyData, toggle } from '../../../../../helpers/appUtils'
import IntlMessages from '../../../../../helpers/IntlMessages'
import { AskModal } from '../../../data-quality/setupConnection/createConfiguration/fieldModals/AskModalDefault'
import DatabaseConnectionModal from '../../../data-quality/setupConnection/newConnection/DatabaseConnection'
import { formFileOptions } from '../../../data-quality/setupConnection/newConnection/formLabelFields'
import SelectDataBaseField from '../../../data-quality/setupConnection/SelectDataBaseField'
import { sourceTypes } from '../../../staticFields'
import testConnection from '../../../testConnection'
import { useAsyncCreateConnection, useAsyncValidateConnNameExists } from './requests'

const isDatabase = R.equals('database')

const mountDataToSend = (data) => ({ ...data, port: Number(data.port) })

const CreateConnection = () => {
  const intl = useIntl()
  const history = useHistory()
  const location = useLocation()
  const [openDatabaseConnection, setOpenDatabaseConnection] = useState(false)
  const [openAskRedirection, setOpenAskRedirection] = useState(false)
  const [runCreateConnection] = useAsyncCreateConnection()
  const [runCheckConnectionExists, loadingConnectionExists, connectionExists] = useAsyncValidateConnNameExists()

  const formMethods = useForm()

  const sourceType = formMethods.watch('sourceType')
  const dbType = formMethods.watch('type')

  useEffect(() => {
    setOpenDatabaseConnection(dbType && !connectionExists)
  }, [connectionExists, dbType])

  const goToCreateProcessWhenComesFromThere = () => {
    const queryObject = qs.parse(location.search, { ignoreQueryPrefix: true })
    if (R.equals(queryObject?.from, 'createProcess')) {
      history.push('/app/data-integration/set-up-connection/create-process')
    } else {
      setOpenAskRedirection(true)
    }
  }
  const saveConnection = async (data) => {
    try {
      if (!isDatabase(sourceType) || await testConnection(data)) {
        await runCreateConnection(mountDataToSend(data))
        setOpenDatabaseConnection(false)
        Notification.success('Database connection has been saved!')
        setTimeout(goToCreateProcessWhenComesFromThere, 500)
      }
    } catch (error) {
      Notification.error('Failed to save the database connection')
    }
  }

  const checkConnectionExists = async () => {
    const connectionName = formMethods.watch('connectionName')
    if (connectionName) {
      const res = await runCheckConnectionExists(connectionName)
      if (res?.error) {
        formMethods.setError('connectionName', 'manual', intl.messages['label.error.connectionNameExists'])
        return true
      } else {
        formMethods.clearErrors(['connectionName'])
        return false
      }
    }
  }

  const openConnectionModal = async () => {
    const alreadyExists = await checkConnectionExists()
    setOpenDatabaseConnection(!alreadyExists)
  }

  return (
    <LayoutBase label='create-connection' md={7}>
      <FormProvider {...formMethods}>
        <Row>
          <Col className='av-tooltip tooltip-label-right'>
            <Input
              formclass='error-l-125'
              onBlur={checkConnectionExists}
              label='label.connectionName'
              name='connectionName'
            />
          </Col>
        </Row>
        <Row>
          <Col><Select options={sourceTypes} name='sourceType' label='label.sourceType' /></Col>
        </Row>
        {isDatabase(sourceType) ? (
          <Row>
            <Col><SelectDataBaseField /></Col>
          </Row>
        ) : (
          <SelectRow
            label='label.source-file-type'
            options={formFileOptions}
            name='type'
          />
        )}
        <Row>
          <Col className='d-flex justify-content-center'>
            <Button
              size='lg'
              onClick={openConnectionModal}
              loading={loadingConnectionExists}
              disabled={!isDatabase(sourceType) || !dbType || connectionExists}
            >
              <IntlMessages id='control.create' />
            </Button>
          </Col>
        </Row>

        <DatabaseConnectionModal
          open={openDatabaseConnection}
          onTest={testConnection}
          onSave={saveConnection}
          toggle={toggle(setOpenDatabaseConnection)}
        />

        <AskModal
          open={openAskRedirection}
          toggle={toggle(setOpenAskRedirection)}
        >
          <Row className='justify-content-center'>
            <Col xs={12} md='auto'>
              <Link to='/app/data-integration/set-up-connection/create-process'>
                <Button size='md' color='primary'>
                  <IntlMessages id='label.createProcess' />
                </Button>
              </Link>
            </Col>
            <Col xs={12} md='auto'>
              <Link to='/app/data-integration/set-up-connection/connections'>
                <Button size='md' color='secondary'>
                  <IntlMessages id='label.viewConnections' />
                </Button>
              </Link>
            </Col>
          </Row>
        </AskModal>
      </FormProvider>
    </LayoutBase>
  )
}

CreateConnection.propTypes = {}

export default CreateConnection
