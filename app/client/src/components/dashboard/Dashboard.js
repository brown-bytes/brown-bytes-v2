import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import MyEvents from "./MyEvents";
import MyOffers from "./MyOffers";
import Profile from "./Profile";

const DashBoard = () => {
	return (
		<Tabs defaultActiveKey="profile" id="noanim-tab-example">
			<Tab eventKey="profile" title="Profile">
				<Profile></Profile>
			</Tab>
			<Tab eventKey="myEvents" title="My Events" className="pl-2">
				<MyEvents></MyEvents>
			</Tab>
			<Tab eventKey="myOffer" title="My Offers">
				<MyOffers></MyOffers>
			</Tab>
		</Tabs>
	);
};
export default DashBoard;
