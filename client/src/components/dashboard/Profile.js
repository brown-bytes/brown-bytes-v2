import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { connect } from "react-redux";

import { updateSocialLinks } from "../../actions/profile";
import ChangeAvatarModal from "./ChangeAvatarModal";

const Profile = ({
	avatarURL,
	userName,
	bio,
	faceBookLink,
	twitterLink,
	instagramLink,
	updateSocialLinks,
}) => {
	const [modalShow, setModalShow] = React.useState(false);

	const [formData, setFormData] = useState({
		formbio: bio,
		formfaceBookLink: faceBookLink,
		formtwitterLink: twitterLink,
		forminstagramLink: instagramLink,
	});

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		updateSocialLinks(formData);
	};

	return (
		<Fragment>
			<Container fluid className="pt-2">
				<Image
					className="comment-favicon"
					id="dashboard-profile-favicon"
					alt="dashboard-profile-image"
					src={avatarURL}
					fluid
					roundedCircle
					thumbnail
					onClick={() => setModalShow(true)}></Image>
				<span id="dashboard-username">{userName}</span>
				<Form onSubmit={(e) => onSubmit(e)}>
					<Form.Group>
						<Form.Label
							className="dashboard-profile-form-label"
							htmlFor="formbio">
							Bio
						</Form.Label>
						{bio ? (
							<Form.Control
								id="formbio"
								as="textarea"
								onChange={onChange}
								defaultValue={bio}
							/>
						) : (
							<Form.Control
								id="formbio"
								as="textarea"
								onChange={onChange}
								placeholder="A short bio of yourself"
							/>
						)}
					</Form.Group>

					<Form.Group>
						<Form.Label
							className="dashboard-profile-form-label"
							htmlFor="formfaceBookLink">
							Facebook
						</Form.Label>
						{faceBookLink ? (
							<Form.Control
								id="formfaceBookLink"
								onChange={onChange}
								defaultValue={faceBookLink}
							/>
						) : (
							<Form.Control
								id="formfaceBookLink"
								onChange={onChange}
								placeholder="Link to Your Facebook account"
							/>
						)}
					</Form.Group>
					<Form.Group>
						<Form.Label
							className="dashboard-profile-form-label"
							htmlFor="formtwitterLink">
							Twitter
						</Form.Label>
						{twitterLink ? (
							<Form.Control
								id="formtwitterLink"
								onChange={onChange}
								defaultValue={twitterLink}
							/>
						) : (
							<Form.Control
								id="formtwitterLink"
								onChange={onChange}
								placeholder="Link to Your Twitter account"
							/>
						)}
					</Form.Group>
					<Form.Group>
						<Form.Label
							className="dashboard-profile-form-label"
							htmlFor="forminstagramLink">
							Instagram
						</Form.Label>
						{instagramLink ? (
							<Form.Control
								id="forminstagramLink"
								onChange={onChange}
								defaultValue={instagramLink}
							/>
						) : (
							<Form.Control
								id="forminstagramLink"
								onChange={onChange}
								placeholder="Link to Your Instagram account"
							/>
						)}
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
	avatarURL: PropTypes.string,
	userName: PropTypes.string,
	bio: PropTypes.string,
	faceBookLink: PropTypes.string,
	twitterLink: PropTypes.string,
	instagramLink: PropTypes.string,
};

const mapStateToProps = (state) => {
	if (state.auth.isAuthenticated && state.auth.user && state.auth.user.data)
		return {
			avatarURL: state.auth.user.data.avatar,
			userName: state.auth.user.data.userName,
			bio: state.auth.user.data.bio,
			faceBookLink: state.auth.user.data.facebook,
			twitterLink: state.auth.user.data.twitter,
			instagramLink: state.auth.user.data.instagram,
		};
	else {
		return Object();
	}
};

export default connect(mapStateToProps, { updateSocialLinks })(Profile);
