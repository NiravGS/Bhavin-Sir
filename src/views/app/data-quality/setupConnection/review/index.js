/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import Button from '../../../../../components/button'
import LayoutBase from '../../../../../components/LayoutContainer'
import IntlMessages from '../../../../../helpers/IntlMessages'
import BasicInfo from './BasicInfo'

const ReviewConnection = ({ connection }) => {
  const history = useHistory()

  const createConfig = () => {
    history.push(`/app/data-quality/set-up-connection/create-configurations/${connection?.process_id}`)
  }

  return (
    <LayoutBase label='review' md={10} lg={6}>
      <Container>
        <BasicInfo processId={connection?.process_id} />
        <Row className='pt-5'>
          <Col xs={12} md={6} className='text-right'>
            <Button size='md' color='primary' onClick={createConfig}>
              <IntlMessages id='control.createConfig' />
            </Button>
          </Col>
          <Col xs={12} md={6}>
            <Button size='md' color='secondary' onClick={() => history.push('/app')}>
              <IntlMessages id='control.cancel' />
            </Button>
          </Col>
        </Row>

      </Container>
    </LayoutBase>

  )
}

ReviewConnection.propTypes = {
  connection: PropTypes.object
}

export default ReviewConnection
