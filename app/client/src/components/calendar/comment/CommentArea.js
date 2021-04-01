import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SingleComment from "./SingleComment";
import PostComment from "./PostComment";

const CommentArea = ({ comments, isAuthenticated, eventId }) => {
	return (
		<Fragment>
			{comments.map((comment) => (
				<SingleComment
					key={comment.id}
					comment={comment}></SingleComment>
			))}
			{isAuthenticated && <PostComment eventId={eventId}></PostComment>}
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
