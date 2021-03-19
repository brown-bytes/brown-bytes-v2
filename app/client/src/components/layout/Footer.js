import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Moment from "react-moment";

const Footer = () => {
	const date_now = Date.now();
	return (
		<Fragment>
			<Container>
				<hr></hr>
				<Row>
					<Col sm={10}>
						Copyright © Brown Bytes{" "}
						<Moment format="YYYY">{date_now}</Moment>
					</Col>
					<Col sm={2}>
						Join the{" "}
						<Link to="/signup">
							<a>team</a>
						</Link>
						.
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Footer;
