import PropTypes from 'prop-types'
import React from 'react'
import { Col, Row } from 'reactstrap'
import ChartCard from './ChartCard'
import GoodToBad from './charts/GoodToBad'
import LastRunStats from './charts/LastRunStats'
import FilterFields from './filters/FilterFields'
import { SuspenseChart } from './SuspenseChart'
import { FilterProvider } from './filters/events'

const GoodToBadSection = ({ contentTable, processId }) => {
  return (
    <FilterProvider extraValue={{ contentTable }}>
      <Row>
        <Col xs={12} md={5} className='h-100'>
          <ChartCard>
            <SuspenseChart>
              <LastRunStats processId={processId} />
            </SuspenseChart>
          </ChartCard>
        </Col>
        <Col xs={12} md={7}>
          <ChartCard>

            <FilterFields
              contentTable={contentTable}
              title='goodToBad'
              colsProp={{ title: { md: 12 }, column: { md: 5 }, table: { md: 5 }, interval: { md: 2 } }}
            />
            <SuspenseChart>
              <GoodToBad />
            </SuspenseChart>
          </ChartCard>
        </Col>
      </Row>
    </FilterProvider>
  )
}

GoodToBadSection.propTypes = {
  contentTable: PropTypes.array,
  processId: PropTypes.string
}

export default GoodToBadSection
