import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";

import SingleEvent from "./SingleEvent";

import { getFutureEvents } from "../../../actions/event";

const filterEvent = (event, queryString) => {
	return (
		event.title.includes(queryString) ||
		event.location.includes(queryString) ||
		moment(event.eventDate)
			.format("dddd, MMMM DD, YYYY")
			.includes(queryString) ||
		(event.admittance && event.admittance.includes(queryString)) ||
		(event.hostGroup && event.hostGroup.includes(queryString)) ||
		(event.eventType && event.eventType.includes(queryString)) ||
		(event.foodType && event.foodType.includes(queryString)) ||
		(event.foodAmount && event.foodAmount.includes(queryString)) ||
		(event.otherInfo && event.otherInfo.includes(queryString))
	);
};

const startTimeComparator = (event1, event2) => {
	const date1 = event1.startTime;
	const date2 = event2.startTime;
	if (moment(date1).isBefore(date2)) {
		return -1;
	} else {
		return 1;
	}
};

const FutureEventList = ({ events, loading, queryString, getFutureEvents }) => {
	useEffect(() => {
		getFutureEvents();
	}, [getFutureEvents]);

	return loading ? (
		<Spinner animation="border" role="status">
			<span className="sr-only">Loading...</span>
		</Spinner>
	) : (
		<Fragment>
			{events
				.filter((event) => filterEvent(event, queryString))
				.sort(startTimeComparator)
				.map((event) => (
					<SingleEvent
						key={event.id}
						event={event}
						placeDisplayed="homeAndCalendar"></SingleEvent>
				))}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	events: state.events.futureEvents,
	loading: state.events.loadingFutureEvents,
	queryString: state.events.queryString,
});

export default connect(mapStateToProps, { getFutureEvents })(FutureEventList);
