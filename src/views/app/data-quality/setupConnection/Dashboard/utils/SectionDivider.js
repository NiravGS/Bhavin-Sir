import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import IntlMessages from '../../../../../../helpers/IntlMessages'

const SectionDivider = ({ label }) => {
  return (
    <Row className='mb-2 mt-5'>
      <Col>
        <h5 className='mb-1 font-italic'><IntlMessages id={`label.${label}`} /></h5>
      </Col>
    </Row>
  )
}

SectionDivider.propTypes = {
  label: PropTypes.string
}

export default SectionDivider
