import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";

import PostComment from "./PostComment";
import SingleComment from "./SingleComment";

import { commentTimeComparator } from "../../../utils/commentTimeComparator";
const CommentArea = ({ comments, isAuthenticated, postId, placeDisplayed }) => {
	return (
		<Fragment>
			{comments.sort(commentTimeComparator).map((comment) => (
				<SingleComment
					key={comment.id}
					comment={comment}></SingleComment>
			))}
			{isAuthenticated && (
				<PostComment
					postId={postId}
					placeDisplayed={placeDisplayed}></PostComment>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

CommentArea.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	comments: PropTypes.array,
};

export default connect(mapStateToProps)(CommentArea);
