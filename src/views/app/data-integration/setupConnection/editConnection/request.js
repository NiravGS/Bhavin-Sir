import * as R from 'ramda'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRouteMatch } from 'react-router-dom'

import { useAsync } from '../../../../../helpers/requestHelpers'

import request from '../../../../../helpers/Request'


export const useAsyncUpdateProcess = () => {
    const connectionId = useConnectionId()
    const { messages } = useIntl()
    return useAsync(async content => {
      const data = parseProcessToSend(content)
      return request.post(`/data-integration/connections/${connectionId}`, data)
        .catch(() => Notification.error(messages['formError.failedToUpdateConnection']))
    })
  }

  const parseProcessToSend = (data) => {
      return {
          data: { host: data.host, post: data.port, database: data.database, username: data.username},
          password: data.password,
          connectionName: data.connectionName,
          type: data.type,
          databases: data.databases,
          sourceType: data.sourceType
      }
  }

  const useConnectionId = () => {
    const match = useRouteMatch()
    return match?.params?.connectionId
  }