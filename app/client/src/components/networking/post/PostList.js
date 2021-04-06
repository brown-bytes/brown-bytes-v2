import moment from "moment";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";

import { startTimeComparator } from "../../../utils/startTimeComparator";
import SinglePost from "./SinglePost";

const filterPost = (post, queryString) => {
	return (
		post.creator.includes(queryString) || post.content.includes(queryString)
	);
};

const PostList = ({ posts, loading, queryString }) => {
	return loading ? (
		<Spinner animation="border" role="status">
			<span className="sr-only">Loading Posts...</span>
		</Spinner>
	) : posts.length > 0 ? (
		<Fragment>
			{posts
				// .filter((post) => filterPost(post, queryString))
				.map((post) => (
					<SinglePost
						key={post.id}
						post={post}
						placeDisplayed="networkingPage"></SinglePost>
				))}
		</Fragment>
	) : (
		<Fragment>
			<p className="no-posts-label">There are no posts for now.</p>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	posts: state.post.posts,
	loading: state.post.loading,
	queryString: state.post.queryString,
});

PostList.propTypes = {
	posts: PropTypes.array,
	loading: PropTypes.bool,
	queryString: PropTypes.string,
};

export default connect(mapStateToProps)(PostList);
