import React, { Suspense, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button, Col, Row, Label, Badge } from 'reactstrap'
import LayoutBase from '../../../../../components/LayoutContainer'
import IntlMessages from '../../../../../helpers/IntlMessages'
import ViewDropdown from '../createConfiguration/dropdownLinks/ViewDropdown'
import ExistingFormRefreshed from './ExistingFormRefreshed'
import { toggle, Notification } from '../../../../../helpers/appUtils'
import { useAsyncRefetchData } from './requests'
import { useIntl } from 'react-intl'
import AskRefreshSchema from './AskRefreshSchema'

const ExistingConnection = () => {
  const [askRefetch, setAskRefetch] = useState(false)
  const [runFetchData, loading, content] = useAsyncRefetchData()
  const refreshedProcesses = content?.data?.refreshedProcesses
  const methods = useForm()
  const { messages } = useIntl()

  const onRefresh = async ({ connectionId }) => {
    try {
      await runFetchData({ connectionId })
      Notification.success(`${messages['alert.success.refresh-schema']}`)
      toggle(setAskRefetch)()
    } catch (error) {
      Notification.error(`${messages['alert.error.refresh-schema']}`)
    }
  }

  const processIdSelected = methods.watch('processName')

  return (
    <Suspense fallback={<div className='loading' />}>

      <LayoutBase label='existing-connection' md={11} lg={8} style={{ minHeight: '400px' }}>
        <FormProvider {...methods}>
          <form>
            <Row>
              <Col>
                <ExistingFormRefreshed />
              </Col>
            </Row>
            <Row className='mt-4 mb-3'>
              <Col>
                {
                  refreshedProcesses && (
                    <>
                      <h6><IntlMessages id='label.processNamesRefreshed' /></h6>
                      {
                      refreshedProcesses?.map(({ process, success }, index) => {
                        const keyIndex = `refreshed${index}`
                        return (
                          <Row key={keyIndex}>
                            <Col>
                              <Label className='mb-0'>
                                {process.processName}
                              </Label>
                            </Col>
                            <Col>
                              {success
                                ? (
                                  <Badge color='outline-primary' pill size='sm'>
                                    <Label className='mb-0'><IntlMessages id='label.refreshed' /></Label>
                                  </Badge>)
                                : (
                                  <Badge color='outline-secondary' pill size='sm'>
                                    <Label className='mb-0'><IntlMessages id='label.failedToConnect' /></Label>
                                  </Badge>)}
                            </Col>
                          </Row>
                        )
                      })
                      }

                    </>
                  )
                }

              </Col>
            </Row>
            <Row className='pt-5 justify-content-center'>
              <Col xs={12} md='auto'>
                <Button onClick={() => setAskRefetch(true)} size='md' color='primary'>
                  <IntlMessages id='control.refreshSource' />
                </Button>
              </Col>
              <Col xs={12} md='auto'>
                <ViewDropdown processId={processIdSelected} />
              </Col>
              <Col xs={12} md='auto'>
                <Button size='md' color='primary'>
                  <IntlMessages id='label.viewAlerts' />
                </Button>
              </Col>
              <Col xs={12} md='auto'>
                <Button
                  disabled={!processIdSelected}
                  to={`/app/data-quality/set-up-connection/create-configurations/review/${processIdSelected}`}
                  tag={Link}
                  data-testid='finish-button'
                  size='lg' color='primary'
                >
                  <IntlMessages id='label.view-process' />
                </Button>
              </Col>

            </Row>
            <AskRefreshSchema
              open={askRefetch}
              loading={loading}
              onRefresh={methods.handleSubmit(onRefresh)}
              toggle={toggle(setAskRefetch)}
            />
          </form>
        </FormProvider>
      </LayoutBase>
    </Suspense>
  )
}

export default ExistingConnection
