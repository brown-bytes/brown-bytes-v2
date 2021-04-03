import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { clearAlerts } from "../../../actions/alert";
import { createOffer } from "../../../actions/offer";

const NewOffer = ({ createOffer }) => {
	useEffect(() => {
		clearAlerts();
	}, []);

	const [formData, setFormData] = useState({
		description: "",
		location: "",
		date: "",
		startTime: "",
		endTime: "",
		otherInfo: "",
		anonymous: false,
	});

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]:
				e.target.id !== "anonymous" ? e.target.value : e.target.checked,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		createOffer(formData);
	};

	return (
		<Fragment>
			<Container fluid>
				<p id="new-offer-heading">New Offer</p>
				<p className="new-offer-text">
					Offers are a way for you to publicize swipes or points that
					you would like to give away.<br></br> Post an offer for some
					swipes at a location and it will appear in the{" "}
					<Link to="/offers">offers</Link> section.
				</p>
				<p className="new-offer-text">
					<span className="new-offer-asterisk new-offer-text">*</span>{" "}
					indicates required information
				</p>
				<hr></hr>
				<Form onSubmit={(e) => onSubmit(e)} id="new-offer-form">
					<Form.Group>
						<Form.Label
							className="new-offer-form-label"
							htmlFor="description">
							<span className="new-offer-asterisk new-offer-text">
								*
							</span>{" "}
							Description:
						</Form.Label>
						<Form.Control
							id="description"
							size="lg"
							onChange={onChange}
							required
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label
							className="new-offer-form-label"
							htmlFor="location">
							<span className="new-offer-asterisk new-offer-text">
								*
							</span>{" "}
							Location:
						</Form.Label>
						<Form.Control
							as="select"
							size="lg"
							id="location"
							onChange={onChange}
							required>
							<option value="">
								-- Please choose a location --
							</option>
							<option>Anywhere</option>
							<option>Andrews Commons</option>
							<option>The Sharpe Refactory</option>
							<option>Blue Room</option>
							<option>Joy's</option>
							<option>Vernon Wolley</option>
							<option>Engineering Research Center</option>
							<option>Ivy Room</option>
							<option>Scili Cafe</option>
						</Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label
							className="new-offer-form-label"
							htmlFor="date">
							<span className="new-offer-asterisk new-offer-text">
								*
							</span>{" "}
							Date:
						</Form.Label>
						<Form.Control
							size="lg"
							type="date"
							id="date"
							onChange={onChange}
							placeholder="yyyy/mm/dd"
							minLength={10}
							required
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label
							className="new-offer-form-label"
							htmlFor="startTime">
							<span className="new-offer-asterisk new-offer-text">
								*
							</span>{" "}
							Start Time{" "}
							<span className="new-offer-form-label-eg">
								(e.g. 09:31 AM, 13:14 PM):
							</span>
						</Form.Label>
						<Form.Control
							size="lg"
							type="time"
							id="startTime"
							onChange={onChange}
							placeholder="--:-- --"
							minLength={8}
							maxLength={8}
							required
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label
							className="new-offer-form-label"
							htmlFor="endTime">
							<span className="new-offer-asterisk new-offer-text">
								*
							</span>{" "}
							End Time{" "}
							<span className="new-offer-form-label-eg">
								(e.g. 09:31 AM, 13:14 PM):
							</span>
						</Form.Label>
						<Form.Control
							size="lg"
							type="time"
							id="endTime"
							onChange={onChange}
							placeholder="--:-- --"
							minLength={8}
							maxLength={8}
							required
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label
							className="new-offer-form-label"
							htmlFor="otherInfo">
							Other information:
						</Form.Label>
						<Form.Control
							size="lg"
							id="otherInfo"
							onChange={onChange}
						/>
					</Form.Group>
					<Form.Check
						label="Anonymous"
						id="anonymous"
						onChange={onChange}
					/>
					<Button variant="info" type="submit">
						Create
					</Button>
				</Form>
			</Container>
		</Fragment>
	);
};

NewOffer.propTypes = {
	createOffer: PropTypes.func.isRequired,
};

export default connect(null, { createOffer })(NewOffer);
