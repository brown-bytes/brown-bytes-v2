import moment from "moment";
import React, { Fragment, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";

import { getFutureEvents } from "../../../actions/event";
import { startTimeComparator } from "../../../utils/startTimeComparator";
import SingleEvent from "./SingleEvent";

const filterEvent = (event, queryString) => {
	return (
		event.title.includes(queryString) ||
		event.location.includes(queryString) ||
		moment(event.startTime)
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

const FutureEventList = ({ events, loading, queryString, getFutureEvents }) => {
	useEffect(() => {
		getFutureEvents();
	}, [getFutureEvents]);

	return loading ? (
		<Spinner animation="border" role="status">
			<span className="sr-only">Loading...</span>
		</Spinner>
	) : events.length > 0 ? (
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
	) : (
		<Fragment>
			<p className="no-events-label">
				That's weird, there are no free food events coming up.
			</p>
			<p className="no-events-label">
				Contact the team if this issue keeps occuring.
			</p>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	events: state.events.futureEvents,
	loading: state.events.loadingFutureEvents,
	queryString: state.events.queryString,
});

export default connect(mapStateToProps, { getFutureEvents })(FutureEventList);
