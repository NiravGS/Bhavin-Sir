import * as R from 'ramda'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Notification } from '../../../../../helpers/appUtils'
import request from '../../../../../helpers/Request'
import { axiosGetSwr, useAsync } from '../../../../../helpers/requestHelpers'
import { useProcessId } from '../../../data-quality/setupConnection/createConfiguration/helper'
import { sendProcessFile } from '../createProcess/requests'
import { mountReceivedProcess, parseProcessToSend } from '../normalizeSelector'

export const useAsyncUpdateProcess = () => {
  const processId = useProcessId()
  const { messages } = useIntl()
  return useAsync(async content => {
    const data = parseProcessToSend(content)
    await sendProcessFile(content)
    return request.post(`/data-integration/process/${processId}`, data)
      .catch(() => Notification.error(messages['formError.failedToUpdateProcess']))
  })
}

export const useAsyncRunProcess = () => {
  return useAsync(processId => request.get(`/data-integration/process/run/${processId}`))
}

export const useSwrFetchProcess = () => {
  const dispatch = useDispatch()
  const processId = useProcessId()
  const [run, loading, dataResponse] = useAsync(() => axiosGetSwr(`/data-integration/process/${processId}`), { immediate: true })

  const data = dataResponse && mountReceivedProcess(dataResponse)
  useEffect(() => {
    dispatch({ type: 'setInitialProcessData', payload: data })
    dispatch({ type: 'setProcessViewInfo', payload: dataResponse })
    dispatch({ type: 'setObjectList', payload: dataResponse?.objectList })
  }, [!!data])

  return {
    loading
  }
}

export const listenRunningProcess = (databaseRef, dispatch) => {
  databaseRef.on('value', function (data) {
    const processes = data.val()
    dispatch({ type: 'setProcessExecutionList', payload: processes })
    R.keys(processes).forEach(processId => {
      const { isRunning, error } = processes[processId]
      if (!isRunning && !error) {
        Notification.success(`Process ${processId} finished with success!`)
        databaseRef.remove(() => processId)
      }
    })
  })
}

export const useProcessExecutions = () => {
  return useSelector(state => state.viewProcesses?.executions, R.equals)
}
