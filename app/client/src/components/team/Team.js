import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";

import { clearAlerts } from "../../actions/alert";
import { sendFeedBack } from "../../actions/feedback";

const Team = ({ sendFeedBack }) => {
	useEffect(() => {
		clearAlerts();
	}, []);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		comment: "",
	});

	const { name, email, comment } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.id]: e.target.value });

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
				<a href="mailto:scott_huson@brown.edu">scott_huson@brown.edu</a>
				. We would love to have your help in making Brown a better
				place!
			</p>
			<p id="team-text">
				You can also leave a comment below and let us know what you
				think, how this application can improve, or if you would like to
				contribute.
			</p>
			<Form
				id="feedback-form"
				onSubmit={(e) => {
					onSubmit(e);
					e.target.reset();
				}}>
				<Form.Group>
					<Form.Label className="feedback-form-label" htmlFor="name">
						Your full name
					</Form.Label>
					<Form.Control
						id="name"
						size="lg"
						onChange={onChange}
						required
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label className="feedback-form-label" htmlFor="email">
						Email
					</Form.Label>
					<Form.Control
						size="lg"
						type="email"
						id="email"
						onChange={onChange}
						required
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label
						className="feedback-form-label"
						htmlFor="comment">
						Comments
					</Form.Label>
					<Form.Control
						type="comment"
						id="comment"
						as="textarea"
						onChange={onChange}
						rows={3}
					/>
				</Form.Group>
				<Button variant="info" type="submit">
					<i className="far fa-envelope"></i> Send
				</Button>
			</Form>
		</Fragment>
	);
};

Team.propTypes = {
	sendFeedBack: PropTypes.func,
};

export default connect(null, { sendFeedBack })(Team);
