import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

const SetupConnection = React.lazy(() => import(/* webpackChunkName: "start" */ './setupConnection'));
const DataIntegration = ({ match }) => (
	<Suspense fallback={<div className="loading" />}>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/set-up-connection`} />
			<Route
				path={`${match.url}/set-up-connection`}
				render={(props) => <SetupConnection {...props} heading="menu.data-integration" />}
			/>
			<Redirect to="/error" />
		</Switch>
	</Suspense>
);

DataIntegration.propTypes = {
	match: PropTypes.object,
};

export default DataIntegration;
