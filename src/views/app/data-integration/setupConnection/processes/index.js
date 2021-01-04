/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import {
  Button,
  Col,
  Row
} from 'reactstrap'
import LayoutBase from '../../../../../components/LayoutContainer'
import IntlMessages from '../../../../../helpers/IntlMessages'
import { SuspenseWithHandler } from '../../../data-quality/setupConnection/Dashboard/SuspenseChart'
import ProcessContent from './ProcessContent'

const Processes = () => {
  const { messages } = useIntl()
  const [seachProcess, setSeachProcess] = useState('')

  return (
    <LayoutBase label='allProcesses' withoutCard>
      <Row className='d-flex justify-content-between align-items-center'>
        <Col xs='auto'>
          <div className='search-sm d-inline-block float-md-left mr-1 mb-1 align-top'>
            <input
              type='text'
              name='keyword'
              id='search'
              placeholder={messages['menu.search']}
              onChange={(e) => setSeachProcess(e.target.value)}
            />
          </div>
        </Col>
        <Col xs='auto'>
          <Link to='/app/data-integration/set-up-connection/create-process'>
            <Button size='md' color='primary'>
              <IntlMessages id='label.create-process' />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <SuspenseWithHandler>
            <ProcessContent processNameFilter={seachProcess} />
          </SuspenseWithHandler>
        </Col>
      </Row>
    </LayoutBase>
  )
}

export default Processes
