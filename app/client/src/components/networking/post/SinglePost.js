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
								<p className="post-content">{post.content} </p>
							</Col>
						</Row>
					</Card.Body>
				</Card>
				{/* <Accordion.Collapse eventKey="comment" className="comment-area">
					<CommentArea
						comments={post.comments}
						offerId={post.id}
						placeDisplayed={placeDisplayed}></CommentArea>
				</Accordion.Collapse> */}
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
	deleteOffer: PropTypes.func,
};

export default connect(mapStateToProps, {
	deletePost,
})(SinglePost);
