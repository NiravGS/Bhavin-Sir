import PropTypes from 'prop-types'
import * as R from 'ramda'
import React from 'react'
import { injectIntl } from 'react-intl'
import { CardTitle, Col, Row } from 'reactstrap'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import IntervalDropdown from '../ChartDropdown'
import ColumnFilter from './ColumnFilter'
import { useFilterDispatch, useFilterState } from './events'
import MonthFilter, { getMonths } from './MonthFilter'
import TableFilter from './TableFilter'

const safeObject = R.defaultTo({})

const defaultTimeIntervals = [
  { label: 'daily', value: 1 },
  { label: 'weekly', value: 7 },
  { label: 'monthly', value: 30 },
  { label: '60Days', value: 60 }
]

const FilterFields = ({
  intervals, isMonthly,
  dontShowInterval,
  title, colsProp = {}
}) => {
  const state = useFilterState()
  const dispatch = useFilterDispatch()
  const timeIntervals = intervals || defaultTimeIntervals
  const { currentMonthIndex, months } = getMonths()
  const {
    selectedMonth, selectedInterval
  } = state

  return (
    <Row>
      <Col sm={12} md={4} {...safeObject(colsProp.title)}>
        {
          title && (
            <CardTitle>
              <IntlMessages id={`label.${title}`} />
            </CardTitle>
          )
        }
      </Col>
      <Col sm={12} md={3} {...safeObject(colsProp.table)}>
        <TableFilter />
      </Col>
      <Col sm={12} md={3} {...safeObject(colsProp.column)}>
        <ColumnFilter />
      </Col>

      {
        isMonthly ? (
          <Col sm={12} md={2} {...safeObject(colsProp.interval)}>
            <MonthFilter
              selected={R.defaultTo(months[currentMonthIndex], selectedMonth)}
              onChange={(val) => dispatch({ type: 'setSelectedMonth', payload: val })}
            />
          </Col>)
          : (
            !dontShowInterval && (
              <Col xs={2} {...safeObject(colsProp.interval)}>
                <IntervalDropdown
                  selected={selectedInterval}
                  data={timeIntervals}
                  onChangeInterval={(value) => dispatch({ type: 'setInterval', payload: value })}
                />
              </Col>)
          )
      }

    </Row>

  )
}

FilterFields.propTypes = {
  contentTable: PropTypes.array,
  children: PropTypes.element,
  title: PropTypes.string,
  isMonthly: PropTypes.bool,
  dontShowInterval: PropTypes.bool,
  intervals: PropTypes.array,
  initialInterval: PropTypes.object,
  colsProp: PropTypes.object
}

export default injectIntl(FilterFields)
