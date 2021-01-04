import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import { useIntl } from 'react-intl'
import * as R from 'ramda'
import { FormProvider, useForm } from 'react-hook-form'

import Input from '../../../../components/Input/Input'
import Select from '../../../../components/Input/Select'
import Button from '../../../../components/button'
import IntlMessages from '../../../../helpers/IntlMessages'
import LayoutBase from '../../../../components/LayoutContainer'
import { Notification } from '../../../../helpers/appUtils'

import ConnectionFields from './ConnectionFields'
import { sourceTypes } from './staticFields'
import { useAsyncCheckExistingConnection, useAsyncCreateConnection, useAsynctestConnection } from './requests'

const isDatabase = R.equals('database')


const DiscoverPII = () => {
    const dicoverPiiForm = useForm()
    const { messages } = useIntl()
    const { handleSubmit, watch, getValues } = dicoverPiiForm
    const [runCreateConnection, loadingCreateConnection] = useAsyncCreateConnection()
    const [runCheckConnectionExists] = useAsyncCheckExistingConnection()
    const [runChecktestConnection, loadingtestConnection] = useAsynctestConnection()
    const [isTested, setisTested] = useState(false)

    const sourceType = watch('sourceType')

    const TestConnection = async () => {
        try {
            const data = getValues()
            await runChecktestConnection(data)
            await runCheckConnectionExists(data.connectionName)
            Notification.success('Database connection has been saved!')
            setisTested(true)
        } catch (error) {
            console.log(error)
            Notification.error('Failed to the database connection')
        }
    }

    const saveConnection = async (data) => {
        try {
            await runChecktestConnection(data)
            await runCheckConnectionExists(data.connectionName)
            await runCreateConnection(data)

            Notification.success('Database connection has been saved!')
            // setTimeout(() => {
            //     history.push('/app/data-privacy/ViewSystem')
            // }, 500)
        } catch (error) {
            Notification.error('Failed to save the database connection')
        }
    }

    return (
        <div>
            <LayoutBase label='create-connection' md={7}>
                <FormProvider {...dicoverPiiForm}>
                    <Row>
                        <Col >
                            <Input name='connectionName' label='label.connectionName' />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Select
                                name='sourceType'
                                label='label.sourceType'
                                isSearchable
                                innerRef={dicoverPiiForm.register({ required: messages['formError.DiscoverPII.system'] })}
                                options={sourceTypes}
                            />
                        </Col>
                    </Row>

                    {Boolean(sourceType) ?
                        isDatabase(sourceType) ? (
                            <ConnectionFields />
                        ) : (
                                <p>File Type</p>
                            )
                        : <></>
                    }

                    <Row className="mt-5">
                        <Col className='d-flex justify-content-center'>
                            <Button loading={Boolean(loadingtestConnection)} onClick={TestConnection} className="mr-5" size='lg'>
                                <IntlMessages id='control.test' />
                            </Button>
                            <Button disabled={!isTested} loading={Boolean(loadingCreateConnection || loadingCreateConnection)} className="ml-5" size='lg' onClick={handleSubmit(saveConnection)}>
                                <IntlMessages id='control.save' />
                            </Button>
                        </Col>
                    </Row>
                </FormProvider>

            </LayoutBase>
        </div>
    )
}

DiscoverPII.propTypes = {}

export default DiscoverPII
