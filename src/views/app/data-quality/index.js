import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch } from 'react-router-dom'

const SetupConnection = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './setupConnection')
)
const CreateProcess = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './createProcess')
)
const Connections = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './connections')
)

const DataQuality = ({ match }) => (
  <Suspense fallback={<div className='loading' />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/set-up-connection`} />
      <Route
        path={`${match.url}/set-up-connection`}
        render={props => <SetupConnection {...props} heading='menu.data-quality' />}
      />
      <Route
        path={`${match.url}/process`}
        render={props => <CreateProcess {...props} heading='menu.data-quality' />}
      />
      <Route
        path={`${match.url}/connections`}
        render={props => <Connections {...props} heading='menu.view-connections' />}
      />
      <Redirect to='/error' />
    </Switch>
  </Suspense>
)

DataQuality.propTypes = {
  match: PropTypes.object
}

export default DataQuality
