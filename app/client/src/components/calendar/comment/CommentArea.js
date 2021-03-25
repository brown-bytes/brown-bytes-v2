import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SingleComment from "./SingleComment";
import PostComment from "./PostComment";

const CommentArea = ({ comments }) => {
	return (
		<Fragment>
			{comments.map((comment) => (
				<SingleComment
					key={comment.id}
					comment={comment}></SingleComment>
			))}
			<PostComment></PostComment>
		</Fragment>
	);
};

export default CommentArea;
