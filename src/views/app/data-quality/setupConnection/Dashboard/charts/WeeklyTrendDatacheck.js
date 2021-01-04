/* eslint-disable react/prop-types */
import moment from 'moment'
import * as R from 'ramda'
import React from 'react'
import { injectIntl, useIntl } from 'react-intl'
import { Card, CardBody, Col, Row } from 'reactstrap'
import CustomSmallLine from '../../../../../../components/charts/CustomSmallLine'
import { ThemeColors } from '../../../../../../helpers/ThemeColors'
import { useProcessId } from '../../createConfiguration/helper'
import CollapsableItems from '../CollapsableItems'
import { useFiltersToRequest } from '../filters/events'
import { useFetchWeeklyTrendDatacheck } from '../request'
import { mountWeek } from '../selectors'

const colors = ThemeColors()

const weekContent = mountWeek()

const translatedWeek = R.keys(weekContent)

const chartBase = data => ({
  labels: translatedWeek,
  datasets: [
    {
      label: 'Total Orders',
      borderColor: colors.themeColor1,
      pointBorderColor: colors.themeColor1,
      pointHoverBackgroundColor: colors.themeColor1,
      pointHoverBorderColor: colors.themeColor1,
      pointRadius: 2,
      pointBorderWidth: 3,
      pointHoverRadius: 2,
      fill: false,
      borderWidth: 2,
      data,
      datalabels: {
        align: 'end',
        anchor: 'end'
      }
    }
  ]
})

const chartColumns = [
  'total_uniques',
  'total_col_like',
  'total_col_regex_match',
  'total_col_range',
  'total_match_date_format',
  'not_null_perc',
  'total_col_regex_not_match',
  'col_not_like_perc',
  'col_null_perc',
  'total_not_match_date_format',
  'total_not_in_range',
  'total_not_uniques'

]

const mountWeeklyTrend = (wholeContent, columnName, intl) => {
  wholeContent.forEach(item => {
    const dayOfWeek = moment(item.dte).local().format('DD-MMM')
    weekContent[dayOfWeek] = item[columnName] || 0
  })
  return {
    label: intl.messages[`chart.${columnName}`],
    value: R.values(weekContent)
  }
}

const renderRadialProcessCard = ({ label, value }, index) => {
  const indexKey = `${index}_summary`
  return (
    <Col xs={12} sm={6} md={4} lg={3} className='mt-3' key={indexKey}>
      <Card className='shadow'>
        <CardBody>
          <div className='dashboard-small-chart'>
            <CustomSmallLine label={label} data={chartBase(value)} />

          </div>
        </CardBody>
      </Card>

    </Col>)
}

const WeeklyTrendDatacheck = () => {
  const { columnId, objectId } = useFiltersToRequest()
  const intl = useIntl()
  const processId = useProcessId()
  const data = useFetchWeeklyTrendDatacheck(processId, { columnId, objectId })
  const chartContent = chartColumns.map((column) => mountWeeklyTrend(data, column, intl))

  return (
    <Row>
      <CollapsableItems chartData={chartContent} renderItem={renderRadialProcessCard} />
    </Row>
  )
}

export default injectIntl(WeeklyTrendDatacheck)
