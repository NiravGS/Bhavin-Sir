import PropTypes from 'prop-types'
import React from 'react'
import { injectIntl } from 'react-intl'
import { Card, CardBody } from 'reactstrap'

const ChartCard = ({ children }) => {
  return (
    <Card className='d-flex justify-content-center'>
      <CardBody>
        {children}
      </CardBody>
    </Card>
  )
}

ChartCard.propTypes = {
  children: PropTypes.any
}

export default injectIntl(ChartCard)
