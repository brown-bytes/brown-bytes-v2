import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import {
	watch,
	unwatch,
	deleteEvent,
	postComment,
} from "../../../actions/event";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EventBadge from "./EventBadge";
import CommentArea from "../comment/CommentArea";

const toggleMoreInfo = (e) => {
	const class_suffix = e.target.id;
	let info_items = document.getElementsByClassName(
		`event-card-${class_suffix}`
	);
	// use for loop here to make sure it works in IE
	for (let i = 0; i < info_items.length; ++i) {
		info_items[i].style.display =
			info_items[i].style.display == "block" ? "none" : "block";
	}
	e.target.text = e.target.text == "More info" ? "Less info" : "More info";
};

const SingleEvent = ({
	watch,
	unwatch,
	deleteEvent,
	postComment,
	isAuthenticated,
	authedUser,
	loadingUser,
	event,
}) => {
	const eventDate = moment(event.date).format("dddd, MMMM DD, YYYY");
	const startTime = moment(`${event.date} ${event.startTime}`).format(
		"HH:mm A"
	);
	const endTime = moment(`${event.date} ${event.endTime}`).format("HH:mm A");
	return (
		<Fragment>
			<Accordion>
				<Card
					border="secondary"
					className="event-card-class-overriding-bootstrap">
					<Card.Header>
						<Row>
							<Col xs={6} sm={8} md={9} lg={10}>
								<p className="event-card-title">
									{event.title}
								</p>
							</Col>
							<Col xs={6} sm={4} md={3} lg={2}>
								<EventBadge
									startTime={`${event.date} ${event.startTime}`}
									endTime={`${event.date} ${event.endTime}`}></EventBadge>
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
							{event.creatTime && (
								<span>at {event.creatTime}</span>
							)}
						</p>

						<Row noGutters="true">
							<Col xs={3} sm={3} md={8} lg={9}>
								<a
									className={`event-more-text`}
									id={`moreinfo-class-${event.id}`}
									onClick={toggleMoreInfo}>
									More info
								</a>
							</Col>
							{isAuthenticated && (
								<Col
									xs={9}
									sm={9}
									md={4}
									lg={3}
									className="justify-content-end d-flex">
									{!loadingUser &&
										authedUser &&
										authedUser.userid == event.creator && (
											<Button
												className="pr-4"
												variant="outline-link"
												size="lg">
												<i className="fas fa-trash-alt"></i>
											</Button>
										)}
									<Button
										className="px-2"
										variant="outline-link"
										size="lg">
										<i className="fas fa-eye" />{" "}
										{event.watches.length > 0 && (
											<span>{event.watches.length}</span>
										)}
									</Button>
									<Button
										className="px-3"
										variant="outline-link"
										size="lg">
										<i className="fas fa-eye-slash" />
									</Button>
									<Accordion.Toggle
										as={Button}
										className="px-2"
										variant="outline-link"
										eventKey="comment"
										size="lg">
										<i className="far fa-comment"></i>{" "}
										{event.comments.length > 0 && (
											<span>{event.comments.length}</span>
										)}
									</Accordion.Toggle>
								</Col>
							)}
						</Row>
					</Card.Body>
				</Card>
				<Accordion.Collapse eventKey="comment" className="comment-area">
					<CommentArea comments={event.comments}></CommentArea>
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
	watch,
	unwatch,
	deleteEvent,
	postComment,
})(SingleEvent);
