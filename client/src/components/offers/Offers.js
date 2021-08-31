import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { clearAlerts } from "../../actions/alert";
import { getOffers } from "../../actions/offer";
import OfferList from "./offer/OfferList";
import SearchBar from "./offer/SearchBar";

const Offers = ({ isAuthenticated, getOffers }) => {
	useEffect(() => {
		clearAlerts();
		getOffers();
	}, [getOffers]);

	return (
		<Fragment>
			<p className="offers-heading1">Offers</p>
			<p className="offers-text">
				Offers is a way for you to publicize swipes or points that you
				would like to give away.
			</p>
			<p className="offers-heading2">Actions</p>
			{isAuthenticated ? (
				<Link to="/NewOffer">
					<Button variant="success">New Offer</Button>
				</Link>
			) : (
				<p className="offers-text">
					You are not logged in. Please log in to create new offers.
				</p>
			)}
			<hr></hr>
			<SearchBar></SearchBar>
			<OfferList></OfferList>
		</Fragment>
	);
};

Offers.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	getOffers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getOffers })(Offers);
