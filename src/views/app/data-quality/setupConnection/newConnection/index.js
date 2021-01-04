/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import React from 'react'
import { injectIntl } from 'react-intl'
import { useAsyncSaveData, useAsyncFetchDbInfoByProcessId } from '../requests'
import ReviewConnection from '../review'
import NewConnectionForms from './NewConnectionForms'

const NewConnection = () => {
  const [runSaveConnection, loading, connection] = useAsyncSaveData()
  const connectionData = connection?.data

  return (
    <NewConnectionForms
      processId={connectionData?.process_id}
      runSaveConnection={runSaveConnection}
    />

  )
}

export default NewConnection
