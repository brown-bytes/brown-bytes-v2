import React, { Fragment } from "react";
import { connect } from "react-redux";

import Spinner from "react-bootstrap/Spinner";

import SingleEvent from "./SingleEvent";

const EventList = ({ events, loading }) => {
	return loading ? (
		<Spinner animation="border" role="status">
			<span className="sr-only">Loading...</span>
		</Spinner>
	) : (
		<Fragment>
			{events.map((event) => (
				<SingleEvent key={event.id} event={event}></SingleEvent>
			))}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	events: state.events.pastEvents,
	loading: state.events.loading,
});

export default connect(mapStateToProps)(EventList);
