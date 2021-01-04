/* eslint-disable react/prop-types */
import React from 'react'
import IntlMessages from '../../../../../helpers/IntlMessages'
import { Label, Col, Row } from 'reactstrap'

export const ContentRow = ({ label, content }) => (
  <Row className='border-color-light'>
    <Col xs={12} md={3} className='font-weight-bold border-right border-bottom d-flex align-items-center'>
      <Label className='font-weight-bold mb-0'><IntlMessages id={`label.${label}`} /></Label>
    </Col>
    <Col xs={12} md={3} className='border-left border-bottom d-flex align-items-center'>
      <Label className='mb-0'>{content}</Label>
    </Col>
  </Row>
)
