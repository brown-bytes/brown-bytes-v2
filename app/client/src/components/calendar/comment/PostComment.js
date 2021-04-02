import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import { postEventComment } from "../../../actions/event";

const PostComment = ({ eventId, postEventComment, placeDisplayed }) => {
	const [comment, setComment] = useState("");

	const onChange = (e) => {
		setComment(e.target.value);
	};

	const onClick = (e) => {
		const eventId = e.target.id;
		setComment("");
		postEventComment(comment, eventId, placeDisplayed);
	};

	return (
		<InputGroup>
			<FormControl
				className="offset-1 post-comment-input-overriding-bootstrap"
				placeholder="Leave you comment"
				aria-label="Comment input"
				onChange={onChange}
				value={comment}
			/>
			<Button
				id={eventId}
				onClick={onClick}
				variant="dark"
				className="post-comment-button-overriding-bootstrap">
				Post
			</Button>
		</InputGroup>
	);
};

PostComment.propTypes = {
	postOfferComment: PropTypes.func,
};

export default connect(null, {
	postEventComment,
})(PostComment);
