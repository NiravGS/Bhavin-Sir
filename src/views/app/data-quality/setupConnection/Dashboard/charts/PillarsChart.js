import ChartDataLabels from 'chartjs-plugin-datalabels'
import PropTypes from 'prop-types'
import React from 'react'
import { injectIntl } from 'react-intl'
import { useRouteMatch } from 'react-router-dom'
import { Badge, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { BarChart } from '../../../../../../components/charts'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useFetchPillars } from '../request'
import { mountPillarChart } from '../selectors'

const PillarsChart = ({ intl }) => {
  const match = useRouteMatch()
  const processId = match?.params?.processId
  const dataCheckSummary = useFetchPillars(processId)
  const barChartData = mountPillarChart(dataCheckSummary[0])

  return (
    <Card>
      <CardBody>
        <Container className='pr-0 pl-0'>
          <Row className='mt-3 d-flex justify-content-center'>
            <Col xs={12}>

              <div className='d-flex justify-content-between'>
                <CardTitle>
                  <IntlMessages id='label.dataQualityPillars' />
                </CardTitle>
                <CardTitle>
                  <Badge color='outline-primary' pill size='sm'>
                    <IntlMessages id='label.daily' />
                  </Badge>
                </CardTitle>

              </div>
              <div className='chart-container'>
                <BarChart
                  shadow data={barChartData} plugins={[ChartDataLabels]} isPercentage
                  yLabel={intl.messages['label.dataCheckCountsPercent']}
                  xLabel={intl.messages['label.pillars']}
                />
              </div>

            </Col>

          </Row>
        </Container>
      </CardBody>
    </Card>

  )
}

PillarsChart.propTypes = {
  intl: PropTypes.object
}

export default injectIntl(PillarsChart)
