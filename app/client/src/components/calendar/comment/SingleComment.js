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

const SingleComment = ({ comment }) => {
	return (
		<Card
			className="offset-1 comment-card-overriding-bootstrap"
			border="secondary">
			<Card.Body className="py-1 px-1">
				{/* <Container fluid="true"> */}
				<Row noGutters="true">
					<Col
						xs={3}
						sm={3}
						md={2}
						lg={2}
						className="comment-favicon-container">
						{/* <img src="favicon-32x32.png" /> */}
						<Image
							className="comment-favicon"
							src="favicon-96x96.png"
							fluid
							roundedCircle
							thumbnail></Image>
					</Col>
					<Col xs={9} sm={9} md={10} lg={10}>
						<p className="comment-head">
							<span className="comment-user">{comment.user}</span>{" "}
							posted at{" "}
							<span className="comment-time">
								{moment(comment.postTime).format(
									"HH:mm, DD/MM/YY"
								)}
							</span>
						</p>
						<p className="comment-content">{comment.content} </p>
					</Col>
				</Row>
				{/* </Container> */}
			</Card.Body>
		</Card>
	);
};

export default SingleComment;
