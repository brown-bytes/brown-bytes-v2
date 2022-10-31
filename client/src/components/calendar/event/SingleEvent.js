import moment from "moment";
//import moment from "moment-timezone";
import React, { Fragment } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";

import { deleteEvent, unwatchEvent, watchEvent } from "../../../actions/event";
import CommentArea from "../comment/CommentArea";
import EventBadge from "./EventBadge";

const toggleMoreInfo = (e) => {
	const class_suffix = e.target.id;
	let info_items = document.getElementsByClassName(
		`event-card-${class_suffix}`
	);
	// use for loop here to make sure it works in IE
	for (let i = 0; i < info_items.length; ++i) {
		info_items[i].style.display =
			info_items[i].style.display === "block" ? "none" : "block";
	}
	e.target.textContent =
		e.target.textContent === "More info" ? "Less info" : "More info";
};

const SingleEvent = ({
	watchEvent,
	unwatchEvent,
	deleteEvent,
	isAuthenticated,
	authedUser,
	loadingUser,
	watchingEventIds,
	event,
	placeDisplayed,
}) => {
	const eventDate = moment(event.startTime).format("dddd, MMMM DD, YYYY");
	const startTime = moment(event.startTime).format("HH:mm A");
	const endTime = moment(event.endTime).format("HH:mm A");
	const createdAt = moment(event.createdAt).format(
		"HH:mm A, dddd, MMMM DD, YYYY"
	);
	return (
		<Fragment>
			<Accordion>
				<Card
					border="secondary"
					className="event-card-class-overriding-bootstrap">
					<Card.Header>
						<Row>
							<Col xs={6} sm={7} md={8} lg={9}>
								<p className="event-card-title">
									{event.title}
								</p>
							</Col>
							<Col xs={1} sm={1} md={1} lg={1}>
								<Button variant="outline-link"
										size="lg"
										href={event.link} 
										className="event-card-link">
									<i class="fa fa-link">
									</i>
								</Button>
							</Col>
							<Col xs={5} sm={4} md={3} lg={2}>
								<EventBadge
									startTime={event.startTime}
									endTime={event.endTime}></EventBadge>
							</Col>
						</Row>
					</Card.Header>
					<Card.Body
						border="secondary"
						className="event-card-overriding-bootstrap">
						<p className="event-card-keyinfo">
							<span className="event-card-boldtext">
								Location:{" "}
							</span>
							{event.location}
						</p>
						<p className="event-card-keyinfo">
							<span className="event-card-boldtext">Date: </span>
							{eventDate}
						</p>
						<p className="event-card-keyinfo">
							<span className="event-card-boldtext">Time:</span>{" "}
							{startTime} - {endTime}
						</p>
						{event.hostGroup && (
							<p
								className={`event-card-moreinfo event-card-moreinfo-class-${event.id}`}>
								<span className="event-card-boldtext">
									Host Group:{" "}
								</span>
								{event.hostGroup}
							</p>
						)}
						{event.whoCanCome && (
							<p
								className={`event-card-moreinfo event-card-moreinfo-class-${event.id}`}>
								<span className="event-card-boldtext">
									Who Can Come:{" "}
								</span>
								{event.whoCanCome}
							</p>
						)}
						{event.foodType && (
							<p
								className={`event-card-moreinfo event-card-moreinfo-class-${event.id}`}>
								<span className="event-card-boldtext">
									Food Type:{" "}
								</span>
								{event.foodType}
							</p>
						)}
						{event.foodAmount && (
							<p
								className={`event-card-moreinfo event-card-moreinfo-class-${event.id}`}>
								<span className="event-card-boldtext">
									Food Amount:{" "}
								</span>
								{event.foodAmount}
							</p>
						)}
						{event.OtherInfo && (
							<p
								className={`event-card-moreinfo event-card-moreinfo-class-${event.id}`}>
								<span className="event-card-boldtext">
									Other Information:{" "}
								</span>
								{event.OtherInfo}
							</p>
						)}
						<p
							className={`event-card-moreinfo event-card-italictext
                        event-card-moreinfo-class-${event.id}`}>
							Event created{" "}
							{event.creator && <span>by {event.creator}</span>}{" "}
							{event.createdAt && <span>at {createdAt}</span>}
						</p>

						<Row noGutters="true">
							<Col xs={3} sm={3} md={8} lg={9}>
								<button
									className={`event-more-text`}
									id={`moreinfo-class-${event.id}`}
									onClick={toggleMoreInfo}>
									More info
								</button>
							</Col>
							{isAuthenticated ? (
								<Col
									xs={9}
									sm={9}
									md={4}
									lg={3}
									className="justify-content-end d-flex">
									{!loadingUser &&
										authedUser &&
										(authedUser.userId ===
											event.creatorId ||
											authedUser.isAdmin) && (
											<Button
												className="pr-3"
												variant="outline-link"
												size="lg"
												id={event.id}
												onClick={(e) => {
													deleteEvent(
														e,
														placeDisplayed
													);
												}}>
												<i
													className="fas fa-trash-alt"
													id={event.id}
													onClick={(e) => {
														deleteEvent(
															e,
															placeDisplayed
														);
													}}></i>
												<span className="sr-only">
													Close
												</span>
											</Button>
										)}
									<Button
										className="px-2"
										style={
											watchingEventIds.has(event.id)
												? { color: "blue" }
												: null
										}
										variant="outline-link"
										size="lg">
										<i
											className="fas fa-eye"
											id={event.id}
											onClick={(e) => {
												watchEvent(e, placeDisplayed);
											}}
										/>
										<span className="sr-only">Close</span>{" "}
										{event.numWatches > 0 && (
											<span>{event.numWatches}</span>
										)}
									</Button>
									<Button
										className="px-3"
										variant="outline-link"
										size="lg"
										id={event.id}
										onClick={(e) => {
											unwatchEvent(e, placeDisplayed);
										}}>
										<i
											className="fas fa-eye-slash"
											id={event.id}
											onClick={(e) => {
												unwatchEvent(e, placeDisplayed);
											}}
										/>
										<span className="sr-only">Close</span>
									</Button>
									<Accordion.Toggle
										as={Button}
										className="px-2"
										variant="outline-link"
										eventKey="comment"
										size="lg">
										<i className="far fa-comment"></i>
										<span className="sr-only">
											Close
										</span>{" "}
										{event.comments.length > 0 && (
											<span>{event.comments.length}</span>
										)}
									</Accordion.Toggle>
								</Col>
							) : (
								<Col
									xs={9}
									sm={9}
									md={4}
									lg={3}
									className="justify-content-end d-flex">
									{event.numWatches > 0 ? (
										<Button
											disabled={true}
											className="px-2"
											variant="outline-link"
											size="lg">
											<i className="fas fa-eye" />
											<span className="sr-only">
												Close
											</span>{" "}
											{event.numWatches > 0 && (
												<span>{event.numWatches}</span>
											)}
										</Button>
									) : (
										<Fragment></Fragment>
									)}

									{event.comments.length > 0 && (
										<Accordion.Toggle
											as={Button}
											className="px-2"
											variant="outline-link"
											eventKey="comment"
											size="lg">
											<i className="far fa-comment"></i>
											<span className="sr-only">
												Close
											</span>{" "}
											<span>{event.comments.length}</span>
										</Accordion.Toggle>
									)}
								</Col>
							)}
						</Row>
					</Card.Body>
				</Card>
				<Accordion.Collapse eventKey="comment" className="comment-area">
					<CommentArea
						comments={event.comments}
						eventId={event.id}
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
			watchingEventIds: state.events.watchingEventIds,
		};
	} else {
		return {
			isAuthenticated: false,
			authedUser: null,
			loadingUser: null,
			watchingEventIds: new Set(),
		};
	}
};

export default connect(mapStateToProps, {
	watchEvent,
	unwatchEvent,
	deleteEvent,
})(SingleEvent);
