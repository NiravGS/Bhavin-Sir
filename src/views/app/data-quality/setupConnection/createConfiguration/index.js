import PropTypes from 'prop-types'
import React, { Suspense, useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import * as R from 'ramda'
import { Col, Row } from 'reactstrap'
import Button from '../../../../../components/button'
import LayoutBase from '../../../../../components/LayoutContainer'
import { Notification, toggle } from '../../../../../helpers/appUtils'
import IntlMessages from '../../../../../helpers/IntlMessages'
import { useAsyncGetConfiguration } from '../requests'
import { ConfigProvider, useConfigDispatch, useConfigState } from './ConfigProvider'
import AskFinish from './fieldModals/AskFinish'
import { useAsyncCreateConfig } from './requests'
import ReviewSettings from './review'
import { currentContentTableDiff } from './configurationSelector'
import { Link, useHistory } from 'react-router-dom'

const SettingFields = React.lazy(() => import('./SettingFields'))

const CreateConfigurationComp = ({ match, onFinish, intl }) => {
  const processId = match?.params?.processId
  const history = useHistory()
  const { configuration, loading } = useAsyncGetConfiguration(processId)
  const [runCreateConfig, creating] = useAsyncCreateConfig()
  const [askFinish, setAskFinish] = useState(false)

  const dispatch = useConfigDispatch()
  const state = useConfigState()
  useEffect(() => {
    dispatch({ type: 'setConfiguration', payload: configuration })
  }, [configuration])

  const justFinish = () => {
    history.push(`/app/data-quality/set-up-connection/create-configurations/review/${processId}`)
  }

  const dataToSend = currentContentTableDiff(state)

  const saveAndFinish = async () => {
    try {
      await runCreateConfig(processId, dataToSend)
      dispatch({ type: 'updateInitialContent' })
      Notification.success(`"${state.selectedTable?.label}" ${intl.messages['alert.success.savedTable']}`)
      onFinish()
    } catch (error) {
      Notification.error(`"${state.selectedTable?.label}" ${intl.messages['alert.error.savedTable']}`)
    }
  }

  const onSaveAndContinue = async () => {
    try {
      await runCreateConfig(processId, dataToSend)
      dispatch({ type: 'selectNextTable' })
      dispatch({ type: 'updateInitialContent' })
      Notification.success(`"${state.selectedTable?.label}" ${intl.messages['alert.success.savedTable']}`)
    } catch (error) {
      Notification.error(`"${state.selectedTable?.label}" ${intl.messages['alert.error.savedTable']}`)
    }
  }

  const hasNoChanges = !dataToSend?.columns?.length
  return (
    <>
      <LayoutBase label='makeYourSelection'>

        <div style={{ minHeight: '300px' }}>

          {loading
            ? <div className='loading' data-testid='loading-fields' />
            : (
              <Suspense fallback='loading fields...'><SettingFields /></Suspense>
            )}

        </div>

        <Row className='pt-5 justify-content-center'>
          <Col xs={12} md='auto'>
            <Button
              disabled={R.or(creating, loading)}
              data-testid='finish-button'
              size='md' color='primary' onClick={toggle(setAskFinish)}
            >
              <IntlMessages id='control.finish' />
            </Button>
          </Col>
          <Col xs={12} md='auto'>
            <Button
              loading={creating}
              disabled={hasNoChanges}
              size='md' color='primary'
              data-testid='bt-save-and-continue'
              onClick={onSaveAndContinue}
            >
              <IntlMessages id='control.saveAndContinue' />
            </Button>
          </Col>
          <Col xs={12} md='auto'>
            <Button size='md' color='secondary' tag={Link} to='/app'>
              <IntlMessages id='control.cancel' />
            </Button>
          </Col>
        </Row>
      </LayoutBase>
      <AskFinish
        onSaveAndFinish={saveAndFinish}
        askDiscard={dataToSend}
        open={askFinish}
        creating={creating}
        onChoseFinish={justFinish} toggle={toggle(setAskFinish)}
      />
    </>

  )
}

CreateConfigurationComp.propTypes = {
  match: PropTypes.object,
  intl: PropTypes.object,
  onFinish: PropTypes.func
}

const CreateConfigurationIntl = injectIntl(CreateConfigurationComp)

const CreateConfiguration = (props) => {
  const [review, setReview] = useState(false)
  return (
    <ConfigProvider>
      {
        !review
          ? <CreateConfigurationIntl onFinish={toggle(setReview)} {...props} />
          : <ReviewSettings backToCreation={toggle(setReview)} {...props} />
      }

    </ConfigProvider>
  )
}

export default CreateConfiguration
