import React, { Fragment } from "react";

import CreatedPostList from "../networking/post/CraetedPostList";

const MyPosts = () => {
	return (
		<Fragment>
			<p className="dashboard-my-events-heading">
				Networking Posts I created:
			</p>
			<CreatedPostList></CreatedPostList>
		</Fragment>
	);
};

export default MyPosts;
