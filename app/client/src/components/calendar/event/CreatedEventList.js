import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";

import { getCreatedEvents } from "../../../actions/event";
import { startTimeComparator } from "../../../utils/startTimeComparator";
import SingleEvent from "./SingleEvent";

const EventList = ({ events, loading, getCreatedEvents }) => {
	useEffect(() => {
		getCreatedEvents();
	}, [getCreatedEvents]);

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
				You have not created any events
			</p>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	events: state.events.createdEvents,
	loading: state.events.loadingCreatedEvents,
});

EventList.propTypes = {
	events: PropTypes.array,
	loading: PropTypes.bool,
	getCreatedEvents: PropTypes.func,
};

export default connect(mapStateToProps, { getCreatedEvents })(EventList);
