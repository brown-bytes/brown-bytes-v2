import moment from "moment";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/esm/Accordion";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";

import { deleteOffer } from "../../../actions/offer";
import CommentArea from "../comment/CommentArea";

const SingleOffer = ({
	deleteOffer,
	isAuthenticated,
	authedUser,
	loadingUser,
	offer,
	placeDisplayed,
}) => {
	const offerDate = moment(offer.startTime).format("dddd, MMMM DD, YYYY");
	const startTime = moment(offer.startTime).format("HH:mm A");
	const endTime = moment(offer.endTime).format("HH:mm A");

	return (
		<Fragment>
			<Accordion>
				<Card
					border="secondary"
					className="offer-card-class-overriding-bootstrap">
					<Card.Header>
						<p className="offer-card-title">{offer.description}</p>
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
										alt="image_logo"
										src={offer.avatarURL}
										fluid
										roundedCircle
										thumbnail></Image>
								</Col>
								<Col xs={10} sm={10} md={10} lg={10}>
									<p className="offer-card-keyinfo">
										<span className="offer-card-boldtext">
											Creator:{" "}
										</span>
										{offer.creator}
									</p>

									<p className="offer-card-keyinfo">
										<span className="offer-card-boldtext">
											Location:{" "}
										</span>
										{offer.location}
									</p>
									<p className="offer-card-keyinfo">
										<span className="offer-card-boldtext">
											Date:{" "}
										</span>
										{offerDate}
									</p>
									<p className="offer-card-keyinfo">
										<span className="offer-card-boldtext">
											Time:
										</span>{" "}
										{startTime} - {endTime}
									</p>
									{offer.otherInfo && (
										<p className="offer-card-keyinfo">
											<span className="offer-card-boldtext">
												Other information:
											</span>{" "}
											{offer.otherInfo}
										</p>
									)}
								</Col>
							</Row>
							<Row className="justify-content-end d-flex">
								{!loadingUser &&
									isAuthenticated &&
									authedUser &&
									authedUser.userId === offer.creatorId && (
										<Button
											className="pr-3"
											variant="outline-link"
											size="lg"
											id={offer.id}
											onClick={(e) => {
												deleteOffer(e, placeDisplayed);
											}}>
											<i
												id={offer.id}
												className="fas fa-trash-alt"></i>
											<span className="sr-only">
												Close
											</span>
										</Button>
									)}
								<Accordion.Toggle
									as={Button}
									className="px-2"
									variant="outline-link"
									eventKey="comment"
									size="lg">
									<i className="far fa-comment"></i>
									<span className="sr-only">Close</span>{" "}
									{offer.comments.length > 0 && (
										<span> {offer.comments.length}</span>
									)}
								</Accordion.Toggle>
							</Row>
						</Container>
					</Card.Body>
				</Card>
				<Accordion.Collapse eventKey="comment" className="comment-area">
					<CommentArea
						comments={offer.comments}
						offerId={offer.id}
						placeDisplayed={placeDisplayed}></CommentArea>
				</Accordion.Collapse>
			</Accordion>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	if (state.auth && state.auth.user) {
		return {
			isAuthenticated: state.auth.isAuthenticated,
			authedUser: state.auth.user.data,
			loadingUser: state.auth.loading,
		};
	} else {
		return {
			isAuthenticated: false,
			authedUser: null,
			loadingUser: null,
		};
	}
};

SingleOffer.propTypes = {
	isAuthenticated: PropTypes.bool,
	authedUser: PropTypes.object,
	loadingUser: PropTypes.bool,
	deleteOffer: PropTypes.func,
};

export default connect(mapStateToProps, {
	deleteOffer,
})(SingleOffer);
