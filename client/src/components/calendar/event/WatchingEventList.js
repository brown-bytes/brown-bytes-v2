import React, { Fragment, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";

import { getWatchingEvents } from "../../../actions/event";
import { startTimeComparator } from "../../../utils/startTimeComparator";
import SingleEvent from "./SingleEvent";

const WatchingEventList = ({ events, loading, getWatchingEvents }) => {
	useEffect(() => {
		getWatchingEvents();
	}, [getWatchingEvents]);

	return loading ? (
		<Spinner animation="border" role="status">
			<span className="sr-only">Loading...</span>
		</Spinner>
	) : events.length > 0 ? (
		<Fragment>
			{events.sort(startTimeComparator).map((event) => (
				<SingleEvent
					key={event.id}
					event={event}
					placeDisplayed="dashboardEvents"></SingleEvent>
			))}
		</Fragment>
	) : (
		<Fragment>
			<p className="no-dashboard-events-label">
				You are not watching any events
			</p>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	events: state.events.watchingEvents,
	loading: state.events.loadingWatchingEvents,
	queryString: state.events.queryString,
});

export default connect(mapStateToProps, { getWatchingEvents })(
	WatchingEventList
);
