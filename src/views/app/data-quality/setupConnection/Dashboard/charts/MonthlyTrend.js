import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { injectIntl } from 'react-intl'
import Select from 'react-select'
import { CardTitle, Col, Row } from 'reactstrap'
import { AreaChart } from '../../../../../../components/charts'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useProcessId } from '../../createConfiguration/helper'
import ChartCard from '../ChartCard'
import { useFetchMonthlyTrend } from '../request'
import { mountMonthlyTrendData } from '../selectors'

const dataChecks = [
  'col_unique_perc',
  'col_regex_match_perc',
  'col_range_perc',
  'match_date_format_perc',
  'not_null_perc',
  'col_regex_notmatch_perc',
  'col_not_like_perc',
  'col_null_perc',
  'col_like_perc'
]

const mountDataChecks = (intl) => {
  return dataChecks.map(item => ({
    label: intl?.messages[`chart.${item}`],
    value: item
  }))
}

const MonthlyTrend = ({ intl }) => {
  const processId = useProcessId()
  const dataChecksList = mountDataChecks(intl)
  const data = useFetchMonthlyTrend(processId)
  const [dataCheck, setDataCheck] = useState(dataChecksList[0])
  const chartData = mountMonthlyTrendData(data, dataCheck?.value)
  return (
    <ChartCard>
      <Row className='mb-2'>
        <Col>
          <CardTitle>
            <IntlMessages id='label.monthlyTrend' />
          </CardTitle>
        </Col>
        <Col xs={12} md={3}>
          <Select
            options={dataChecksList}
            classNamePrefix='react-select'
            className='react-select'
            placeholder='Table'
            value={dataCheck}
            onChange={setDataCheck}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='chart-container'>
            <AreaChart
              shadow data={chartData}
              yLabel={intl?.messages['label.percentageOfCounts']}
              xLabel={intl?.messages['label.months']}
            />
          </div>
        </Col>
      </Row>

    </ChartCard>

  )
}

MonthlyTrend.propTypes = {
  intl: PropTypes.object
}

export default injectIntl(MonthlyTrend)
