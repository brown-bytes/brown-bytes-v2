import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import EventList from "../calendar/event/EventList";

const MyEvents = () => {
	return (
		<Fragment>
			<p className="dashboard-my-events-heading">Events I am watching:</p>
			<EventList></EventList>
			<p className="dashboard-my-events-heading">Events I Created:</p>
			<EventList></EventList>
		</Fragment>
	);
};

export default MyEvents;
