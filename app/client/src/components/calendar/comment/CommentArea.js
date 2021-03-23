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

import SingleComment from "./SingleComment";

const CommentArea = ({ comments }) => {
	return (
		<Fragment>
			{comments.map((comment) => (
				<SingleComment
					key={comment.id}
					comment={comment}></SingleComment>
			))}
		</Fragment>
	);
};

export default CommentArea;
