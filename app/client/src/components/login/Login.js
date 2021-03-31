import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { login, loginGoogle, loginFacebook } from "../../actions/auth";
import { clearAlerts } from "../../actions/alert";

const Login = ({ login, loginGoogle, loginFacebook }) => {
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
								Log in
							</Button>
						</Form>

						<Link
							to="/forgotpassword"
							id="login-forgot-password-text">
							Forgot your Password?
						</Link>

						<Row>
							<Col
								xs={12}
								sm={12}
								md={12}
								lg={6}
								className="pt-2">
								<GoogleLogin
									clientId="852502263308-8anqhhr6s7bqqnjoegolvqmuolv4h1k2.apps.googleusercontent.com"
									buttonText="Login with Google"
									theme="dark"
									onSuccess={loginGoogle}
									onFailure={(res) => {
										console.log(
											"Google log in failed",
											res
										);
									}}
								/>
							</Col>
							<Col
								xs={12}
								sm={12}
								md={12}
								lg={6}
								className="pt-2">
								<FacebookLogin
									size="small"
									textButton={
										<div>
											<i
												className="fab fa-facebook-square"
												id="facebook-login-icon"></i>{" "}
											<span id="facebook-login-text">
												Login with FaceBook
											</span>
										</div>
									}
									appId="125349069552826"
									fields="name,email,picture"
									callback={(response) => {
										loginFacebook(response);
									}}
								/>
							</Col>
						</Row>
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

export default connect(null, { login, loginGoogle, loginFacebook })(Login);
