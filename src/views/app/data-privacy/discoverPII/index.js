
import React, { useState, useEffect } from 'react'
import { Col, Row } from 'reactstrap'
import { useIntl } from 'react-intl'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Link } from 'react-router-dom'

// import Input from '../../../../components/Input/Input'
import Select from '../../../../components/Input/Select'
import Button from '../../../../components/button'
import OutputSystem from './OutputSystem'
import { useFetchSchemaFromDatabase, useFetchUserConnections, useFetchTablesFromDatabase } from './requestes'
import { databaseFieldSelector } from '../selector'
import { Notification } from '../../../../helpers/appUtils'
import IntlMessages from '../../../../helpers/IntlMessages'

const AddsytemDatabaseSelector = ({ connections, connectionId }) => {
    const { messages } = useIntl()
    const { register } = useFormContext();
    const databaseOptions = databaseFieldSelector(connections, connectionId)
    return <Select
        name='database'
        label='label.DiscoverPII.database'
        isSearchable
        innerRef={register({ required: messages['formError.processReq'] })}
        options={databaseOptions}
    />
}

const AddsytemSchemaSelector = ({ databaseName, connectionId }) => {
    const { messages } = useIntl()
    const { register } = useFormContext();
    const { loadingTable, error, schemaOptions } = useFetchSchemaFromDatabase({ connectionId, databaseName });
    useEffect(() => {
        error && Notification.error(error)
    }, [error, loadingTable])

    console.log({ schemaOptions, loadingTable })

    return <Select
        name='schema'
        label='label.DiscoverPII.schema'
        isSearchable
        innerRef={register({ required: messages['formError.processReq'] })}
        options={schemaOptions}
    />
}

const AddsytemDatabseTableSelector = ({ databaseName, connectionId }) => {
    const { messages } = useIntl()
    const { register } = useFormContext();
    const { tables, loadingTable, error, data } = useFetchTablesFromDatabase({
        connectionId, databaseName, withColumns: true,
    })

    useEffect(() => {
        error && Notification.error(error)
    }, [error, loadingTable])

    return <Select
        name='table'
        label='label.DiscoverPII.table'
        isSearchable
        isMultiCheckbox={!loadingTable}
        innerRef={register({ required: messages['formError.processReq'] })}
        options={tables}
        isLoading={loadingTable}
    />
}

const DiscoverPII = () => {
    const discoverPIIForm = useForm()
    const { messages } = useIntl()
    const { handleSubmit, watch } = discoverPIIForm
    const { connections, allData } = useFetchUserConnections()
    const [isshowOutput, setisshowOutput] = useState(false);

    const system = watch('system')
    const database = watch('database')

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const onSubmit = (data) => {
        console.log('data', data)
        setisshowOutput(true)
    }

    return (
        <div>
            <FormProvider {...discoverPIIForm}>
                <Row>
                    <Col sm={12} md={5}>
                        <Select
                            name='system'
                            label='label.DiscoverPII.system'
                            isSearchable
                            innerRef={discoverPIIForm.register({ required: messages['formError.addSystem.system'] })}
                            options={connections}
                        />
                    </Col>
                    <Col sm={12} md={5}>
                        <AddsytemDatabaseSelector connectionId={system} connections={allData} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={5}>
                        <AddsytemSchemaSelector connectionId={system} databaseName={database} />
                    </Col>
                    <Col sm={12} md={5}>
                        <AddsytemDatabseTableSelector connectionId={system} databaseName={database} />
                    </Col>
                </Row>
                <Row>
                    <Col md={3} />
                    <Col sm={12} md={5}>
                        <Select
                            name='piitype'
                            label='label.DiscoverPII.piitype'
                            isSearchable
                            isMultiCheckbox
                            innerRef={discoverPIIForm.register({ required: messages['formError.processReq'] })}
                            options={options}
                        />
                    </Col>
                </Row>
                <Row>
                    <Button loading={false} onClick={handleSubmit(onSubmit)}>Discover</Button>
                </Row>
            </FormProvider>
            <Row>
                <Link className='mt-5 h5' to="/app/data-privacy/AddSystem"><u><IntlMessages id={"label.addnewsource"} /></u></Link>
            </Row>
            {isshowOutput && <OutputSystem database={"demoDB"} schema={"Foodschema"} system={"system1"} />}
        </div>
    )
}

DiscoverPII.propTypes = {}

export default DiscoverPII
