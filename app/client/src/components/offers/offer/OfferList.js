import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import Spinner from "react-bootstrap/Spinner";

import SingleOffer from "./SingleOffer";

const filterOffer = (offer, queryString) => {
	return (
		offer.location.includes(queryString) ||
		offer.description.includes(queryString) ||
		moment(offer.date)
			.format("dddd, MMMM DD, YYYY")
			.includes(queryString) ||
		offer.otherInfo.includes(queryString)
	);
};

const OfferList = ({ offers, loading, queryString }) => {
	return loading ? (
		<Spinner animation="border" role="status">
			<span className="sr-only">Loading Offers...</span>
		</Spinner>
	) : (
		<Fragment>
			{offers
				.filter((offer) => filterOffer(offer, queryString))
				.map((offer) => (
					<SingleOffer key={offer.id} offer={offer}></SingleOffer>
				))}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	offers: state.offers.offers,
	loading: state.offers.loading,
	queryString: state.offers.queryString,
});

export default connect(mapStateToProps)(OfferList);
