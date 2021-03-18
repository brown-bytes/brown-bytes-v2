import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

const Login = () => (
	<div className="home">
		<h1>Login</h1>
	</div>
);

export default connect(mapStateToProps)(Login);
