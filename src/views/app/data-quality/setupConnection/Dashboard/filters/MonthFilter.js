import moment from 'moment'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import React from 'react'
import Select from 'react-select'
import { getIntl } from '../../../../../../IntlProvider'

const intlMessages = getIntl()?.messages

const monthList = [
  { label: 'january', value: 'January' },
  { label: 'february', value: 'February' },
  { label: 'march', value: 'March' },
  { label: 'april', value: 'April' },
  { label: 'may', value: 'May' },
  { label: 'june', value: 'June' },
  { label: 'july', value: 'July' },
  { label: 'august', value: 'August' },
  { label: 'september', value: 'September' },
  { label: 'october', value: 'October' },
  { label: 'november', value: 'November' },
  { label: 'december', value: 'December' }
]

const getAllMonths = (disabledUntil, monthDisabled) => R.addIndex(R.map)((item, index) => {
  return {
    label: intlMessages?.[`label.${item.label}`],
    value: item.value,
    isDisabled: (disabledUntil !== undefined && index <= disabledUntil) || monthDisabled === item.value,
    index
  }
}, monthList)

const allEnabledMonths = getAllMonths()

export const getMonths = () => {
  const currentMonthIndex = R.findIndex(R.propEq('value', moment().format('MMMM')), allEnabledMonths)
  return { currentMonthIndex, months: allEnabledMonths }
}

const MonthFilter = ({ selected, onChange, disabledUntil, monthDisabled, ...rest }) => {
  const months = getAllMonths(disabledUntil, monthDisabled)
  return (
    <Select
      id='month-select'
      options={months}
      classNamePrefix='react-select'
      className='react-select'
      placeholder='Month'
      value={selected}
      onChange={onChange}
      {...rest}
    />
  )
}

MonthFilter.propTypes = {
  selected: PropTypes.object,
  onChange: PropTypes.func,
  disabledUntil: PropTypes.number,
  monthDisabled: PropTypes.string

}

export default MonthFilter
