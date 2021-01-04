/* eslint-disable camelcase */
import * as R from 'ramda'
import { getIntl } from '../../../../../IntlProvider'

const intlMessages = getIntl().messages

export const defaultSelect = (itemKey) => (
  { label: R.defaultTo(itemKey, intlMessages[`label.${itemKey}`]), value: itemKey }
)

export const selectDatabase = data => R.uniq(data.map(R.compose(defaultSelect, R.prop('type'))))

export const selectSourceNames = (data, type) => {
  return R.uniq(data
  ?.filter(R.propEq('type', type))
  ?.map(item => ({ label: item.sourceName, value: item.id })))
}

export const processNameSelector = (data, connectionId) => {
  const processes = data?.find(R.propEq('id', connectionId))?.sourceMasters
  return processes?.map?.(({ process_id, processName }) => ({ label: processName, value: String(process_id) }))
}
