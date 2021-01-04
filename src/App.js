import firebase from 'firebase/app'
import React, { Component, Suspense, useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,

  Redirect, Route,
  Switch
} from 'react-router-dom'
import ColorSwitcher from './components/common/ColorSwitcher'
import NotificationContainer from './components/common/react-notifications/NotificationContainer'
import { isDemo, isMultiColorActive } from './constants/defaultValues'
import './helpers/Firebase'
import { getDirection } from './helpers/Utils'
import { IntlProvider } from './IntlProvider'
import { loginUserSuccess } from './redux/actions'
import { listenRunningProcess } from './views/app/data-integration/setupConnection/editProcess/request'
import "bootstrap/dist/css/bootstrap.min.css"


const ViewMain = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views')
)
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
)
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/user')
)
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
)

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ component: Component, authUser, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [loadingAuth, setLoadingAuth] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const database = firebase.database()
    const databaseRef = database.ref('/data-integration/process')
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // const {active} = await axiosGetSwr('/user')
        dispatch(loginUserSuccess({ displayName: user.displayName }))
        listenRunningProcess(databaseRef, dispatch)
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
      }
      setLoadingAuth(false)
    })
    return () => databaseRef.off()
  }, [])
  return loadingAuth ? <div className='loading' /> : (
    <Route
      {...rest}
      render={props =>
        authenticated || isDemo ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/user/login',
              state: { from: props.location }
            }}
          />
        )}
    />

  )
}

class App extends Component {
  constructor (props) {
    super(props)
    const direction = getDirection()
    if (direction.isRtl) {
      document.body.classList.add('rtl')
      document.body.classList.remove('ltr')
    } else {
      document.body.classList.add('ltr')
      document.body.classList.remove('rtl')
    }
  }

  render () {
    const { loginUser } = this.props
    return (
      <div className='h-100'>
        <IntlProvider>
          <>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}
            <Suspense fallback={<div className='loading' />}>
              <Router>
                <Switch>
                  <AuthRoute
                    path='/app'
                    authUser={loginUser}
                    component={ViewApp}
                  />
                  <Route
                    path='/user'
                    render={props => <ViewUser {...props} />}
                  />
                  {/* <Route
                    path='/error'
                    exact
                    render={props => <ViewError {...props} />}
                  /> */}
                  <Route
                    path='/'
                    exact
                    render={props => <ViewMain {...props} />}
                  />
                  {/* <Redirect to='/error' /> */}
                </Switch>
              </Router>
            </Suspense>
          </>
        </IntlProvider>
      </div>
    )
  }
}

const mapStateToProps = ({ authUser, settings }) => {
  const { user: loginUser } = authUser
  const { locale } = settings
  return { loginUser, locale }
}
const mapActionsToProps = {}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App)
