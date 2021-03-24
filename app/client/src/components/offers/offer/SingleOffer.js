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

import { deleteOffer, postComment } from "../../../actions/offer";
import Accordion from "react-bootstrap/esm/Accordion";
import CommentArea from "../comment/CommentArea";

const SingleOffer = ({
	deleteOffer,
	postComment,
	isAuthenticated,
	authedUser,
	loadingUser,
	offer,
}) => {
	console.log(authedUser);
	const offerDate = moment(offer.date).format("dddd, MMMM DD, YYYY");
	const startTime = moment(`${offer.date} ${offer.startTime}`).format(
		"HH:mm A"
	);
	const endTime = moment(`${offer.date} ${offer.endTime}`).format("HH:mm A");

	return (
		<Fragment>
			<Accordion>
				<Card
					border="secondary"
					className="event-card-class-overriding-bootstrap">
					<Card.Header>
						<p className="event-card-title">{offer.description}</p>
					</Card.Header>

					<Card.Body className="py-1 px-1">
						<Container fluid>
							<Row>
								<Col
									xs={2}
									sm={2}
									md={2}
									lg={2}
									className="pl-1 pr-0">
									<Image
										className="comment-favicon"
										src="favicon-96x96.png"
										fluid
										roundedCircle
										thumbnail></Image>
								</Col>
								<Col xs={10} sm={10} md={10} lg={10}>
									<p className="event-card-keyinfo">
										<span className="event-card-boldtext">
											Creator:{" "}
										</span>
										{offer.creator}
									</p>

									<p className="event-card-keyinfo">
										<span className="event-card-boldtext">
											Location:{" "}
										</span>
										{offer.location}
									</p>
									<p className="event-card-keyinfo">
										<span className="event-card-boldtext">
											Date:{" "}
										</span>
										{offerDate}
									</p>
									<p className="event-card-keyinfo">
										<span className="event-card-boldtext">
											Time:
										</span>{" "}
										{startTime} - {endTime}
									</p>
									{offer.otherInfo && (
										<p className="event-card-keyinfo">
											<span className="event-card-boldtext">
												Other information:
											</span>{" "}
											{offer.otherInfo}
										</p>
									)}
								</Col>
							</Row>
							<Row className="justify-content-end d-flex">
								{!loadingUser &&
									authedUser &&
									authedUser.userid == offer.creator && (
										<Button
											className="pr-3"
											variant="outline-link"
											size="lg">
											<i className="fas fa-trash-alt"></i>
										</Button>
									)}
								<Accordion.Toggle
									as={Button}
									className="px-2"
									variant="outline-link"
									eventKey="comment"
									size="lg">
									<i className="far fa-comment"></i>
								</Accordion.Toggle>
							</Row>
						</Container>
					</Card.Body>
				</Card>
				<Accordion.Collapse eventKey="comment" className="comment-area">
					<CommentArea comments={offer.comments}></CommentArea>
				</Accordion.Collapse>
			</Accordion>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	authedUser: state.auth.user,
	loadingUser: state.auth.loading,
});

export default connect(mapStateToProps, {
	deleteOffer,
	postComment,
})(SingleOffer);
