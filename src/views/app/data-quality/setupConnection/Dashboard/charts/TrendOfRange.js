import React from 'react'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useIntl } from 'react-intl'
import { useRouteMatch } from 'react-router-dom'
import { AreaChart, BarChart } from '../../../../../../components/charts'
import { useProcessId } from '../../createConfiguration/helper'
import ChartCard from '../ChartCard'
import { useFiltersToRequest } from '../filters/events'
import FilterFields from '../filters/FilterFields'
import { useFetchTrendOfRange } from '../request'
import { mountTrendOfRangeWeekly, mountValueByMonth, mountBarChart } from '../selectors'
import { SuspenseChart } from '../SuspenseChart'

const dayMonthInterval = [
  { label: 'weekly', value: 7 },
  { label: 'monthly', value: 30 }
]

const TrendOfRangeWeeklyChart = () => {
  const intl = useIntl()
  const match = useRouteMatch()
  const processId = match?.params?.processId
  const filters = useFiltersToRequest()
  const data = useFetchTrendOfRange(processId, filters)

  const chartData = mountTrendOfRangeWeekly(data, filters.days)

  return (
    <div className='chart-container'>
      <AreaChart
        shadow data={chartData}
        yLabel={intl?.messages['label.countWithinRange']}
        xLabel={intl?.messages['label.interval']}
      />
    </div>

  )
}

const mountTrendOfRangeMonthly = (content, columnKey) => {
  const { data, labels } = mountValueByMonth(content, columnKey)
  return mountBarChart(data, labels)
}

const TrendOfRangeMonthlyChart = () => {
  const intl = useIntl()
  const processId = useProcessId()
  const filters = useFiltersToRequest()
  const data = useFetchTrendOfRange(processId, filters)

  const chartData = mountTrendOfRangeMonthly(data, 'threshold')

  return (
    <div className='chart-container'>
      <BarChart
        shadow data={chartData} plugins={[ChartDataLabels]}
        yLabel={intl?.messages['label.countWithinRange']}
        xLabel={intl?.messages['label.interval']}
      />
    </div>

  )
}

const TrendOfRange = () => {
  const { days } = useFiltersToRequest()
  return (
    <ChartCard>
      <FilterFields
        initialInterval={dayMonthInterval[0]}
        intervals={dayMonthInterval}
        title='trendOfRange'
      />
      <SuspenseChart>
        {days === 7 ? <TrendOfRangeWeeklyChart /> : <TrendOfRangeMonthlyChart />}

      </SuspenseChart>
    </ChartCard>
  )
}

export default TrendOfRange
