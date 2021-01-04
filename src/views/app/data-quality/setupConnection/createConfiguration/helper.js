/* eslint-disable camelcase */
import * as R from 'ramda'
import { useRouteMatch } from 'react-router-dom'
import { getIntl } from '../../../../../IntlProvider'
const intl = getIntl()

export const staticDataChecks = [
  { label: 'dateFormat', column: 'col_date_format' },
  { label: 'count', column: 'row_count' },
  { label: 'unique', column: 'col_unique' },
  { label: 'notNull', column: 'col_not_null' },
  { label: 'null', column: 'col_null' },
  { label: 'regexValidation', column: ['col_regex_match', 'col_regex_not_match'] },
  { label: 'range', column: ['col_range_uplt', 'col_range_lwlt'] },
  { label: 'sum', column: 'col_sum' },
  { label: 'minimum', column: 'col_min' },
  { label: 'maximum', column: 'col_max' },
  { label: 'likeNot', column: ['col_like', 'col_not_like'] },
  { label: 'mean', column: 'col_avg' },
  { label: 'median', column: 'col_median' },
  { label: 'stdDeviation', column: 'col_stddev' },
  { label: 'mode', column: 'col_mode' },
  { label: 'customRequirement', column: 'col_requirement' },
  { label: 'filter', column: 'col_filter' },
  { label: 'columnCount', column: 'col_count' },
  { label: 'columnNames', column: 'col_names' },
  { label: 'dataType', column: 'col_data_type' },
  { label: 'columnLength', column: 'col_length' }
]

export const staticIgnoreColumns = [
  'column_datatype',
  'column_id',
  'column_length',
  'column_name',
  'column_nullable',
  'column_order_position',
  'column_precision',
  'column_scale',
  'last_updt_ts',
  'object_id',
  'process_id'
]

export const isColumnChecked = (dataChecks, col) =>
  dataChecks?.[col] !== null && dataChecks?.[col] !== 'N' && dataChecks?.[col] !== undefined

export const runForEachStaticColumn = func => (item, dataChecks) => {
  let value = false
  if (Array.isArray(item.column)) {
    for (const col of item.column) {
      value = func(dataChecks, col)
      if (value) break
    }
  } else {
    value = func(dataChecks, item.column)
  }
  return value
}

export const transformValue = (dataChecks, colName) => {
  const value = dataChecks?.[colName]
  if (value !== 0 && !value) return null
  if (R.equals(value, 'Y')) return 'yes'
  if (R.includes(colName, ['col_regex_match', 'col_like'])) { return `${value} (${intl.messages?.['label.match']})` }
  if (R.includes(colName, ['col_regex_not_match', 'col_not_like'])) { return `${value} (${intl.messages?.['label.notMatch']})` }
  if (R.includes(colName, ['col_range_lwlt', 'col_range_uplt'])) {
    return `${dataChecks?.col_range_lwlt} to ${dataChecks?.col_range_uplt}`
  }
  return value
}

export const isChecked = runForEachStaticColumn(isColumnChecked)
const visualValue = runForEachStaticColumn(transformValue)

export const getVisualValue = (...params) => {
  const value = visualValue(...params)
  return value !== 'yes' ? value : null
}

export const useProcessId = () => {
  const match = useRouteMatch()
  return match?.params?.processId
}
