import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import SingleEvent from "./SingleEvent";

import { getWatchingEvents } from "../../../actions/event";
import { startTimeComparator } from "../../../utils/startTimeComparator";

const WatchingEventList = ({ events, loading, getWatchingEvents }) => {
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
					placeDisplayed="dashboardEvents"></SingleEvent>
			))}
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
