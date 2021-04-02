import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import SingleEvent from "./SingleEvent";

import { getCreatedEvents } from "../../../actions/event";
import { startTimeComparator } from "../../../utils/startTimeComparator";

const EventList = ({ events, loading, getCreatedEvents }) => {
	useEffect(() => {
		getCreatedEvents();
	}, [getCreatedEvents]);

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
	events: state.events.createdEvents,
	loading: state.events.loadingCreatedEvents,
});

EventList.propTypes = {
	events: PropTypes.array,
	loading: PropTypes.bool,
	getCreatedEvents: PropTypes.func,
};

export default connect(mapStateToProps, { getCreatedEvents })(EventList);
