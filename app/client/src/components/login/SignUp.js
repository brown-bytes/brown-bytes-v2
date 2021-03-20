import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { register } from "../../actions/auth";

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

const SignUp = ({ register }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		passwordRepeat: "",
	});

	const { name, email, password, passwordRepeat } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password.length < 8 || passwordRepeat < 8) {
			window.alert("Passwords should have more than 8 characters!");
			return;
		}
		if (password != passwordRepeat) {
			window.alert("Passwords should match!");
			return;
		}
		register(name, email, password);
	};

	return (
		<Fragment>
			<Container fluid>
				<p id="register-heading">Register for Brown Bytes</p>
				<hr></hr>
				<Form onSubmit={(e) => onSubmit(e)} id="signup-form">
					<Form.Group>
						<Form.Label className="feedback-form-label">
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
						<Form.Label className="signup-form-label-top">
							Email
						</Form.Label>
						<Form.Control
							size="lg"
							type="email"
							id="email"
							onChange={onChange}
							required
						/>
						<Form.Label className="signup-form-label-bottom">
							(required)
						</Form.Label>
					</Form.Group>

					<Form.Group>
						<Form.Label className="signup-form-label-top">
							Password
						</Form.Label>
						<Form.Control
							size="lg"
							type="password"
							id="password"
							onChange={onChange}
							minLength={8}
							required
						/>
						<Form.Label className="signup-form-label-bottom">
							(minimun 8 characters)
						</Form.Label>
					</Form.Group>

					<Form.Group>
						<Form.Label className="signup-form-label-top">
							Repeat Password
						</Form.Label>
						<Form.Control
							size="lg"
							type="password"
							id="passwordRepeat"
							onChange={onChange}
							minLength={8}
							required
						/>
					</Form.Group>
					<p className="signup-form-label-bottom">
						By registering, you accept terms of use and privacy
						policy.
					</p>
					<Button variant="info" type="submit">
						Register
					</Button>
				</Form>
				Already have an account? Log in{" "}
				<Link to="/login" id="login-forgot-password-text">
					here
				</Link>
			</Container>
		</Fragment>
	);
};

export default connect(mapStateToProps, { register })(SignUp);
