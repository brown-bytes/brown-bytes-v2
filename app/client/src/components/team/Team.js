import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import sendFeedBack from "../../actions/feedback";

const Team = ({ sendFeedBack }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		comment: "",
	});

	const { name, email, comment } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.type]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		sendFeedBack(name, email, comment);
	};

	return (
		<Fragment>
			<p id="team-heading">Our Team</p>
			<hr></hr>
			<p id="team-text">
				Join our team by contacting{" "}
				<a href="mailto:scoot_huson@brown.edu">scoot_huson@brown.edu</a>
				. We would love to have your help in making Brown a better
				place!
			</p>
			<p id="team-text">
				You can also leave a comment below and let us know what you
				think, how this application can improve, or if you would like to
				contribute.
			</p>
			<Form id="feedback-form" onSubmit={(e) => onSubmit(e)}>
				<Form.Group controlId="formYourName">
					<Form.Label className="feedback-form-label">
						Your full name
					</Form.Label>
					<Form.Control
						type="name"
						size="lg"
						onChange={onChange}
						required
					/>
				</Form.Group>

				<Form.Group controlId="formEmail">
					<Form.Label className="feedback-form-label">
						Email
					</Form.Label>
					<Form.Control
						size="lg"
						type="email"
						onChange={onChange}
						required
					/>
				</Form.Group>

				<Form.Group controlId="formPassword">
					<Form.Label className="feedback-form-label">
						Comments
					</Form.Label>
					<Form.Control
						type="comment"
						as="textarea"
						onChange={onChange}
						rows={3}
					/>
				</Form.Group>
				<Button variant="info" type="submit">
					Send
				</Button>
			</Form>
		</Fragment>
	);
};

export default connect(null, { sendFeedBack })(Team);
