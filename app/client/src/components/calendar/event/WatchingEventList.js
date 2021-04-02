import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";

import SingleEvent from "./SingleEvent";

import { getWatchingEvents } from "../../../actions/event";

const startTimeComparator = (event1, event2) => {
	const date1 = event1.startTime;
	const date2 = event2.startTime;
	if (moment(date1).isBefore(date2)) {
		return 1;
	} else {
		return -1;
	}
};

const EventList = ({ events, loading, getWatchingEvents }) => {
	useEffect(() => {
		getWatchingEvents();
	}, [getWatchingEvents]);

	return loading ? (
		<Spinner animation="border" role="status">
			<span className="sr-only">Loading...</span>
		</Spinner>
	) : (
		<Fragment>
			{events.sort(startTimeComparator).map((event) => (
				<SingleEvent
					key={event.id}
					event={event}
					placeDisplayed="dashboardWatchingEvents"></SingleEvent>
			))}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	events: state.events.watchingEvents,
	loading: state.events.loadingWatchingEvents,
	queryString: state.events.queryString,
});

export default connect(mapStateToProps, { getWatchingEvents })(EventList);
