/* eslint-disable camelcase */
import ChartDataLabels from 'chartjs-plugin-datalabels'
import * as R from 'ramda'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRouteMatch } from 'react-router-dom'
import { Badge, Card, CardBody, CardTitle, Col, Label, Row } from 'reactstrap'
import { BarChart } from '../../../../../../components/charts'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useFetchDatacheckByDays } from '../request'
import { getDataAndLabel, mountBarChart } from '../selectors'

export const mountBarChartData = (content) => {
  const columnsToRenderBar = [
    'total_uniques',
    'total_col_like',
    'total_col_not_like',
    'total_col_range',
    'total_col_regex_match',
    'total_col_regex_not_match',
    'total_not_null',
    'total_nulls',
    'total_match_date_format'
  ]
  const { data, labels } = getDataAndLabel(columnsToRenderBar, content)
  return mountBarChart(data, labels)
}

const DataChecksChart = () => {
  const intl = useIntl()
  const match = useRouteMatch()
  const processId = match?.params?.processId
  const dataCheckSummary = useFetchDatacheckByDays(processId)
  const totalCount = dataCheckSummary[0]?.total_count || 0
  const barChartData = mountBarChartData(R.last(dataCheckSummary))

  return (
    <Card>
      <CardBody>
        <Row className='mt-3 d-flex justify-content-center'>
          <Col xs={12}>

            <div className='d-flex justify-content-between'>
              <CardTitle>
                <IntlMessages id='label.technical-dashboards' />
              </CardTitle>
              <CardTitle>
                <Badge color='outline-primary' pill size='sm'>
                  <Label className='mb-0'>{`${intl.messages['label.count']}: ${Number(totalCount).toLocaleString()}`}</Label>
                </Badge>
              </CardTitle>

            </div>
            <div className='chart-container'>
              <BarChart
                shadow data={barChartData} plugins={[ChartDataLabels]}
                yLabel={intl.messages['label.counts']}
                xLabel={intl.messages['label.dataChecks']}
              />
            </div>

          </Col>

        </Row>
      </CardBody>
    </Card>

  )
}

export default DataChecksChart
