import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Profile from "./Profile";
import MyEvents from "./MyEvents";
import MyOffers from "./MyOffers";

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
