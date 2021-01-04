import { useFetchSWR } from '../../../../helpers/requestHelpers'

export const useFetchConnections = () => {
  const { data } = useFetchSWR('/user/connections')
  return data
}
