import { Notification, removeEmptyData } from '../../helpers/appUtils'
import request from '../../helpers/Request'
import { getIntl } from '../../IntlProvider'
const { messages } = getIntl()

const testConnection = async (data) => {
  try {
    await request.post('/src-connection/test', { ...removeEmptyData(data), port: Number(data.port) })
    Notification.success('Database is connected!')
    return true
  } catch (error) {
    Notification.error(`${messages['label.failedToConnectTo']}`)
    return false
  }
}

export default testConnection
