import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const MyEvents = () => {
	return (
		<Fragment>
			<p className="dashboard-my-events-heading">Events I am watching:</p>

			<p className="dashboard-my-events-heading">Events I Created:</p>
		</Fragment>
	);
};

export default MyEvents;
