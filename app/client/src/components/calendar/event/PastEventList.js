import React, { Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";

import SingleEvent from "./SingleEvent";

const startTimeComparator = (event1, event2) => {
	const date1 = event1.startTime;
	const date2 = event2.startTime;
	if (moment(date1).isBefore(date2)) {
		return -1;
	} else {
		return 1;
	}
};

const PastEventList = ({ events, loading }) => {
	return loading ? (
		<Spinner animation="border" role="status">
			<span className="sr-only">Loading...</span>
		</Spinner>
	) : (
		<Fragment>
			{events.sort(startTimeComparator).map((event) => (
				<SingleEvent key={event.id} event={event}></SingleEvent>
			))}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	events: state.events.pastEvents,
	loading: state.events.loadingPastEvents,
});

export default connect(mapStateToProps)(PastEventList);
