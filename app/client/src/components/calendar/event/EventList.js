import React, { Fragment } from "react";
import { connect } from "react-redux";

import Spinner from "react-bootstrap/Spinner";

import { getEvents } from "../../../actions/event";
import SingleEvent from "./SingleEvent";

const EventList = ({ getEvents, events, loading, queryString }) => {
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
	events: state.events.events,
	loading: state.events.loading,
	queryString: state.events.queryString,
});

export default connect(mapStateToProps, { getEvents })(EventList);
