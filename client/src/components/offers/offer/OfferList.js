import moment from "moment";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";

import { startTimeComparator } from "../../../utils/startTimeComparator";
import SingleOffer from "./SingleOffer";

const filterOffer = (offer, queryString) => {
	return (
		offer.location.includes(queryString) ||
		offer.description.includes(queryString) ||
		moment(offer.startTime)
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
	) : offers.length > 0 ? (
		<Fragment>
			{offers
				.filter((offer) => filterOffer(offer, queryString))
				.sort(startTimeComparator)
				.map((offer) => (
					<SingleOffer
						key={offer.id}
						offer={offer}
						placeDisplayed="offersPage"></SingleOffer>
				))}
		</Fragment>
	) : (
		<Fragment>
			<p className="no-offers-label">
				There are no offers available for now.
			</p>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	offers: state.offers.offers,
	loading: state.offers.loading,
	queryString: state.offers.queryString,
});

OfferList.propTypes = {
	offers: PropTypes.array,
	loading: PropTypes.bool,
	queryString: PropTypes.string,
};

export default connect(mapStateToProps)(OfferList);
