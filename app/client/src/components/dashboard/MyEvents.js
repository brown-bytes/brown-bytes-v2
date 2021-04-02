import React, { Fragment } from "react";

import CreatedEventList from "../calendar/event/CreatedEventList";
import WatchingEventList from "../calendar/event/WatchingEventList";

const MyEvents = () => {
	return (
		<Fragment>
			<p className="dashboard-my-events-heading">Events I am watching:</p>
			<WatchingEventList></WatchingEventList>
			<p className="dashboard-my-events-heading">Events I Created:</p>
			<CreatedEventList></CreatedEventList>
		</Fragment>
	);
};

export default MyEvents;
