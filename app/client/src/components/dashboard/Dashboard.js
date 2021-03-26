import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { clearAlerts } from "../../actions/alert";

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
