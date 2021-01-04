import ChartDataLabels from 'chartjs-plugin-datalabels'
import React, { useState } from 'react'
import { injectIntl } from 'react-intl'
import Select from 'react-select'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { BarChart } from '../../../../../../components/charts'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { getIntl } from '../../../../../../IntlProvider'
import IntervalDropdown from '../ChartDropdown'
import { useFetchPillarCompleteness } from '../request'
import { mountValueByMonth, mountBarChart } from '../selectors'
import { useProcessId } from '../../createConfiguration/helper'

const intlMessages = getIntl().messages

const dataChecks = [
  'pillar_accuracy_perc',
  'pillar_completeness_perc',
  'pillar_conformity_perc',
  'pillar_consistency_perc',
  'pillar_integrity_perc',
  'pillar_uniqueness_perc'
]

const options = dataChecks.map(item => ({
  label: intlMessages[`chart.${item}`],
  value: item
}))

const timeIntervals = [
  { label: 'monthly', value: 30 }
]

const mountPillarCompleteness = (content, columnKey) => {
  const { data, labels } = mountValueByMonth(content, columnKey)
  return mountBarChart(data, labels)
}

const PillarCompleteness = () => {
  const processId = useProcessId()
  const dataCheckSummary = useFetchPillarCompleteness(processId)
  const [selectedOption, setSelectedOption] = useState(options[0])
  const [interval, setInterval] = useState(timeIntervals[0])
  const barChartData = mountPillarCompleteness(dataCheckSummary, selectedOption?.value)

  return (
    <Card>
      <CardBody>
        <Container className='pr-0 pl-0'>
          <Row className='mt-3 d-flex justify-content-between'>
            <Col xs={12} md={6}>
              <CardTitle>
                <IntlMessages id='label.completeness' />
              </CardTitle>
            </Col>
            <Col xs={12} md={4}>
              <Select
                options={options}
                classNamePrefix='react-select'
                className='react-select'
                value={selectedOption}
                onChange={setSelectedOption}
              />
            </Col>
            <Col xs={12} md={2}>
              <IntervalDropdown
                selected={interval}
                data={timeIntervals}
                onChangeInterval={setInterval}
              />
            </Col>
            <Col xs={12}>
              <div className='chart-container'>
                <BarChart
                  shadow data={barChartData} plugins={[ChartDataLabels]} isPercentage
                  yLabel={intlMessages['label.pillarPercentage']}
                  xLabel={intlMessages['label.interval']}
                />
              </div>

            </Col>
          </Row>
        </Container>
      </CardBody>
    </Card>

  )
}

export default injectIntl(PillarCompleteness)
