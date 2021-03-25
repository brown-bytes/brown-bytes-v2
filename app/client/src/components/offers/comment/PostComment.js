import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const PostComment = () => {
	return (
		<InputGroup>
			<FormControl
				className="offset-1 post-comment-input-overriding-bootstrap"
				placeholder="Leave you comment"
				aria-label="Comment input"
			/>
			<Button
				variant="dark"
				className="post-comment-button-overriding-bootstrap">
				Post
			</Button>
		</InputGroup>
	);
};

export default PostComment;
