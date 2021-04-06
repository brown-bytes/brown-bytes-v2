import PropTypes from "prop-types";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { connect } from "react-redux";

import { searchPost } from "../../../actions/post";

const SearchBar = ({ searchPost }) => {
	const [queryString, setQueryString] = useState("");

	const onChange = (e) => {
		setQueryString(e.target.value);
	};

	const onSubmit = () => {
		// setQueryString("");
		searchPost(queryString);
	};

	return (
		<InputGroup className="mb-1">
			<FormControl
				className="mr-1"
				size="sm"
				placeholder="Creator, content or other keywords (at least 2 letters)"
				aria-label="networking post search bar"
				onChange={onChange}
				value={queryString}
			/>
			<Button size="sm" onClick={onSubmit}>
				Search
			</Button>
		</InputGroup>
	);
};

SearchBar.propTypes = {
	searchPost: PropTypes.func,
};

export default connect(null, { searchPost })(SearchBar);
