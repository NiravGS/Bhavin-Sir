import React from 'react'
import { Col, Label } from 'reactstrap'
import IntlMessages from '../helpers/IntlMessages'

// eslint-disable-next-line react/prop-types
export const ColItem = ({ label, content }) => (
  <Col xs='auto' className='d-flex flex-column '>
    <Label className='font-weight-bold mb-0'>
      <IntlMessages id={`label.${label}`} />
    </Label>
    <Label className='font-italic'>{content}</Label>
  </Col>
)
