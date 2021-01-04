import PropTypes from 'prop-types'
import React from 'react'
import { injectIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { Button, Col, Row } from 'reactstrap'
import IntlMessages from '../../../../../helpers/IntlMessages'
import { tableSelector } from '../createConfiguration/configurationSelector'
import ChartCard from './ChartCard'
import DatacheckChart from './charts/DatacheckChart'
import LastSummary from './charts/LastSummary'
import MonthlyTrend from './charts/MonthlyTrend'
import { SummaryGauge } from './charts/SummaryGauge'
import TrendByDatachecks from './charts/TrendByDatachecks'
import WeeklyTrendDatacheck from './charts/WeeklyTrendDatacheck'
import FilterFields from './filters/FilterFields'
import GoodToBadSection from './GoodToBadSection'
import { useSwrGetConfiguration } from './request'
import { SuspenseChart } from './SuspenseChart'
import SectionDivider from './utils/SectionDivider'
import { FilterProvider } from './filters/events'

const Dashboard = ({ match }) => {
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
      <Row className='mt-3 no-gutters'>
        <Col>
          <SuspenseChart>
            <DatacheckChart />
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
      <SectionDivider label='dataQualityTrends' />
      <Row>
        <Col>
          <ChartCard>
            <FilterProvider extraValue={{ contentTable }}>
              <FilterFields title='weeklyDataChecks' contentTable={contentTable} dontShowInterval />
              <SuspenseChart>
                <WeeklyTrendDatacheck />
              </SuspenseChart>
            </FilterProvider>
          </ChartCard>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <ChartCard>
            <FilterProvider extraValue={{ contentTable }}>
              <FilterFields isMonthly title='trendDatacheck' contentTable={contentTable} />
              <SuspenseChart>
                <TrendByDatachecks />
              </SuspenseChart>
            </FilterProvider>
          </ChartCard>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <SuspenseChart>
            <MonthlyTrend />
          </SuspenseChart>
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

Dashboard.propTypes = {
  match: PropTypes.object
}

export default injectIntl(Dashboard)
