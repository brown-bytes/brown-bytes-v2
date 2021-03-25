import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";

import ChangeAvatarModal from "./ChangeAvatarModal";

const Profile = () => {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<Fragment>
			<Container fluid className="pt-2">
				<Image
					className="comment-favicon"
					id="dashboard-profile-favicon"
					src="favicon-96x96.png"
					fluid
					roundedCircle
					thumbnail
					onClick={() => setModalShow(true)}></Image>
				<Form>
					<Form.Group>
						<Form.Label className="dashboard-profile-form-label">
							Bio
						</Form.Label>
						<Form.Control
							id="bio"
							as="textarea"
							placeholder="A short bio of yourself"
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label className="dashboard-profile-form-label">
							Facebook
						</Form.Label>
						<Form.Control
							id="facebook"
							placeholder="Link to Your Facebook account"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label className="dashboard-profile-form-label">
							Twitter
						</Form.Label>
						<Form.Control
							id="twitter"
							placeholder="Link to Your Twitter account"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label className="dashboard-profile-form-label">
							Instagram
						</Form.Label>
						<Form.Control
							id="instagram"
							placeholder="Link to Your Instagram account"
						/>
					</Form.Group>
					<Button variant="info" type="submit">
						Save
					</Button>
				</Form>
			</Container>
			<ChangeAvatarModal
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</Fragment>
	);
};

export default Profile;
