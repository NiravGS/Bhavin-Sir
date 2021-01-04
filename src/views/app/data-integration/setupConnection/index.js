import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Processes from './processes';
import EditProcess from './editProcess';
import EditConnection from './editConnection';

import ViewProcessPage from './reviewProcess/ReviewProcessPage';

const CreateConnection = React.lazy(() => import('./createConnection'));
const CreateProcess = React.lazy(() => import('./createProcess'));
const Connections = React.lazy(() => import('./connections'));

const SetupConnection = ({ match, heading }) => {
	const location = useLocation();
	return (
		<Container>
			<Row>
				<Colxx xxs="12">
					<Breadcrumb heading={heading} match={location} />
					<Separator className="mb-5" />
				</Colxx>
			</Row>
			<Row>
				<Colxx xxs="12" className="mb-4">
					<Suspense fallback={<div className="loading" />}>
						<Switch>
							<Route
								path={`${match.url}/create-process`}
								exact
								render={(props) => <CreateProcess {...props} />}
							/>
							<Route
								path={`${match.url}/view-all-processes`}
								exact
								render={(props) => <Processes {...props} />}
							/>
							<Route
								path={`${match.url}/process/:processId`}
								exact
								render={(props) => <EditProcess {...props} />}
							/>
							<Route
								path={`${match.url}/review-process/:processId`}
								exact
								render={(props) => <ViewProcessPage {...props} />}
							/>

							<Route
								path={`${match.url}/create-connection`}
								exact
								render={(props) => <CreateConnection {...props} />}
							/>
							<Route
								path={`${match.url}/connections`}
								exact
								render={(props) => <Connections {...props} />}
							/>
							<Route
								path={`${match.url}/update-connection/:connectionId`}
								exact
								render={(props) => <EditConnection {...props} />}
							/>
							<Redirect to={`${match.url}`} />
						</Switch>
					</Suspense>
				</Colxx>
			</Row>
		</Container>
	);
};

SetupConnection.propTypes = {
	match: PropTypes.object,
	heading: PropTypes.string,
};

export default SetupConnection;
