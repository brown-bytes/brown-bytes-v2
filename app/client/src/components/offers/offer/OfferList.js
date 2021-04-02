import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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

const startTimeComparator = (event1, event2) => {
	const date1 = event1.startTime;
	const date2 = event2.startTime;
	if (moment(date1).isBefore(date2)) {
		return 1;
	} else {
		return -1;
	}
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
				.sort(startTimeComparator)
				.map((offer) => (
					<SingleOffer
						key={offer.id}
						offer={offer}
						placeDisplayed="offersPage"></SingleOffer>
				))}
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
