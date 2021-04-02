import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { clearAlerts } from "../../actions/alert";
import { register } from "../../actions/auth";

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

const termsPopover = (
	<Popover id="popover-basic">
		<Popover.Title as="h3">Privacy and Information Policy</Popover.Title>
		<Popover.Content>
			Brown Bytes is a non-profit organization that does not engage in or
			condone information gathering. No user behavioral information is
			collected, and all platform user statistics are private and belong
			to the user by which they were created. Brown Bytes is not an
			individual entity, but rather a platform, and the ownership of Brown
			Bytes resides in its users. Last Updated July 2018.
		</Popover.Content>
	</Popover>
);

const SignUp = ({ register }) => {
	useEffect(() => {
		clearAlerts();
	}, []);

	const [formData, setFormData] = useState({
		userName: "",
		email: "",
		password: "",
		passwordRepeat: "",
	});

	const { userName, email, password, passwordRepeat } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		register(userName, email, password, passwordRepeat);
	};

	return (
		<Fragment>
			<Container fluid>
				<p id="register-heading">Register for Brown Bytes</p>
				<hr></hr>
				<Form onSubmit={(e) => onSubmit(e)} id="signup-form">
					<Form.Group>
						<Form.Label
							className="signup-form-label-top"
							htmlFor="userName">
							Username
						</Form.Label>
						<Form.Control
							id="userName"
							size="lg"
							onChange={onChange}
							required
						/>
						<Form.Label className="signup-form-label-bottom">
							(required)
						</Form.Label>
					</Form.Group>

					<Form.Group>
						<Form.Label
							className="signup-form-label-top"
							htmlFor="email">
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
						<Form.Label
							className="signup-form-label-top"
							htmlFor="password">
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
						<Form.Label
							className="signup-form-label-top"
							htmlFor="passwordRepeat">
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
						By registering, you accept{" "}
						<OverlayTrigger
							trigger={["click", "hover"]}
							placement="bottom"
							overlay={termsPopover}>
							<span id="terms-clickable-text">
								{" "}
								terms of privacy and information Policy.
							</span>
						</OverlayTrigger>
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

SignUp.propTypes = {
	register: PropTypes.func,
};

export default connect(mapStateToProps, { register })(SignUp);
