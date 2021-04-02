import React, { Fragment } from "react";

import WatchingEventList from "../calendar/event/WatchingEventList";
import CreatedEventList from "../calendar/event/CreatedEventList";

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
