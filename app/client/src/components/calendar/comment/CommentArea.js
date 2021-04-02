import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";

import PostComment from "./PostComment";
import SingleComment from "./SingleComment";

const CommentArea = ({
	comments,
	isAuthenticated,
	eventId,
	placeDisplayed,
}) => {
	return (
		<Fragment>
			{comments.map((comment) => (
				<SingleComment
					key={comment.id}
					comment={comment}></SingleComment>
			))}
			{isAuthenticated && (
				<PostComment
					eventId={eventId}
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
