import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Col, Collapse, Container, Row } from 'reactstrap'
import IntlMessages from '../../../../../helpers/IntlMessages'
import { toggle } from '../../../../../helpers/appUtils'

const CollapsableItems = ({ chartData, renderItem }) => {
  const [showAllSummary, setCollapse] = useState(false)
  const chartVisible = chartData.slice(0, 4)
  const chartCollapsable = chartData.slice(4, chartData.length)

  const showLabel = !showAllSummary ? 'showAll' : 'hide'
  return (
    <>
      {chartVisible.map(renderItem)}
      <Collapse className='w-100' isOpen={showAllSummary}>
        <Container>
          <Row>
            {chartCollapsable.map(renderItem)}
          </Row>
        </Container>
      </Collapse>
      <Col xs={12} className='d-flex justify-content-end'>
        <p onClick={toggle(setCollapse)} className='btn btn-link btn-empty'>
          <IntlMessages id={`label.${showLabel}`} />
        </p>

      </Col>

    </>
  )
}

CollapsableItems.propTypes = {
  chartData: PropTypes.array,
  renderItem: PropTypes.func
}

export default CollapsableItems
