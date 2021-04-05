import moment from "moment";
import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";

import { clearAlerts } from "../../actions/alert";
import { getFeedBacks } from "../../actions/feedback";

const Team = ({ getFeedBacks, feedbacks }) => {
	useEffect(() => {
		clearAlerts();
		getFeedBacks();
	}, [getFeedBacks]);

	return (
		<Fragment>
			<h1>User Feedbacks</h1>
			<Table striped bordered hoversize="sm">
				<thead>
					<tr>
						<th>#</th>

						<th>Name</th>
						<th>Email</th>
						<th>Created Time</th>
						<th>Content</th>
					</tr>
				</thead>
				<tbody>
					{feedbacks.map((feedback, index) => (
						<tr>
							<td>{index}</td>
							<td>{feedback.posterName}</td>
							<td>{feedback.email}</td>
							<td>
								{moment(feedback.createdAt).format(
									"dddd, MMMM DD, YYYY"
								)}
							</td>
							<td>{feedback.feedback}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Fragment>
	);
};

Team.propTypes = {
	getFeedBack: PropTypes.func,
	feedbacks: PropTypes.array,
};

const mapStateToProps = (state) => ({
	feedbacks: state.feedbacks.feedbacks,
});

export default connect(mapStateToProps, { getFeedBacks })(Team);
