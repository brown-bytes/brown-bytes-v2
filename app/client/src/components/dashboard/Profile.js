import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import ChangeAvatarModal from "./ChangeAvatarModal";

const Profile = ({
	avatarURL,
	userName,
	bio,
	faceBookLink,
	twitterLink,
	instagramLink,
}) => {
	const [modalShow, setModalShow] = React.useState(false);

	console.log(
		avatarURL,
		userName,
		bio,
		faceBookLink,
		twitterLink,
		instagramLink
	);
	return (
		<Fragment>
			<Container fluid className="pt-2">
				<Image
					className="comment-favicon"
					id="dashboard-profile-favicon"
					src={avatarURL}
					fluid
					roundedCircle
					thumbnail
					onClick={() => setModalShow(true)}></Image>
				<span id="dashboard-username">{userName}</span>
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

Profile.propTypes = {
	avatarURL: PropTypes.string.isRequired,
	userName: PropTypes.string.isRequired,
	bio: PropTypes.string,
	faceBookLink: PropTypes.string,
	twitterLink: PropTypes.string,
	instagramLink: PropTypes.string,
};

const mapStateToProps = (state) => ({
	avatarURL: state.auth.user.data.avatar,
	userName: state.auth.user.data.userName,
	bio: state.auth.user.data.bio,
	faceBookLink: state.auth.user.data.facebook,
	twitterLink: state.auth.user.data.twitter,
	instagramLink: state.auth.user.data.instagram,
});

export default connect(mapStateToProps)(Profile);
