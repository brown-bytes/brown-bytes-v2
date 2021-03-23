import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";

import Card from "react-bootstrap/Card";
import moment from "moment";

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
				variant="info"
				className="post-comment-button-overriding-bootstrap">
				Post
			</Button>
		</InputGroup>
	);
};

export default PostComment;
