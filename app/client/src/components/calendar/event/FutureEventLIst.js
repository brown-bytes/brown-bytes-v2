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

const EventList = ({ events, loading, queryString, getFutureEvents }) => {
	useEffect(() => {
		getFutureEvents();
	}, []);

	return loading ? (
		<Spinner animation="border" role="status">
			<span className="sr-only">Loading...</span>
		</Spinner>
	) : (
		<Fragment>
			{events
				.filter((event) => filterEvent(event, queryString))
				.map((event) => (
					<SingleEvent key={event.id} event={event}></SingleEvent>
				))}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	events: state.events.futureEvents,
	loading: state.events.loadingFuture,
	queryString: state.events.queryString,
});

export default connect(mapStateToProps, { getFutureEvents })(EventList);
