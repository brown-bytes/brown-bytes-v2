import React, { Fragment } from "react";

import CreatedOfferList from "../offers/offer/CreatedOfferList";

const MyOffers = () => {
	return (
		<Fragment>
			<p className="dashboard-my-events-heading">Offers I created:</p>
			<CreatedOfferList></CreatedOfferList>
		</Fragment>
	);
};

export default MyOffers;
