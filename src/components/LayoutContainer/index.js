/* eslint-disable react/jsx-handler-names */
import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  UncontrolledTooltip
} from 'reactstrap'
import IntlMessages from '../../helpers/IntlMessages'

const CardWrapper = ({ children, cardBodyClass, withoutCard }) => {
  return withoutCard ? children : (
    <Card>
      <CardBody className={cardBodyClass}>
        {children}
      </CardBody>
    </Card>
  )
}

CardWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
  cardBodyClass: PropTypes.string,
  withoutCard: PropTypes.bool
}

export const BackButton = () => {
  const history = useHistory()
  return (
    <i
      className='iconsminds-left-1 btn btn-empty p-0 iconStroke'
      style={{ fontSize: '18px' }}
      onClick={history.goBack}
      id='back-link'
    />
  )
}

const LayoutBase = ({ label, children, rowclass, cardBodyClass, withoutCard, ...rest }) => {
  return (
    <Container className='pr-0 pl-0'>
      <Row className={`mt-3 d-flex justify-content-center ${rowclass}`}>
        <Col xs={12} {...rest}>
          <CardWrapper cardBodyClass={cardBodyClass} withoutCard={withoutCard}>
            <div className='d-flex justify-content-between'>
              <CardTitle>
                <IntlMessages id={`label.${label}`} />
              </CardTitle>
              <BackButton />
              <UncontrolledTooltip placement='right' target='back-link'>
                <IntlMessages id='label.lastPage' />
              </UncontrolledTooltip>
            </div>
            {children}
          </CardWrapper>
        </Col>
      </Row>
    </Container>
  )
}

LayoutBase.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
  rowclass: PropTypes.string,
  cardBodyClass: PropTypes.string,
  withoutCard: PropTypes.bool
}

LayoutBase.defaultProps = {
  withoutCard: false
}

export default LayoutBase
