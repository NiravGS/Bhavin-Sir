import React from 'react'
import { injectIntl } from 'react-intl'
import { PieChart } from '../../../../../../components/charts'
import { useProcessId } from '../../createConfiguration/helper'
import { useFiltersToRequest } from '../filters/events'
import { useFetchGoodToBad } from '../request'
import { mountPieChartData } from '../selectors'
import HandleNoChartData from '../utils/HandleNoChartData'

const GoodToBad = () => {
  const { days, objectId, columnId } = useFiltersToRequest()
  const processId = useProcessId()
  const data = useFetchGoodToBad(
    processId,
    { days, objectId, columnId }
  )
  const chartData = data?.[0]
  return (
    <div className='mt-4 d-flex justify-content-center align-items-center'>
      <div style={{ height: '270px', width: '270px' }} className='d-flex justify-content-center align-items-center'>
        <HandleNoChartData data={chartData}>
          <PieChart
            shadow
            data={mountPieChartData(chartData)}
            isPercentage
          />
        </HandleNoChartData>
      </div>
    </div>

  )
}

GoodToBad.propTypes = {}

export default injectIntl(GoodToBad)
