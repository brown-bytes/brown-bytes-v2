import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";

import { postTimeComparator } from "../../../utils/postTimeComparator";
import SinglePost from "./SinglePost";

import { getCreatedPosts } from "../../../actions/post";

const CreatedPostList = ({ posts, loading, getCreatedPosts }) => {
	useEffect(() => {
		getCreatedPosts();
	}, [getCreatedPosts]);

	return loading ? (
		<Spinner animation="border" role="status">
			<span className="sr-only">Loading Posts...</span>
		</Spinner>
	) : posts.length > 0 ? (
		<Fragment>
			{posts.sort(postTimeComparator).map((post) => (
				<SinglePost
					key={post.id}
					post={post}
					placeDisplayed="dashboardPosts"></SinglePost>
			))}
		</Fragment>
	) : (
		<Fragment>
			<p className="no-posts-label">You have not created any posts.</p>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	posts: state.post.createdPosts,
	loading: state.post.loadingCreatedPosts,
});

CreatedPostList.propTypes = {
	posts: PropTypes.array,
	loading: PropTypes.bool,
	getCreatedPosts: PropTypes.func,
};

export default connect(mapStateToProps, { getCreatedPosts })(CreatedPostList);
