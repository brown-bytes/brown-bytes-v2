import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";

import { getCreatedOffers } from "../../../actions/offer";
import { startTimeComparator } from "../../../utils/startTimeComparator";
import SingleOffer from "./SingleOffer";

const CreatedOfferList = ({ offers, loading, getCreatedOffers }) => {
	useEffect(() => {
		getCreatedOffers();
	}, [getCreatedOffers]);

	return loading ? (
		<Spinner animation="border" role="status">
			<span className="sr-only">Loading Offers...</span>
		</Spinner>
	) : offers.length > 0 ? (
		<Fragment>
			{offers.sort(startTimeComparator).map((offer) => (
				<SingleOffer
					key={offer.id}
					offer={offer}
					placeDisplayed="dashboardOffers"></SingleOffer>
			))}
		</Fragment>
	) : (
		<Fragment>
			<p className="no-dashboard-offers-label">
				You have not created any offers
			</p>
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
