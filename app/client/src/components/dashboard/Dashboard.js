import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { clearAlerts } from "../../actions/alert";

import Profile from "./Profile";
import MyEvents from "./MyEvents";
import MyOffers from "./MyOffers";

const DashBoard = () => {
	useEffect(() => {
		clearAlerts();
	}, []);

	return (
		<Tabs defaultActiveKey="profile" id="noanim-tab-example">
			<Tab eventKey="profile" title="Profile">
				<Profile></Profile>
			</Tab>
			<Tab eventKey="myEvents" title="My Events">
				<MyEvents></MyEvents>
			</Tab>
			<Tab eventKey="myOffer" title="My Offers">
				<MyOffers></MyOffers>
			</Tab>
		</Tabs>
	);
};
export default DashBoard;
