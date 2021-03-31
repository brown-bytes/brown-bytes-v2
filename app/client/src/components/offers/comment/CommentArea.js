import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import SingleComment from "./SingleComment";
import PostComment from "./PostComment";

const CommentArea = ({ comments, isAuthenticated, offerId }) => {
	return (
		<Fragment>
			{comments.map((comment) => (
				<SingleComment
					key={comment.id}
					comment={comment}></SingleComment>
			))}
			{isAuthenticated && <PostComment offerId={offerId}></PostComment>}
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
