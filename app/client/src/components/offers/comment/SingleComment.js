import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import Card from "react-bootstrap/Card";
import moment from "moment";

const SingleComment = ({ comment }) => {
	return (
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
						<Image
							className="comment-favicon"
							src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1433294230395992&height=50&width=50&ext=1619470276&hash=AeQi8E5iouSyWCU-gd8%22%20width:%2050%20__proto__:%20Object%20__proto__:%20Object%20signedRequest:%20%22hLZjDhdrzmvgt9ivIBmvGIQWOy-OVmMW-whyWTM-RY4.eyJ1c2VyX2lkIjoiMTQzMzI5NDIzMDM5NTk5MiIsImNvZGUiOiJBUURqMzJnVWpwOEtWQ3F3bHRiaFNZVVV0NXFRaFBTQXVCUnUwWlhFRnc3anNsUHN6NjVkc00zY2NWT2tMWXRqZ0RzMzc1aWwyaEZLcjRxNE9Kd1U2UWQyVjVOemxiMGRLVHN6VENlR1h2bW0zQ2ZhV0R6QjRhSHJ3UzE1V3hJcTVTM09aZldTcnB1UHdyZXJXVG93NkwxZENSQTNTaGFNNk4yY1lZa0JUaDBkdEtjZW90ME8wRG1ER196ZmRablVYRWxsZ25scmFadDRkUXNfdWV2Y2lxWFo0aFIwRnZrallnVWtGUlhNUFZXbWxIOERJZk5PUzcxOEJDdUZOZi0zU3gySHlJbzFrbXpSNEVCWUxRWm9sQUxxX3Z4ZkQyN2V0SnpjMUNBTEpyVHJpdHd2ZERFVWFMTmQ4ZEVrWEZfX2M1RGxIcEtXMjY0MjBSc3EtQWpKazQydE82N2V0UXVMR3F3ZXd0ZTFsTmZmTlp2bXR6U05aRUZKZHFIYlBnckdURVEiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTYxNjg3ODI3NX0"
							fluid
							roundedCircle
							thumbnail></Image>
					</Col>
					<Col xs={10} sm={10} md={10} lg={10}>
						<p className="comment-head">
							<span className="comment-user">{comment.user}</span>{" "}
							posted at{" "}
							<span className="comment-time">
								{moment(comment.postTime).format(
									"HH:mm, DD/MM/YY"
								)}
							</span>
						</p>
						<p className="comment-content">{comment.content} </p>
					</Col>
				</Row>
				{/* </Container> */}
			</Card.Body>
		</Card>
	);
};

export default SingleComment;
