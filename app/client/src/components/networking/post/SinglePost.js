import moment from "moment";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/esm/Accordion";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";

import { deletePost } from "../../../actions/post";
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

	return (
		<Fragment>
			<Accordion>
				<Card
					border="secondary"
					className="post-card-class-overriding-bootstrap">
					<Card.Body className="py-1 px-0">
						<Container fluid>
							<Row noGutters="true">
								<Col xs={2} sm={2} md={2} lg={2}>
									<Image
										className="comment-favicon"
										src={post.avatarURL}
										alt="user avatar"
										fluid
										roundedCircle
										thumbnail></Image>
								</Col>
								<Col xs={10} sm={10} md={10} lg={10}>
									<p className="post-head">
										<span className="post-user">
											{post.creator}
										</span>{" "}
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
