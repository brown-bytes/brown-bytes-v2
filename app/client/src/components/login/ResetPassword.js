import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { clearAlerts } from "../../actions/alert";

import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const ForgotPassword = ({}) => {
	useEffect(() => {
		clearAlerts();
	}, []);

	const [formData, setFormData] = useState({
		password: "",
		passwordRepeat: "",
	});

	const { password, passwordRepeat } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
	};

	return (
		<Fragment>
			<Container fluid>
				<p id="register-heading">Reset Password</p>
				<hr></hr>
				<Form onSubmit={(e) => onSubmit(e)} id="signup-form">
					<Form.Group>
						<Form.Label className="signup-form-label-top">
							New Password
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
							Repeat New Password
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

					<Button variant="info" type="submit">
						Reset Password
					</Button>
				</Form>
			</Container>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

export default connect(mapStateToProps)(ForgotPassword);
