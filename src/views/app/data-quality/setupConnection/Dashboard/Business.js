import PropTypes from 'prop-types'
import React from 'react'
import { injectIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { Button, CardTitle, Col, Row } from 'reactstrap'
import IntlMessages from '../../../../../helpers/IntlMessages'
import { tableSelector } from '../createConfiguration/configurationSelector'
import ChartCard from './ChartCard'
import IssuesAffectingQuality from './charts/IssuesAffectingQuality'
import LastSummary from './charts/LastSummary'
import OutsideRange from './charts/OutsideRange'
import PillarCompleteness from './charts/PillarCompleteness'
import PillarPerformanceMetrics from './charts/PillarPerformanceMetrics'
import PillarsChart from './charts/PillarsChart'
import { SummaryGauge } from './charts/SummaryGauge'
import TrendOfRange from './charts/TrendOfRange'
import { FilterProvider } from './filters/events'
import GoodToBadSection from './GoodToBadSection'
import { useSwrGetConfiguration } from './request'
import { SuspenseChart } from './SuspenseChart'
import SectionDivider from './utils/SectionDivider'

const BusinessDashboard = ({ match }) => {
  const processId = match?.params?.processId
  const history = useHistory()
  const { configuration } = useSwrGetConfiguration(processId)
  const contentTable = tableSelector(configuration?.configData)

  return (
    <>
      <Row className='mb-1'>
        <Col>
          <h3><IntlMessages id='label.lastRunSummary' /></h3>
        </Col>
      </Row>
      <SectionDivider label='lastRunDate' />
      <Row>
        <Col xs={12}>
          <SuspenseChart>
            <SummaryGauge />
          </SuspenseChart>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <SuspenseChart>
            <PillarsChart />
          </SuspenseChart>
        </Col>
      </Row>
      <Row>
        <Col>
          <SuspenseChart>
            <LastSummary />
          </SuspenseChart>
        </Col>
      </Row>
      <GoodToBadSection processId={processId} contentTable={contentTable} />
      <Row className='mt-3'>
        <Col>
          <ChartCard>
            <CardTitle>
              <IntlMessages id='label.issuesAffectingQuality' />
            </CardTitle>
            <IssuesAffectingQuality />
          </ChartCard>
        </Col>
      </Row>
      <SectionDivider label='trendPillarPerformance' />
      <Row>
        <Col>
          <SuspenseChart>
            <PillarCompleteness />
          </SuspenseChart>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <PillarPerformanceMetrics />
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <FilterProvider extraValue={{ contentTable }}>
            <Row>
              <Col xs={12} md={3}>
                <SuspenseChart>
                  <OutsideRange />
                </SuspenseChart>
              </Col>
              <Col xs={12} md={9}>
                <TrendOfRange />
              </Col>
            </Row>
          </FilterProvider>
        </Col>
      </Row>
      <Row className='d-flex justify-content-end mt-4'>
        <Col xs={12} md='auto'>
          <Button color='primary'><IntlMessages id='label.export' /></Button>
        </Col>
        <Col xs={12} md='auto'>
          <Button color='primary'><IntlMessages id='label.share' /></Button>
        </Col>
        <Col xs={12} md='auto'>
          <Button onClick={() => history.goBack()} color='secondary'><IntlMessages id='label.back' /></Button>
        </Col>
      </Row>
    </>

  )
}

BusinessDashboard.propTypes = {
  match: PropTypes.object
}

export default injectIntl(BusinessDashboard)
