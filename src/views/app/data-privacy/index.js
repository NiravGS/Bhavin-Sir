import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Container, Row } from 'reactstrap';

import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';

const DiscoverPII = React.lazy(() => import('./discoverPII'));
const Add_System = React.lazy(() => import('./addSystem'));
const Generate_Report = React.lazy(() => import('./generateReport'));
const View_System = React.lazy(() => import('./viewSystem'));
const Manage_Driver = React.lazy(() => import('./manageDriver'));

const DataPrivacy = ({ match }) => {
	const location = useLocation();

	return (
		<Container>
			<Row>
				<Colxx xxs="12">
					<Breadcrumb heading="menu.data-privacy" match={location} />
					<Separator className="mb-5" />
				</Colxx>
			</Row>
			<Row>
				<Colxx xxs="12" className="mb-4">
					<Suspense fallback={<div className="loading" />}>
						<Switch>
							<Redirect exact from={`${match.url}/`} to={`${match.url}/DiscoverPII`} />
							<Route path={`${match.url}/DiscoverPII`} render={(props) => <DiscoverPII {...props} />} />
							<Route path={`${match.url}/AddSystem`} render={(props) => <Add_System {...props} />} />
							<Route path={`${match.url}/ViewSystem`} render={(props) => <View_System {...props} />} />
							<Route
								path={`${match.url}/GenerateReport`}
								render={(props) => <Generate_Report {...props} />}
							/>
							<Route
								path={`${match.url}/ManageDriver`}
								render={(props) => <Manage_Driver {...props} />}
							/>
							<Redirect to="/error" />
						</Switch>
					</Suspense>
				</Colxx>
			</Row>
		</Container>
	);
};

DataPrivacy.propTypes = {
	match: PropTypes.object,
};

export default DataPrivacy;
