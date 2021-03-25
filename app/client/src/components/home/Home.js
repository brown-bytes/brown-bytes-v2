import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { clearAlerts } from "../../actions/alert";
import EventList from "../calendar/event/EventList";
import Image from "react-bootstrap/Image";

const Home = ({ isAuthenticated }) => {
	useEffect(() => {
		clearAlerts();
	}, []);

	return (
		<Fragment>
			<Container fluid>
				<Row noGutters className="mb-2">
					<Col lg={8}>
						<p className="home-heading">Welcome to Brown Bytes</p>
						<p className="home-heading2">
							Brown Bytes has all the free food on campus just for
							you!
						</p>
						<p className="home-text">
							Check out the upcoming free food events below.
						</p>

						<p className="home-text">
							{" "}
							To filter events or add a new event, click{" "}
							<Link to="/calendar">calendar</Link>
						</p>
					</Col>
					<Col lg={4}>
						<Image src="brownbytes-logo.png" fluid></Image>
					</Col>
				</Row>
				<EventList></EventList>
			</Container>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
