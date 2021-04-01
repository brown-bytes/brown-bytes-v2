import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "react-bootstrap/Spinner";

import SingleEvent from "./SingleEvent";

import { getFutureEvents } from "../../../actions/event";

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
			{events.map((event) => (
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
