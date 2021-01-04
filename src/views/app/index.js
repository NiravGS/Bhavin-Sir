import React, { Component, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import AppLayout from '../../layout/AppLayout'

const DataIntegration = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './data-integration')
)
const DataQuality = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './data-quality')
)
const MainPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './mainPage/mainPage')
)
const DataPrivacy = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './data-privacy')
)

class App extends Component {
  render() {
    const { match } = this.props

    return (
      <AppLayout>
        <div className='dashboard-wrapper'>
          <Suspense fallback={<div className='loading' />}>
            <Switch>
              <Route
                path={`${match.url}/data-integration`}
                render={props => <DataIntegration {...props} />}
              />
              <Route
                path={`${match.url}/data-quality`}
                render={props => <DataQuality {...props} />}
              />
              <Route
                path={`${match.url}/data-privacy`}
                render={props => <DataPrivacy {...props} />}
              />
              <Route
                path={`${match.url}`}
                render={props => <MainPage {...props} />}
              />
              {/* <Redirect to="/error" /> */}
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    )
  }
}

App.propTypes = {
  match: PropTypes.object
}

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu
  return { containerClassnames }
}

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
)
