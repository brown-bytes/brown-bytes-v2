import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const NotLoggedInRoute = ({
	component: Component,
	auth: { isAuthenticated, loading },
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			isAuthenticated && !loading ? (
				<Redirect to="/dashboard" />
			) : (
				<Component {...props} />
			)
		}
	/>
);

NotLoggedInRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(NotLoggedInRoute);
