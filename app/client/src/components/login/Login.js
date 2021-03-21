import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { login } from "../../actions/auth";
import { clearAlerts } from "../../actions/alert";

const Login = ({ login, isAuthenticated }) => {
	useEffect(() => {
		clearAlerts();
	}, []);

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.type]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		login(email, password);
	};

	return (
		<Fragment>
			<Container fluid>
				<Row>
					<Col xs={12} sm={12} md={6}>
						<p className="login-signup-reset-heading">Log in</p>
						<hr></hr>
						<Form onSubmit={(e) => onSubmit(e)} id="login-form">
							<Form.Group controlId="formEmail">
								<Form.Label className="login-reset-form-label">
									Email
								</Form.Label>
								<Form.Control
									size="lg"
									type="email"
									placeholder="Enter email"
									onChange={onChange}
									required
								/>
							</Form.Group>

							<Form.Group controlId="formPassword">
								<Form.Label className="login-reset-form-label">
									Password
								</Form.Label>
								<Form.Control
									size="lg"
									type="password"
									placeholder="Password"
									onChange={onChange}
									required
								/>
							</Form.Group>
							<Button variant="info" type="submit">
								Submit
							</Button>
						</Form>

						<Link
							to="/forgotpassword"
							id="login-forgot-password-text">
							Forgot your Password?
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

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
