import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { getEvents } from "../../../actions/event";
import SingleEvent from "./SingleEvent";

const EventList = ({ getEvents, events, loading, queryString }) => {
	return loading ? (
		<Spinner animation="border" role="status">
			<span className="sr-only">Loading...</span>
		</Spinner>
	) : (
		<Fragment>
			{events.map((event) => (
				<SingleEvent key={event.id} event={event}></SingleEvent>
			))}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	events: state.events.events,
	loading: state.events.loading,
	queryString: state.events.queryString,
});

export default connect(mapStateToProps, { getEvents })(EventList);
