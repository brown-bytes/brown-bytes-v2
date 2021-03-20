import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Calendar = ({ isAuthenticated }) => (
	<Fragment>
		<p className="calendar-heading1">Free Food Calendar</p>
		<p className="calendar-text">
			The following list of free food events were compiled by Brown Bytes
			users and ML algorithms. <br></br> Make sure to ensure the type of
			food available fits your dietary restrictions.
		</p>
		<p className="calendar-heading2">Actions</p>
		{isAuthenticated ? (
			<Link to="/newevent">
				<Button variant="success">Create Event</Button>
			</Link>
		) : (
			<p className="calendar-text">
				You are not logged in. Log in to add events to the calendar.
			</p>
		)}
		<hr></hr>
	</Fragment>
);

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Calendar);
