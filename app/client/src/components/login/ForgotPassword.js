import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { resetPassword } from "../../actions/auth";

const ForgotPassword = ({ resetPassword }) => {
	const [formData, setFormData] = useState({
		email: "",
	});

	const { email } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.type]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		resetPassword(email);
	};

	return (
		<Fragment>
			<Container fluid>
				<Row>
					<Col xs={12} sm={12} md={6}>
						<p className="login-signup-reset-heading">
							Reset Password
						</p>
						<p className="login-signup-reset-plain-text">
							Enter an email address associated with your account.
							You will receive an email with the link to reset
							your password.
						</p>
						<hr></hr>
						<Form
							onSubmit={(e) => {
								onSubmit(e);
								e.target.reset();
							}}
							id="forgot-password-form">
							<Form.Group controlId="formEmail">
								<Form.Label className="login-reset-form-label">
									Account Email
								</Form.Label>
								<Form.Control
									size="lg"
									type="email"
									placeholder="Enter email"
									onChange={onChange}
									required
								/>
							</Form.Group>

							<Button variant="info" type="submit">
								Submit
							</Button>
						</Form>

						<Link to="/login" id="login-forgot-password-text">
							Back to Login
						</Link>
					</Col>
					<Col xs={12} sm={12} md={6}>
						<p className="login-signup-reset-heading">
							Don't have an account yet?
						</p>
						<hr></hr>
						<p className="login-signup-reset-plain-text">
							Create an account to be able to use the platform
							best:
						</p>
						<ul>
							<li className="login-signup-reset-plain-text">
								Create, track and manage offers
							</li>
							<li className="login-signup-reset-plain-text">
								Get compensated when you give away meal credits
							</li>
							<li className="login-signup-reset-plain-text">
								Stay informed about Brown Bytes changes and
								updates
							</li>
						</ul>
						<Link to="/signup">
							<Button variant="success">Sign Up</Button>
						</Link>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

ForgotPassword.propTypes = {
	resetPassword: PropTypes.func,
};

export default connect(null, { resetPassword })(ForgotPassword);
