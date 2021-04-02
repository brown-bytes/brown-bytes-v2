import React, { Fragment } from "react";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import SinglePastEvent from "./SinglePastEvent";
import { startTimeComparatorInverse } from "../../../utils/startTimeComparator";

const PastEventList = ({ events, loading }) => {
	return loading ? (
		<Spinner animation="border" role="status">
			<span className="sr-only">Loading...</span>
		</Spinner>
	) : (
		<Fragment>
			{events.sort(startTimeComparatorInverse).map((event) => (
				<SinglePastEvent key={event.id} event={event}></SinglePastEvent>
			))}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	events: state.events.pastEvents,
	loading: state.events.loadingPastEvents,
});

export default connect(mapStateToProps)(PastEventList);
