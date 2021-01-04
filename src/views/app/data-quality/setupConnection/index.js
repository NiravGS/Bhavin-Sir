import PropTypes from 'prop-types'
import React, { lazy, Suspense } from 'react'
import { NavLink, Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { Button, Row, Container } from 'reactstrap'
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap'
import Breadcrumb from '../../../../containers/navs/Breadcrumb'
import IntlMessages from '../../../../helpers/IntlMessages'
import CreateConfiguration from './createConfiguration'
import ExistingConnection from './existingConnection'
import NewConnection from './newConnection'
import BusinessDashboard from './Dashboard/Business'
import ReviewSettings from './createConfiguration/review'

const Dashboard = lazy(() => import('./Dashboard'))

const Start = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs='12'>
          <NavLink to={`${match.url}/new`}>
            <Button outline color='primary' className='mb-2'>
              <IntlMessages id='menu.connection-new' />
            </Button>
          </NavLink>

        </Colxx>
      </Row>
      <Row>
        <Colxx xxs='12' className='mb-4'>
          <NavLink to={`${match.url}/existing`}>
            <Button outline color='secondary' className='mb-2'>
              <IntlMessages id='menu.connection-existing' />
            </Button>
          </NavLink>
        </Colxx>
      </Row>
    </>
  )
}

Start.propTypes = {
  match: PropTypes.object
}

const SetupConnection = ({ match, heading }) => {
  const location = useLocation()
  return (
    <Container>
      <Row>
        <Colxx xxs='12'>
          <Breadcrumb heading={heading} match={location} />
          <Separator className='mb-5' />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs='12' className='mb-4'>
          <Suspense fallback={<div className='loading' />}>
            <Switch>
              <Route
                path={`${match.url}/new`}
                exact
                render={props => <NewConnection {...props} />}
              />

              <Route
                path={`${match.url}/existing`}
                exact
                render={props => <ExistingConnection {...props} />}
              />
              <Route
                path={`${match.url}/create-configurations/:processId`}
                exact
                render={props => <CreateConfiguration {...props} />}
              />
              <Route
                path={`${match.url}/create-configurations/review/:processId`}
                exact
                render={props => <ReviewSettings {...props} />}
              />
              <Route
                path={`${match.url}/technical-dashboards/:processId`}
                exact
                render={props => <Dashboard {...props} />}
              />
              <Route
                path={`${match.url}/business-dashboards/:processId`}
                exact
                render={props => <BusinessDashboard {...props} />}
              />
              <Route
                path={`${match.url}`}
                exact
                render={props => <Start {...props} />}
              />
              <Redirect to={`${match.url}`} />
            </Switch>
          </Suspense>
        </Colxx>
      </Row>
    </Container>
  )
}

SetupConnection.propTypes = {
  match: PropTypes.object,
  heading: PropTypes.string
}

export default SetupConnection
