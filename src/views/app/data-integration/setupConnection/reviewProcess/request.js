import { useFetchSWR } from '../../../../../helpers/requestHelpers'
import { useProcessId } from '../../../data-quality/setupConnection/createConfiguration/helper'

export const useSwrCreateConnection = () => {
  const processId = useProcessId()
  const { data } = useFetchSWR(`/data-integration/process/executions/${processId}`)
  return data
}
