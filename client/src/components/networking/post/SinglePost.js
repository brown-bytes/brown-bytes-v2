import moment from "moment";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/esm/Accordion";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";

import { deletePost } from "../../../actions/post";
import { getProfileById } from "../../../actions/profile";
import CommentArea from "../comment/CommentArea";

const SinglePost = ({
	deletePost,
	isAuthenticated,
	authedUser,
	loadingUser,
	post,
	placeDisplayed,
}) => {
	const createdTime = moment(post.createdAt).format(
		"HH:mm A dddd, MMMM DD, YYYY"
	);
	const creatorUsername = post.creator;

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [creatorProfile, setCreatorProfile] = useState({
		avatar: post.avatarURL,
		bio: null,
		facebook: null,
		twitter: null,
		instagram: null,
	});

	return (
		<Fragment>
			<Modal
				onShow={async () => {
					const profile = await getProfileById(post.creatorId);
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
			<Accordion>
				<Card
					border="secondary"
					className="post-card-class-overriding-bootstrap">
					<Card.Body className="py-1 px-0">
						<Container fluid>
							<Row noGutters="true">
								<Col xs={2} sm={2} md={2} lg={2}>
									<button
										className="post-creator-avatar-button"
										onClick={handleShow}>
										<Image
											className="comment-favicon"
											src={post.avatarURL}
											alt="user avatar"
											fluid
											roundedCircle
											thumbnail></Image>
									</button>
								</Col>
								<Col xs={10} sm={10} md={10} lg={10}>
									<p className="post-head">
										<button
											className="post-creator-name-button"
											onClick={handleShow}>
											{post.creator}
										</button>{" "}
										created at{" "}
										<span className="post-time">
											{createdTime}
										</span>
									</p>
									<p className="post-content">
										{post.content}{" "}
									</p>
								</Col>
							</Row>
							<Row className="justify-content-end d-flex">
								{!loadingUser &&
									isAuthenticated &&
									authedUser &&
									(authedUser.userId === post.creatorId ||
										authedUser.isAdmin) && (
										<Button
											className="pr-3"
											variant="outline-link"
											size="lg"
											id={post.id}
											onClick={(e) => {
												deletePost(e, placeDisplayed);
											}}>
											<i
												id={post.id}
												className="fas fa-trash-alt"></i>
											<span className="sr-only">
												Close
											</span>
										</Button>
									)}
								{isAuthenticated ? (
									<Accordion.Toggle
										as={Button}
										className="px-2"
										variant="outline-link"
										eventKey="comment"
										size="lg">
										<i className="far fa-comment"></i>
										<span className="sr-only">
											Close
										</span>{" "}
										{post.comments.length > 0 && (
											<span> {post.comments.length}</span>
										)}
									</Accordion.Toggle>
								) : (
									post.comments.length > 0 && (
										<Accordion.Toggle
											as={Button}
											className="px-2"
											variant="outline-link"
											eventKey="comment"
											size="lg">
											<i className="far fa-comment"></i>
											<span className="sr-only">
												Close
											</span>{" "}
											<span> {post.comments.length}</span>
										</Accordion.Toggle>
									)
								)}
							</Row>
						</Container>
					</Card.Body>
				</Card>
				<Accordion.Collapse eventKey="comment" className="comment-area">
					<CommentArea
						comments={post.comments}
						postId={post.id}
						placeDisplayed={placeDisplayed}></CommentArea>
				</Accordion.Collapse>
			</Accordion>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	if (state.auth && state.auth.user) {
		return {
			isAuthenticated: state.auth.isAuthenticated,
			authedUser: state.auth.user.data,
			loadingUser: state.auth.loading,
		};
	} else {
		return {
			isAuthenticated: false,
			authedUser: null,
			loadingUser: null,
		};
	}
};

SinglePost.propTypes = {
	isAuthenticated: PropTypes.bool,
	authedUser: PropTypes.object,
	loadingUser: PropTypes.bool,
	deletePost: PropTypes.func,
};

export default connect(mapStateToProps, {
	deletePost,
})(SinglePost);
