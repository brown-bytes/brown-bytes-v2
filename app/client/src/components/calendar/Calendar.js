import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

import { clearAlerts } from "../../actions/alert";
import FutureEventList from "./event/FutureEventLIst";
import PastEventList from "./event/PastEventList";
import SearchBar from "./event/SearchBar";

import { getPastEvents } from "../../actions/event";

const Calendar = ({ isAuthenticated, numPastEventsFetched, getPastEvents }) => {
	useEffect(() => {
		clearAlerts();
	}, []);

	const [showPreviousEvents, setShowPreviousEvents] = useState(false);

	const togglePreviousEvents = (e) => {
		if (!showPreviousEvents) {
			getPastEvents(numPastEventsFetched);
		}
		setShowPreviousEvents(showPreviousEvents ? false : true);
		e.target.textContent =
			e.target.textContent === "Show past events"
				? "Hide past events"
				: "Show past events";
	};

	const toggleMorePreviousEvents = (e) => {
		console.log("fetch 10 more events");
		getPastEvents(numPastEventsFetched);
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
			<FutureEventList></FutureEventList>
			<button
				id="calendar-past-events-toggle"
				onClick={togglePreviousEvents}>
				Show past events
			</button>
			{showPreviousEvents && (
				<Fragment>
					<p className="calendar-heading2">Past Events</p>
					<PastEventList></PastEventList>
					<button
						id="calendar-more-past-events-toggle"
						onClick={toggleMorePreviousEvents}>
						Show more past events
					</button>
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	numPastEventsFetched: state.events.numPastEventsFetched,
});

export default connect(mapStateToProps, { getPastEvents })(Calendar);
