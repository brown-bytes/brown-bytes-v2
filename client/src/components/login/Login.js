import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { clearAlerts } from "../../actions/alert";
import { login, loginFacebook, loginGoogle } from "../../actions/auth";

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
									clientId="28805008769-g5g3fshnjfnpvupcgn6ps5k4hhkef3qf.apps.googleusercontent.com"
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

Login.propTypes = {
	login: PropTypes.func,
	loginGoogle: PropTypes.func,
	loginFacebook: PropTypes.func,
};

export default connect(null, { login, loginGoogle, loginFacebook })(Login);
