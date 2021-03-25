import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import OfferList from "../offers/offer/OfferList";

const MyOffers = () => {
	return (
		<Fragment>
			<p className="dashboard-my-events-heading">Offers I created:</p>
			<OfferList></OfferList>
		</Fragment>
	);
};

export default MyOffers;
