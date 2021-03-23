import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { clearAlerts } from "../../actions/alert";
import SearchBar from "./offer/SearchBar";

const Calendar = ({ isAuthenticated }) => {
	useEffect(() => {
		clearAlerts();
	}, []);

	return (
		<Fragment>
			<p className="calendar-heading1">Offers</p>
			<p className="calendar-text">
				Offers are a way for you to publicize swipes or points that you
				would like to give away.
			</p>
			<p className="calendar-heading2">Actions</p>
			{isAuthenticated ? (
				<Link to="/NewOffer">
					<Button variant="success">New Offer</Button>
				</Link>
			) : (
				<p className="calendar-text">
					You are not logged in. Please log in to create new offers.
				</p>
			)}
			<hr></hr>
			<SearchBar></SearchBar>
			{/* <EventList></EventList> */}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Calendar);
