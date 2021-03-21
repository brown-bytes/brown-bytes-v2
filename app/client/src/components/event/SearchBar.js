import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const SearchBar = () => {
	return (
		<InputGroup className="mb-3">
			<FormControl
				placeholder="Search event title, location, time, or other keywords"
				aria-label="Event search bar"
			/>
			<InputGroup.Append>
				<Button>Search</Button>
			</InputGroup.Append>
		</InputGroup>
	);
};

export default connect()(SearchBar);
