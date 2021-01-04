/* eslint-disable react/jsx-handler-names */
import React from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import LayoutBase from '../../../../../components/LayoutContainer'
import { Notification } from '../../../../../helpers/appUtils'
import { useProcessId } from '../../../data-quality/setupConnection/createConfiguration/helper'
import { LoadingSpinner } from '../../../data-quality/setupConnection/Dashboard/SuspenseChart'
import CreateProcessContent from '../createProcess/CreateProcessContent'
import { useAsyncUpdateProcess, useSwrFetchProcess } from './request'

const EditProcess = () => {
  const { loading } = useSwrFetchProcess()
  const [runUpdate, loadingUpdate] = useAsyncUpdateProcess()
  const processId = useProcessId()
  const history = useHistory()
  const { messages } = useIntl()

  const submitEditProcess = async (data) => {
    await runUpdate(data)
    Notification.success(messages['label.processUpdated'])
    setTimeout(() => {
      history.push(`/app/data-integration/set-up-connection/review-process/${processId}`)
    }, 500)
  }

  return loading
    ? <LoadingSpinner /> : (
      <LayoutBase label='editProcess'>
        <CreateProcessContent
          loadingSubmit={loadingUpdate}
          actionButtonLabel='control.update'
          onSubmit={submitEditProcess}
        />
      </LayoutBase>
    )
}

EditProcess.propTypes = {}

export default EditProcess
