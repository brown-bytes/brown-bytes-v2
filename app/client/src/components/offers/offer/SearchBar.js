import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import { changeQueryString } from "../../../actions/offer";

const SearchBar = ({ changeQueryString }) => {
	const [queryString, setQueryString] = useState("");

	const onChange = (e) => {
		setQueryString(e.target.value);
		changeQueryString(e.target.value);
	};

	const onSubmit = () => {
		changeQueryString(queryString);
	};

	return (
		<InputGroup className="mb-1">
			<FormControl
				className="mr-1"
				size="sm"
				placeholder="Offer location, time, or other keywords"
				aria-label="Offer search bar"
				onChange={onChange}
			/>
			<Button size="sm" onClick={onSubmit}>
				Search
			</Button>
		</InputGroup>
	);
};

SearchBar.propTypes = {
	changeQueryString: PropTypes.func,
};

export default connect(null, { changeQueryString })(SearchBar);
