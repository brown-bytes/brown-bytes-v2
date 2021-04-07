import moment from "moment";
import React, { Fragment, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { getProfileById } from "../../../actions/profile";

const SingleComment = ({ comment }) => {
	const creatorUsername = comment.poster.username;

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [creatorProfile, setCreatorProfile] = useState({
		avatar: comment.poster.avatar,
		bio: null,
		facebook: null,
		twitter: null,
		instagram: null,
	});

	return (
		<Fragment>
			<Modal
				onShow={async () => {
					const profile = await getProfileById(comment.posterId);
					setCreatorProfile(profile);
				}}
				show={show}
				onHide={handleClose}
				centered>
				<Modal.Body>
					<Image
						className="profile-favicon"
						src={creatorProfile.avatar}
						alt="user avatar"
						fluid
						roundedCircle
						thumbnail></Image>

					<span className="profile-username">{creatorUsername}</span>
					<Row className="justify-content-center d-flex">
						{creatorProfile.facebook && (
							<a
								className="profile-social-button"
								href={creatorProfile.facebook}>
								<i className="fab fa-facebook"></i>
							</a>
						)}
						{creatorProfile.twitter && (
							<a
								className="profile-social-button"
								href={creatorProfile.twitter}>
								<i className="fab fa-twitter"></i>
							</a>
						)}
						{creatorProfile.instagram && (
							<a
								className="profile-social-button"
								href={creatorProfile.instagram}>
								<i className="fab fa-instagram"></i>
							</a>
						)}
					</Row>
					{creatorProfile.bio ? (
						<span className="profile-bio">
							{creatorProfile.bio}
						</span>
					) : (
						<span className="profile-bio">
							{creatorUsername} hasn't set a bio yet
						</span>
					)}
				</Modal.Body>
			</Modal>
			<Card
				className="offset-1 comment-card-overriding-bootstrap"
				border="secondary">
				<Card.Body className="py-1 px-1">
					{/* <Container fluid="true"> */}
					<Row noGutters="true">
						<Col
							xs={2}
							sm={2}
							md={2}
							lg={2}
							className="comment-favicon-container">
							<button
								className="post-creator-avatar-button"
								onClick={handleShow}>
								<Image
									className="comment-favicon"
									src={comment.poster.avatar}
									alt="image_logo"
									fluid
									roundedCircle
									thumbnail></Image>
							</button>
						</Col>
						<Col xs={10} sm={10} md={10} lg={10}>
							<p className="comment-head">
								<button
									className="post-creator-name-button"
									onClick={handleShow}>
									<span className="comment-user">
										{comment.poster.username}
									</span>
								</button>{" "}
								posted at{" "}
								<span className="comment-time">
									{moment(comment.createdAt).format(
										"HH:mm, DD/MM/YY"
									)}
								</span>
							</p>
							<p className="comment-content">
								{comment.content}{" "}
							</p>
						</Col>
					</Row>
					{/* </Container> */}
				</Card.Body>
			</Card>
		</Fragment>
	);
};

export default SingleComment;
