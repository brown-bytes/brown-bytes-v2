import PropTypes from "prop-types";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { connect } from "react-redux";

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
