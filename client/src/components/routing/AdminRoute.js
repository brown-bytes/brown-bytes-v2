import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AdminRoute = ({
	component: Component,
	auth: { isAuthenticated, loading, isAdmin },
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			!isAuthenticated && !loading && isAdmin !== true ? (
				<Redirect to="/login" />
			) : (
				<Component {...props} />
			)
		}
	/>
);

AdminRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);
