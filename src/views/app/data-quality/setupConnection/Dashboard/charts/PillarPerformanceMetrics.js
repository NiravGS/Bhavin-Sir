import Annotation from 'chartjs-plugin-annotation'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { Badge, Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row } from 'reactstrap'
import { LineChart } from '../../../../../../components/charts'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { useProcessId } from '../../createConfiguration/helper'
import MonthFilter, { getMonths } from '../filters/MonthFilter'
import { useFetchPillarPerfMetric } from '../request'
import { mountPerfMetrics } from '../selectors'
import { SuspenseChart } from '../SuspenseChart'

const PillarPerformanceMetricsChart = ({ monthOne, monthTwo }) => {
  const intl = useIntl()
  const processId = useProcessId()
  const dataCheckSummary = useFetchPillarPerfMetric(processId, monthOne?.value, monthTwo?.value)
  const { lineChartData, complementOptions } = mountPerfMetrics(dataCheckSummary, monthOne?.value, monthTwo?.value)
  console.log('one =>', monthOne)
  console.log('one =>', monthTwo)
  return (
    <div className='chart-container'>
      <LineChart
        shadow data={lineChartData} plugins={[Annotation]}
        extraOptions={complementOptions} isPercentage
        yLabel={intl?.messages['label.successOrFailurePerc']}
        xLabel={intl?.messages['label.pillars']}
      />
    </div>

  )
}

PillarPerformanceMetricsChart.propTypes = {
  monthOne: PropTypes.object,
  monthTwo: PropTypes.object
}

const PillarPerformanceMetrics = () => {
  const { currentMonthIndex, months } = getMonths()
  const selectNextMonth = nextIndex => { 
    if(nextIndex === 11) {
      nextIndex = -1;
    }
    return months[nextIndex + 1] 
  }

  const [selectedMonthOne, setSelectedFirstMonth] = useState(months[currentMonthIndex])
  const [selectedMonthTwo, setSelectedSecondMonth] = useState(selectNextMonth(currentMonthIndex ))
  
  return (
    <Card>
      <CardBody>
        <Container className='pr-0 pl-0'>
          <Row className='mt-3 d-flex'>
            <Col xs={12} md={4}>
              <CardTitle className='mb-0'>
                <IntlMessages id='label.perfMetricsOfPillars' />
              </CardTitle>
              <CardSubtitle className='mb-3 text-muted'>
                <IntlMessages id='label.trendOfRangeDescription' />
              </CardSubtitle>
            </Col>
            <Col xs={5} md={3}>
              <MonthFilter
                monthDisabled='December'
                selected={selectedMonthOne} onChange={(month) => {
                  setSelectedFirstMonth(month)
                  if (selectedMonthTwo.index <= month.index) setSelectedSecondMonth(selectNextMonth(month.index))
                }}
              />
            </Col>
            <Col xs='auto' className='d-flex align-items-center'>
              <Badge color='outline-primary' pill size='md'>
                <IntlMessages id='label.with' />
              </Badge>
            </Col>
            <Col xs={5} md={3}>
              <MonthFilter disabledUntil={selectedMonthOne.index} selected={selectedMonthTwo} onChange={setSelectedSecondMonth} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <SuspenseChart>
                { selectedMonthOne && selectedMonthTwo && <PillarPerformanceMetricsChart monthOne={selectedMonthOne} monthTwo={selectedMonthTwo} /> }
              </SuspenseChart>
            </Col>
          </Row>
        </Container>
      </CardBody>
    </Card>

  )
}

export default PillarPerformanceMetrics
