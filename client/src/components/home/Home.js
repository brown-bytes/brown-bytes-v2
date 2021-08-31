import React, { Fragment, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { clearAlerts } from "../../actions/alert";
import FutureEventList from "../calendar/event/FutureEventLIst";

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
							Free food is coming back to campus! Brown Bytes has
							evloved when there were no free food events - Here
							is a list of some new features:
						</p>
						<p className="home-text">
							· The new responsive UI works perfectly on screens
							with different sizes.
						</p>
						<p className="home-text">
							· Users can log in with their Google / Facebook
							accounts.
						</p>
						<p className="home-text">
							· Events can be filtered by their names, time,
							locations...
						</p>
						<p className="home-text">
							· Network with other hungary brunonians by making{" "}
							<Link to="/networking">posts</Link>.
						</p>

						{/* <p className="home-text">
							Check out the upcoming free food events below.
						</p>

						<p className="home-text">
							{" "}
							To filter events or add a new event, go to{" "}
							<Link to="/calendar">calendar</Link>
						</p> */}
					</Col>
					<Col lg={4}>
						<Image
							src="brownbytes-logo.png"
							alt="brownbytes_logo"
							fluid></Image>
					</Col>
				</Row>
				<FutureEventList></FutureEventList>
			</Container>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
