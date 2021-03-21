import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { watch, unwatch, deleteEvent, postComment } from "../../actions/event";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const toggleMoreInfo = (e) => {
	console.log(e.target);
	const class_suffix = e.target.id;
	let info_items = document.getElementsByClassName(
		`event-card-${class_suffix}`
	);
	for (let i = 0; i < info_items.length; ++i) {
		info_items[i].style.display =
			info_items[i].style.display == "block" ? "none" : "block";
	}
	e.target.text =
		e.target.text == "Show more info" ? "Show less info" : "Show more info";
};

const SingleEvent = ({
	watch,
	unwatch,
	deleteEvent,
	postComment,
	auth,
	event,
}) => {
	return (
		<Fragment>
			<Accordion>
				<Card>
					<Card.Header>
						<p className="event-card-title">{event.title}</p>
					</Card.Header>
					<Card.Body>
						<p className="event-card-keyinfo">
							<span className="event-card-boldtext">
								Location:{" "}
							</span>
							{event.location}
						</p>
						<p className="event-card-keyinfo">
							<span className="event-card-boldtext">Date: </span>
							{event.date}
						</p>
						<p className="event-card-keyinfo">
							<span className="event-card-boldtext">Time:</span>{" "}
							{event.startTime} - {event.endTime}
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
						<a
							className={`event-more-text`}
							id={`moreinfo-class-${event.id}`}
							onClick={toggleMoreInfo}>
							Show more info
						</a>
						{/* <Accordion.Toggle
							as={Button}
							variant="link"
							eventKey="comment">
							Click me!
						</Accordion.Toggle> */}
					</Card.Body>
					<Accordion.Collapse eventKey="comment">
						<Card.Body>Hello! I'm the body</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {
	watch,
	unwatch,
	deleteEvent,
	postComment,
})(SingleEvent);
