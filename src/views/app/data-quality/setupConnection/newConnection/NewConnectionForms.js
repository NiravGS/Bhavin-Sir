import { yupResolver } from '@hookform/resolvers'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { injectIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import LayoutBase from '../../../../../components/LayoutContainer'
import { Notification, toggle } from '../../../../../helpers/appUtils'
import testConnection from '../../../testConnection'
import DatabaseConnectionModal from './DatabaseConnection'
import SelectNewDatabase from './SelectNewDatabase'

const getConnectionValidations = (messages = []) => yup.object().shape({
  sourceName: yup.string().required(messages['formError.sourceReq']),
  host: yup.string().required(messages['formError.hostReq']),
  username: yup.string().required(messages['formError.userReq']),
  port: yup.string().required(messages['formError.portReq']),
  password: yup.string().required(messages['formError.passwordReq'])
})

const mountDataToSend = (data) => ({ ...data, type: data.type })

const NewConnectionForms = ({ intl, runSaveConnection }) => {
  const history = useHistory()
  const [openDatabaseConnection, setOpenDatabaseConnection] = useState(false)

  const saveConnection = async (data) => {
    try {
      await runSaveConnection(mountDataToSend(data))
      setOpenDatabaseConnection(false)
      Notification.success('Database connection has been saved!')
      setTimeout(() => { history.push('/app/data-quality/process') }, 150)
    } catch (error) {
      Notification.error('Failed to save the database connection')
    }
  }

  const methods = useForm({
    resolver: yupResolver(getConnectionValidations(intl?.messages))
  })
  return (
    <LayoutBase label='new-connection' md={10} lg={6}>
      <FormProvider {...methods}>
        <form className='av-tooltip tooltip-label-right'>
          <SelectNewDatabase showConnectionFields={() => {
            setOpenDatabaseConnection(true)
          }}
          />
          <DatabaseConnectionModal
            open={openDatabaseConnection}
            onTest={testConnection}
            onSave={saveConnection}
            toggle={toggle(setOpenDatabaseConnection)}
          />
        </form>
      </FormProvider>
    </LayoutBase>
  )
}

export default injectIntl(NewConnectionForms)

NewConnectionForms.propTypes = {
  intl: PropTypes.object,
  processId: PropTypes.number,
  runSaveConnection: PropTypes.func,
  asyncFetchDbInfo: PropTypes.object
}
