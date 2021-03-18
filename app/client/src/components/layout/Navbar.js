import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

// import {
// 	Navbar,
// 	NavDropdown,
// 	Form,
// 	FormControl,
// 	Button,
// } from "react-bootstrap";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

const Nav = ({ isAuthenticated, logout }) => {
	const authLinks = (
		<ul>
			<li>
				<Link to="/profiles"> Developers </Link>
			</li>
			<li>
				<Link to="/posts"> Posts </Link>
			</li>
			<li>
				<Link to="/dashboard">
					<i className="fas fa-user"></i>{" "}
					<span className="hide-sm">Dashboard</span>
				</Link>
			</li>
			<li>
				<a onClick={logout} href="#!">
					<i className="fas fa-sign-out-alt"></i>{" "}
					<span className="hide-sm">Logout</span>
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<Link to="/profiles">Developers</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	);

	return (
		// <nav className="navbar bg-dark">
		// 	<h1>
		// 		<Link to="/">
		// 			<i className="fas fa-code"></i> DevConnector
		// 		</Link>
		// 	</h1>
		// 	{<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
		// </nav>

		// <div>
		// 	<Navbar bg="light" expand="lg">
		// 		<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
		// 		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		// 		<Navbar.Collapse id="basic-navbar-nav">
		// 			<Nav className="mr-auto">
		// 				<Nav.Link href="#home">Home</Nav.Link>
		// 				<Nav.Link href="#link">Link</Nav.Link>
		// 				<NavDropdown title="Dropdown" id="basic-nav-dropdown">
		// 					<NavDropdown.Item href="#action/3.1">
		// 						Action
		// 					</NavDropdown.Item>
		// 					<NavDropdown.Item href="#action/3.2">
		// 						Another action
		// 					</NavDropdown.Item>
		// 					<NavDropdown.Item href="#action/3.3">
		// 						Something
		// 					</NavDropdown.Item>
		// 					<NavDropdown.Divider />
		// 					<NavDropdown.Item href="#action/3.4">
		// 						Separated link
		// 					</NavDropdown.Item>
		// 				</NavDropdown>
		// 			</Nav>
		// 			<Form inline>
		// 				<FormControl
		// 					type="text"
		// 					placeholder="Search"
		// 					className="mr-sm-2"
		// 				/>
		// 				<Button variant="outline-success">Search</Button>
		// 			</Form>
		// 		</Navbar.Collapse>
		// 	</Navbar>
		// </div>

		<Fragment>
			{/* <h1 className="x-large text-primary">
				<i className="fas fa-exclamation-triangle"></i> Page Not Found
			</h1>
			<p className="large">Sorry, this page is not existttt</p> */}
			<Navbar bg="light" expand="lg">
				<Form inline>
					<FormControl
						type="text"
						placeholder="Search"
						className="mr-sm-2"
					/>
					<Button variant="success">Search</Button>
				</Form>
			</Navbar>
		</Fragment>
	);
};

Nav.propTypes = {
	logout: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Nav);
