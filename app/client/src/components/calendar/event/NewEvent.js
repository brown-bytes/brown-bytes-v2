import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { createEvent } from "../../../actions/event";

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

const NewEvent = ({ createEvent }) => {
	const [formData, setFormData] = useState({
		title: "",
		location: "",
		date: "",
		startTime: "",
		endTime: "",
		eventType: "",
		hostGroup: "",
		whoCanCome: "",
		foodType: "",
		foodAmount: "",
		otherInfo: "",
	});

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		createEvent(formData);
	};

	return (
		<Fragment>
			<Container fluid>
				<p id="new-event-heading">New Event</p>
				<p className="new-event-text">
					Before creating an event please check that it does not
					already exist.
				</p>
				<p className="new-event-text">
					Events posted will appear in the{" "}
					<Link to="/calendar">calendar</Link> section.
				</p>
				<p className="new-event-text">
					<span className="new-event-asterisk new-event-text">*</span>{" "}
					indicates required information
				</p>
				<hr></hr>
				<Form onSubmit={(e) => onSubmit(e)} id="new-event-form">
					<Form.Group>
						<Form.Label className="new-event-form-label">
							<span className="new-event-asterisk new-event-text">
								*
							</span>{" "}
							Event Title:
						</Form.Label>
						<Form.Control
							id="title"
							size="lg"
							onChange={onChange}
							required
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label className="new-event-form-label">
							<span className="new-event-asterisk new-event-text">
								*
							</span>{" "}
							Location:
						</Form.Label>
						<Form.Control
							size="lg"
							id="location"
							onChange={onChange}
							required
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label className="new-event-form-label">
							<span className="new-event-asterisk new-event-text">
								*
							</span>{" "}
							Date:
						</Form.Label>
						<Form.Control
							size="lg"
							type="date"
							id="date"
							onChange={onChange}
							placeholder="yyyy/mm/dd"
							minLength={10}
							required
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label className="new-event-form-label">
							<span className="new-event-asterisk new-event-text">
								*
							</span>{" "}
							Start Time{" "}
							<span className="new-event-form-label-eg">
								(e.g. 09:31 AM, 13:14 PM):
							</span>
						</Form.Label>
						<Form.Control
							size="lg"
							type="time"
							id="startTime"
							onChange={onChange}
							placeholder="--:-- --"
							minLength={8}
							maxLength={8}
							required
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label className="new-event-form-label">
							<span className="new-event-asterisk new-event-text">
								*
							</span>{" "}
							End Time{" "}
							<span className="new-event-form-label-eg">
								(e.g. 09:31 AM, 13:14 PM):
							</span>
						</Form.Label>
						<Form.Control
							size="lg"
							type="time"
							id="endTime"
							onChange={onChange}
							placeholder="--:-- --"
							minLength={8}
							maxLength={8}
							required
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label className="new-event-form-label">
							Host Group:
						</Form.Label>
						<Form.Control
							size="lg"
							id="hostGroup"
							onChange={onChange}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label className="new-event-form-label">
							Event Type{" "}
							<span className="new-event-form-label-eg">
								(e.g. is it related to religon)
							</span>
							:
						</Form.Label>
						<Form.Control
							size="lg"
							id="eventType"
							onChange={onChange}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label className="new-event-form-label">
							Who can come:
						</Form.Label>
						<Form.Control
							size="lg"
							id="whoCanCome"
							onChange={onChange}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label className="new-event-form-label">
							Food Type:
						</Form.Label>
						<Form.Control
							size="lg"
							id="foodType"
							onChange={onChange}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label className="new-event-form-label">
							Food Amount:
						</Form.Label>
						<Form.Control
							size="lg"
							id="foodAmount"
							onChange={onChange}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label className="new-event-form-label">
							Other information:
						</Form.Label>
						<Form.Control
							size="lg"
							id="otherInfo"
							onChange={onChange}
						/>
					</Form.Group>

					<Button variant="info" type="submit">
						Create
					</Button>
				</Form>
			</Container>
		</Fragment>
	);
};

export default connect(mapStateToProps, { createEvent })(NewEvent);
