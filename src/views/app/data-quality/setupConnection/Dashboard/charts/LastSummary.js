import PropTypes from 'prop-types'
import React from 'react'
import { injectIntl } from 'react-intl'
import { useRouteMatch } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import RadialProgressCard from '../../../../../../components/cards/RadialProgressCard'
import CollapsableItems from '../CollapsableItems'
import { useFetchLastSummary } from '../request'
import { mountLastSummary } from '../selectors'
import { SuspenseChart } from '../SuspenseChart'
import IntlMessages from '../../../../../../helpers/IntlMessages'

// eslint-disable-next-line react/prop-types
const renderRadialProcessCard = ({ label, value }, index) => {
  const indexKey = `${index}_summary`
  return (
    <Col xs={12} sm={6} md={4} lg={3} className='mt-3' key={indexKey}>
      <RadialProgressCard title={label} percent={value} isSortable />
    </Col>)
}

const LastSummary = ({ intl }) => {
  const match = useRouteMatch()
  const processId = match?.params?.processId
  const data = useFetchLastSummary(processId)
  const chartData = mountLastSummary(data?.[0], intl?.messages)
  return (
    <>
      <Row>
        <Col className='mt-4'>
          <h5><IntlMessages id='label.datacheckSnapshot' /></h5>
        </Col>
      </Row>
      <Row>
        <SuspenseChart>
          <CollapsableItems chartData={chartData} renderItem={renderRadialProcessCard} />
        </SuspenseChart>
      </Row>
    </>
  )
}

LastSummary.propTypes = {
  intl: PropTypes.object
}

export default injectIntl(LastSummary)
