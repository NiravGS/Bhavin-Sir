import React from 'react'
import { useIntl } from 'react-intl'
import { BarChart } from '../../../../../../components/charts'
import { useProcessId } from '../../createConfiguration/helper'
import { useFiltersToRequest } from '../filters/events'
import { useFetchTrendDatacheck } from '../request'
import { mountTrendChartData } from '../selectors'

const TrendByDatachecks = () => {
  const intl = useIntl()
  const processId = useProcessId()
  const { objectId, columnId, monthName } = useFiltersToRequest()
  const data = useFetchTrendDatacheck(processId, { objectId, columnId, monthName })
  const chartData = mountTrendChartData(data?.[0])
  return (
    <div className='chart-container'>
      <BarChart
        shadow data={chartData} type='horizontalBar' isPercentage
        yLabel={intl.messages['label.dataChecks']}
        xLabel={intl.messages['label.percentageOfCounts']}
      />
    </div>

  )
}

export default TrendByDatachecks
