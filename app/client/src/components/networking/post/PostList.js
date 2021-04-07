import PropTypes from "prop-types";
import React, { Fragment } from "react";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";

import { postTimeComparator } from "../../../utils/postTimeComparator";
import SinglePost from "./SinglePost";

const PostList = ({ posts, loading }) => {
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
					placeDisplayed="networkingPage"></SinglePost>
			))}
		</Fragment>
	) : (
		<Fragment>
			<p className="no-posts-label">There are no posts to show here.</p>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	posts: state.post.posts,
	loading: state.post.loading,
});

PostList.propTypes = {
	posts: PropTypes.array,
	loading: PropTypes.bool,
};

export default connect(mapStateToProps)(PostList);
