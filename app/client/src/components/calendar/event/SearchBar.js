import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const SearchBar = () => {
	return (
		<InputGroup className="mb-1">
			<FormControl
				className="mr-1"
				size="sm"
				placeholder="Event title, location, or other keywords"
				aria-label="Event search bar"
			/>
			<Button size="sm">Search</Button>
		</InputGroup>
	);
};

export default connect()(SearchBar);
