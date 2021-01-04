import { useIntl } from 'react-intl'
import request from '../../../../helpers/Request'
import { useAsyncWithDefaultValidation } from '../../../../helpers/requestHelpers'

export const validateProcessName = async (processName) => {
  // let data;
  const data = await request.post('/src-connection/validateProcessName', { processName })
//  .then(r => data = r.data)
 // .catch(error => data = error);
  return data;
}

export const useValidateProcessName = () => {
  const { messages } = useIntl()

  const [executeValidation, loadingValidation] = useAsyncWithDefaultValidation(
    validateProcessName,
    'process_name_already_exists',
    (res) => `"${JSON.parse(res?.message)?.processName}" ${messages['alert.error.processName']}`

  )

  return { executeValidation, loadingValidation }
}
