import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "react-bootstrap/Spinner";

import SingleOffer from "./SingleOffer";

import { getCreatedOffers } from "../../../actions/offer";

import { startTimeComparator } from "../../../utils/startTimeComparator";

const CreatedOfferList = ({ offers, loading, getCreatedOffers }) => {
	useEffect(() => {
		getCreatedOffers();
	}, [getCreatedOffers]);

	return loading ? (
		<Spinner animation="border" role="status">
			<span className="sr-only">Loading Offers...</span>
		</Spinner>
	) : (
		<Fragment>
			{offers.sort(startTimeComparator).map((offer) => (
				<SingleOffer
					key={offer.id}
					offer={offer}
					placeDisplayed="dashboardOffers"></SingleOffer>
			))}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	offers: state.offers.createdOffers,
	loading: state.offers.loadingCreatedOffers,
});

CreatedOfferList.propTypes = {
	offers: PropTypes.array,
	loading: PropTypes.bool,
	getCreatedOffers: PropTypes.func,
};

export default connect(mapStateToProps, { getCreatedOffers })(CreatedOfferList);
