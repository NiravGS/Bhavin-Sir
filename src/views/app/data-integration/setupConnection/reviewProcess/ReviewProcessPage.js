/* eslint-disable react/prop-types */
import classnames from 'classnames'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {
  Alert, Badge, Card, CardBody, CardHeader, Col,

  Label, Nav, NavItem,
  NavLink, Row,
  TabContent, TabPane
} from 'reactstrap'
import Button from '../../../../../components/button'
import { ColItem } from '../../../../../components/ColItem'
import { BackButton } from '../../../../../components/LayoutContainer'
import { ReactTable } from '../../../../../components/tableCard'
import { toggle } from '../../../../../helpers/appUtils'
import IntlMessages from '../../../../../helpers/IntlMessages'
import { useProcessId } from '../../../data-quality/setupConnection/createConfiguration/helper'
import { TableItem } from '../../../data-quality/setupConnection/createConfiguration/review/Table'
import { LoadingSpinner } from '../../../data-quality/setupConnection/Dashboard/SuspenseChart'
import { useAsyncRunProcess, useProcessExecutions, useSwrFetchProcess } from '../editProcess/request'
import { ActivateStatusProcess, AskDelete } from '../processes/ProcessActionButtons'
import { useSelectorProcessBasicInfo } from '../processEvents'
import { useSwrCreateConnection } from './request'
import ReviewProcessBase, { TitleRow } from './ReviewProcessBase'

const columns = [
  {
    Header: 'ID',
    accessor: 'runId',
    Cell: TableItem
  },
  {
    Header: 'Status',
    accessor: 'execStatus',
    Cell: TableItem
  },
  {
    Header: 'Log File Path',
    accessor: 'logFilePath',
    Cell: TableItem
  },
  {
    Header: 'Action',
    accessor: 'ingestionType',
    Cell: () => { return <div>action</div> }
  },
  {
    Header: 'Last exec timestamp',
    accessor: 'execStartTs',
    Cell: ({ value }) => <TableItem value={moment(value).local().format('YYYY-MM-DD HH:mm:ss')} />
  }

]

const Executions = () => {
  const data = useSwrCreateConnection()
  return (
    <Card className='mt-3'>
      <CardBody>
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={data.length < 10 ? 5 : 10}
          filterable
          showPageJump
          showPageSizeOptions
          striped
        />

      </CardBody>
    </Card>
  )
}

const Header = () => {
  const { processName, active } = useSelectorProcessBasicInfo()
  const { messages } = useIntl()

  const { color, label } = active
    ? { color: 'success', label: 'activated' }
    : { color: 'danger', label: 'deactivated' }
  return (
    <>
      <h2>{messages['label.view-process']}</h2>
      <span className='d-flex'>
        <h3 className='mb-0 font-italic'>{processName}</h3>
        <Badge className='ml-2' pill color={color} size='lg'>
          <Label className='mb-0'>
            {messages[`label.${label}`]}
          </Label>
        </Badge>
      </span>
    </>
  )
}

const ViewProcessPage = () => {
  const { loading } = useSwrFetchProcess()
  const processId = useProcessId()
  const dispatch = useDispatch()
  const history = useHistory()
  const { messages } = useIntl()
  const [openAskDelete, setOpenAskDelete] = useState()
  const { processName, processDescription } = useSelectorProcessBasicInfo()
  const [activeTab, setActiveTab] = useState('details')
  const executions = useProcessExecutions()
  const [runProcess] = useAsyncRunProcess()

  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  useEffect(() => {
    return () => {
      dispatch({ type: 'cleanProcessContent' })
    }
  }, [])

  const redirectToViewAll = () => {
    history.push('/app/data-integration/set-up-connection/view-all-processes')
  }

  if (!processName && !loading) {
    return (
      <Alert color='secondary' className='d-flex justify-content-between flex-column'>
        <h3><IntlMessages id='label.processNotFound' /></h3>
        <Link
          className='btn btn-link text-left pl-0'
          to='/app/data-integration/set-up-connection/view-all-processes'
        >
          <IntlMessages id='label.viewAllProcess' />
        </Link>
      </Alert>
    )
  }

  return loading ? <LoadingSpinner />
    : (
      <>
        <Row className='d-flex justify-content-between'>
          <Col>
            <Header />
          </Col>
          <Col xs={12} md='auto'>
            <Row className='no-gutters'>

              <Col xs={12} md='auto' className='mt-2 mt-sm-0 pl-md-1'>
                <Button
                  loading={executions?.[processId]?.isRunning}
                  onClick={() => runProcess(processId)}
                  icon='simple-icon-settings' size='sm' color='primary'
                >
                  <IntlMessages id='label.run' />
                </Button>
              </Col>
              <Col xs={12} md='auto' className='mt-2 mt-sm-0 pl-md-1'>
                <Link to='/app/data-integration/set-up-connection/view-all-processes'>
                  <Button icon='simple-icon-eye' size='sm' color='primary'>
                    <IntlMessages id='label.viewAll' />
                  </Button>
                </Link>
              </Col>
              <Col xs={12} md='auto' className='mt-2 mt-sm-0 pl-md-1'>
                <ActivateStatusProcess />
              </Col>
            </Row>
          </Col>
          <Col xs='auto'>
            <BackButton />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === 'details' })}
                  onClick={() => { toggleTab('details') }}
                >
                  <Label>{messages['label.details']}</Label>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === 'history' })}
                  onClick={() => { toggleTab('history') }}
                >
                  <Label>{messages['label.historyExecution']}</Label>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='details'>
                <Row>
                  <Col sm='12'>
                    <Row className='mt-3 mb-3'>
                      <Col>
                        <Card>
                          <CardHeader>
                            <TitleRow label='label.process' />
                          </CardHeader>
                          <CardBody>
                            <Row>
                              <ColItem label='process-name' content={processName} />
                              <ColItem label='processDescription' content={processDescription} />
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <ReviewProcessBase />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='history'>
                <Row>
                  <Col>
                    <Executions />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Col>
        </Row>

        <AskDelete
          onFinishDelete={redirectToViewAll}
          processId={processId}
          open={openAskDelete}
          toggle={toggle(setOpenAskDelete)}
          processName={processName}
        />
      </>
    )
}

export default ViewProcessPage
