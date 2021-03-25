import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

import { clearAlerts } from "../../actions/alert";
import SearchBar from "./offer/SearchBar";
import OfferList from "./offer/OfferList";

const Offers = ({ isAuthenticated }) => {
	useEffect(() => {
		clearAlerts();
	}, []);

	return (
		<Fragment>
			<p className="offers-heading1">Offers</p>
			<p className="offers-text">
				Offers are a way for you to publicize swipes or points that you
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

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Offers);
