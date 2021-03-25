import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import EventList from "../calendar/event/EventList";

const MyEvents = () => {
	return (
		<Fragment>
			<p className="dashboard-my-events-heading">Events I am watching:</p>
			<EventList></EventList>
			<p className="dashboard-my-events-heading">Events I Created:</p>
			<EventList></EventList>
		</Fragment>
	);
};

export default MyEvents;
