import * as R from 'ramda'
import React, { Suspense, useState } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { Col, Row, Spinner } from 'reactstrap'
import Button from '../../../../../../components/button'
import LayoutBase from '../../../../../../components/LayoutContainer'
import { toggle } from '../../../../../../helpers/appUtils'
import IntlMessages from '../../../../../../helpers/IntlMessages'
import { SuspenseChart } from '../../Dashboard/SuspenseChart'
import BasicInfo from '../../review/BasicInfo'
import ManageDropdown from '../dropdownLinks/ManageDropdown'
import AskModalDefault from '../fieldModals/AskModalDefault'
import { useProcessId } from '../helper'
import ManageSchedule from './ManageSchedule'
import ReviewTable from './Table'

const ReviewSettings = () => {
  const history = useHistory()
  const processId = useProcessId()
  const [openedModal, setOpenedModal] = useState(false)

  const submitAlert = () => {
    setOpenedModal(false)
  }

  return (
    <LayoutBase label='process' md={12} lg={12}>
      <Row>
        <Col>
          <Suspense fallback={<Spinner color='primary' />}>
            <BasicInfo processId={processId} />
          </Suspense>
        </Col>
      </Row>

      <Row className='pt-2 mt-3'>
        <Col md={12} lg={8}>
          <SuspenseChart>
            <ReviewTable />
          </SuspenseChart>
        </Col>
        <Col md={12} lg={4}>
          <Row>
            <Col className='d-flex justify-content-between align-items-center'>
              <h6 className='font-weight-bold mb-0'><IntlMessages id='label.schedules' /></h6>
              <Button
                onClick={() => setOpenedModal('add-schedule')}
                outline color='primary'
                size='sm'
              >
                <IntlMessages id='control.createSchedule' />
              </Button>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col>
              <SuspenseChart>
                <ManageSchedule
                  toggleCreate={toggle(setOpenedModal)}
                  openCreate={R.equals(openedModal, 'add-schedule')}
                />
              </SuspenseChart>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className='pt-5 justify-content-center'>
        <Col xs={12} md='auto' className='text-right'>
          <ManageDropdown processId={processId} />
        </Col>
        <Col xs={12} md='auto' className='text-right'>
          <NavLink to={`/app/data-quality/set-up-connection/create-configurations/${processId}`}>
            <Button size='md' color='primary'>
              <IntlMessages id='control.updateConfig' />
            </Button>
          </NavLink>
        </Col>
        <Col xs={12} md='auto'>
          <Button onClick={() => history.goBack()} outline size='md' color='secondary'>
            <IntlMessages id='label.back' />
          </Button>
        </Col>
      </Row>

      <AskModalDefault
        open={R.equals(openedModal, 'ask-alert')}
        onSubmit={submitAlert}
        toggle={toggle(setOpenedModal)}
        submitLabel='control.yes'
        titleLabel='control.askSetAlerts'
      />
    </LayoutBase>

  )
}

export default ReviewSettings
