import React, { Fragment } from "react";

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
