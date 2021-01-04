import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { formatDefaultOption } from '../../../../../components/Input/Select'
import { Notification } from '../../../../../helpers/appUtils'
import request from '../../../../../helpers/Request'
import { mountParams, useAsync, useFetchSWR, useResponseErrorNotification } from '../../../../../helpers/requestHelpers'
import { getIntl } from '../../../../../IntlProvider'
import { parseFileToSend, parseProcessToSend } from '../normalizeSelector'
import { mountConnectionSelect, tablesFieldSelector } from '../selector'
import { UserProcessIndexDb } from './SourceInformation/InputFileUpload'

const intlMessages = getIntl()?.messages

export const useFetchUserConnections = () => {
  const dispatch = useDispatch()
  const { data } = useFetchSWR('/data-integration/connections')

  useEffect(() => {
    dispatch({ type: 'setProcessConnections', payload: mountConnectionSelect(data) })
  }, [data])
  return data
}

export const useFetchTablesFromDatabase = (filters, suspense) => {
  const urlParams = mountParams(filters)
  const { messages } = useIntl()
  const shouldRequest = filters.connectionId && filters.databaseName
  const { data, error } = useFetchSWR(
    () => shouldRequest ? `/data-integration/tables${urlParams}` : '', { suspense })

  useResponseErrorNotification(
    data,
    'connection_not_found_for_this_user',
    () => messages['label.error.connectionNotFoundForUser']
  )

  const tables = tablesFieldSelector(data)

  return { tables, data, loadingTable: shouldRequest && !data && !error, error }
}

export const useFetchSchemaFromDatabase = (connectionId, databaseName) => {
  const shouldRequest = connectionId && databaseName
  const { data, error } = useFetchSWR(
    () => shouldRequest
      ? `/data-integration/schemas/${databaseName}/${connectionId}`
      : '', { suspense: false })

  const schemaOptions = data?.map(item => formatDefaultOption(item.schemaname))

  return { schemaOptions, loadingTable: shouldRequest && !data && !error, error }
}

export const sendProcessFile = async data => {
  const userProcessIndexDb = new UserProcessIndexDb()
  const parsedData = await parseFileToSend(data, userProcessIndexDb)
  const hasFileToSend = Array.from(parsedData.values()).length
  if (hasFileToSend) {
    await request.post('/data-integration/process/file', parsedData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.data)
  }
  await userProcessIndexDb.db.delete()
}

export const useCreateProcess = () => {
  const { messages } = useIntl()
  const history = useHistory()
  const [runCreateProcess, loadingCreateProcess] = useAsync(data => {
    return request.post('/data-integration/process', parseProcessToSend(data))
      .catch(() => Notification.error(messages['formError.failedToCreateProcess']))
  }, { canThrow: true })

  const createProcess = async (data) => {
    const res = await runCreateProcess(data)
    await sendProcessFile(data)
    Notification.success(intlMessages['label.processCreated'])
    setTimeout(() => {
      history.push(`/app/data-integration/set-up-connection/review-process/${res.data?.processId}`)
    }, 500)
  }

  return { createProcess, loadingCreateProcess }
}
