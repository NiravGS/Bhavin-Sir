import qs from 'qs';
import * as R from 'ramda';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Button from '../../../../../components/button';
import Input from '../../../../../components/Input/Input';
import Select, { SelectRow } from '../../../../../components/Input/Select';
import LayoutBase from '../../../../../components/LayoutContainer';
import { Notification, toggle } from '../../../../../helpers/appUtils';
import IntlMessages from '../../../../../helpers/IntlMessages';
import DatabaseConnectionModal from '../../../data-quality/setupConnection/newConnection/DatabaseConnection';
import { ConnectionFields } from '../../../data-quality/setupConnection/newConnection/ConnectionFields';

import { formFileOptions } from '../../../data-quality/setupConnection/newConnection/formLabelFields';
import SelectDataBaseField from '../../../data-quality/setupConnection/SelectDataBaseField';
import testConnection from '../../../testConnection';
import {
	useAsyncCheckExistingConnection,
	useAsyncFetchExistingConnection,
	useAsyncCreateConnection,
} from '../createConnection/requests';
import { sourceTypes } from '../createConnection/staticFields';
import { getEditConnectionValue } from '../selector';
import { useAsyncUpdateProcess } from './request'

const isDatabase = R.equals('database');

const mountDataToSend = (data) => ({ ...data, sourceType: data.sourceType });

const EditConnection = (props) => {
	const {
		match: { params },
	} = props;
	const { data } = useAsyncFetchExistingConnection(params.connectionId);

	const defaultValues = getEditConnectionValue(data);

	const intl = useIntl();
	const history = useHistory();
	const formMethods = useForm({ defaultValues });

	// const [openDatabaseConnection, setOpenDatabaseConnection] = useState(false)
	const [isTested, setisTested] = useState(false);
	const [runCreateConnection] = useAsyncCreateConnection();
	const [
		runCheckConnectionExists,
		loadingConnectionExists,
		connectionExistsValue,
	] = useAsyncCheckExistingConnection();
	const [runUpdate, loadingUpdate] = useAsyncUpdateProcess()

	const connectionExists = !connectionExistsValue;

	const sourceType = formMethods.watch('sourceType');
	const dbType = formMethods.watch('type');

	const updateConnection = async () => {
		try {
			const data = formMethods.getValues();
			runUpdate(data)
			// await testConnection(data);
			// await runCreateConnection(mountDataToSend(data));
			console.log('data', data);
			// Notification.success('Database connection has been saved!');
			// history.push('/app/data-integration/set-up-connection/create-process');
		} catch (error) {
			Notification.error('Failed to save the database connection');
		}
	};

	const test_Connection = async () => {
		const data = formMethods.getValues();
		console.log('test data', data);
		await testConnection(data);
		setisTested(true);
	};

	const checkConnectionExists = async () => {
		const connectionName = formMethods.watch('connectionName');
		try {
			if (connectionName) {
				await runCheckConnectionExists(connectionName);
			}
			formMethods.clearErrors(['connectionName']);
			return false;
		} catch (error) {
			formMethods.setError('connectionName', 'manual', intl.messages['label.error.connectionNameExists']);
			return true;
		}
	};

	return (
		<LayoutBase label="update-connection">
			<FormProvider {...formMethods}>
				<Row>
					<Col className="av-tooltip tooltip-label-right">
						<Input
							formclass="error-l-125"
							onBlur={checkConnectionExists}
							label="label.connectionName"
							name="connectionName"
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Select options={sourceTypes} name="sourceType" label="label.sourceType" />
					</Col>
				</Row>
				{isDatabase(sourceType) ? (
					<Row>
						<Col>
							<SelectDataBaseField />
						</Col>
					</Row>
				) : (
					<SelectRow label="label.source-file-type" options={formFileOptions} name="type" />
				)}
				<ConnectionFields />

				<Row>
					<Col className="d-flex">
						<Button size="lg" color="warning" onClick={() => history.goBack()}>
							<IntlMessages id="control.cancel" />
						</Button>
					</Col>
					<Col className="d-flex justify-content-center">
						<Button size="lg" onClick={test_Connection}>
							<IntlMessages id="control.test" />
						</Button>
					</Col>
					<Col className="d-flex justify-content-center">
						<Button
							size="lg"
							onClick={updateConnection}
							loading={loadingConnectionExists}
							disabled={!isDatabase(sourceType) || !dbType || !isTested}
						>
							<IntlMessages id="control.update" />
						</Button>
					</Col>
				</Row>

				{/* <DatabaseConnectionModal
                    open={openDatabaseConnection}
                    onTest={testConnection}
                    onSave={saveConnection}
                    toggle={toggle(setOpenDatabaseConnection)}
                /> */}
			</FormProvider>
		</LayoutBase>
	);
};

EditConnection.propTypes = {};

export default EditConnection;
