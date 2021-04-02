import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import Spinner from "react-bootstrap/Spinner";

import SingleOffer from "./SingleOffer";

import { getCreatedOffers } from "../../../actions/offer";

const startTimeComparator = (offer1, offer2) => {
	const date1 = offer1.startTime;
	const date2 = offer2.startTime;
	if (moment(date1).isBefore(date2)) {
		return 1;
	} else {
		return -1;
	}
};

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
				<SingleOffer key={offer.id} offer={offer}></SingleOffer>
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
