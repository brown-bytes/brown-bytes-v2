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

const SingleComment = ({ comment }) => {
	return (
		<Card
			className="offset-1 comment-card-overriding-bootstrap"
			border="secondary">
			<Card.Body>
				{/* <Container fluid="true"> */}
				<Row noGutters="true">
					<Col xs={3} lg={3}>
						<img src="favicon-32x32.png" />
						{/* <span>{comment.content}</span> */}
					</Col>
					<Col xs={9} lg={9}>
						<span>{comment.content}</span>
						{/* <p>{comment.user}</p>
						<p>{comment.postTime}</p> */}
					</Col>
				</Row>
				{/* </Container> */}
			</Card.Body>
		</Card>
	);
};

export default SingleComment;
