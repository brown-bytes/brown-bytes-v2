import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

import { clearAlerts } from "../../actions/alert";
import EventList from "./event/EventList";
import SearchBar from "./event/SearchBar";

const Calendar = ({ isAuthenticated }) => {
	useEffect(() => {
		clearAlerts();
	}, []);

	const [showPreviousEvents, setShowPreviousEvents] = useState(false);

	const togglePreviousEvents = (e) => {
		setShowPreviousEvents(showPreviousEvents ? false : true);
		e.target.text =
			e.target.text == "Show past events"
				? "Hide past events"
				: "Show past events";
	};

	return (
		<Fragment>
			<p className="calendar-heading1">Free Food Calendar</p>
			<p className="calendar-text">
				The following list of free food events were compiled by Brown
				Bytes users and ML algorithms. <br></br> Make sure to ensure the
				type of food available fits your dietary restrictions.
			</p>
			<p className="calendar-heading2">Actions</p>
			{isAuthenticated ? (
				<Link to="/NewEvent">
					<Button variant="success">Create Event</Button>
				</Link>
			) : (
				<p className="calendar-text">
					You are not logged in. Please log in to add events or
					comments.
				</p>
			)}
			<hr></hr>
			<SearchBar></SearchBar>
			<EventList></EventList>
			<a id="calendar-past-events-toggle" onClick={togglePreviousEvents}>
				Show past events
			</a>
			{showPreviousEvents && (
				<Fragment>
					<p className="calendar-heading2">Past Events</p>
					<EventList></EventList>
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Calendar);
