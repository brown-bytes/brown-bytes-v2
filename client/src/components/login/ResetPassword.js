import React, { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";

import { clearAlerts } from "../../actions/alert";
import { resetPasswordWithKey } from "../../actions/auth";

const ResetPassword = ({ resetPasswordWithKey }) => {
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
		const searchParams = new URLSearchParams(window.location.search);
		setFormData({ password: "", passwordRepeat: "" });
		const email = searchParams.get("email");
		const key = searchParams.get("key");

		resetPasswordWithKey(email, key, password, passwordRepeat);
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
							value={formData.password}
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
							value={formData.passwordRepeat}
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

export default connect(mapStateToProps, { resetPasswordWithKey })(
	ResetPassword
);
