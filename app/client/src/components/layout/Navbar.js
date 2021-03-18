import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = ({ isAuthenticated, logout }) => {
	const guestNavbar = (
		<Fragment>
			<Navbar bg="dark" expand="lg" variant="dark" fixed="top">
				<Navbar.Brand href="/">BB</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as={NavLink} to="/" exact>
							Home
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							activeClassName="active"
							to="/calendar">
							Calendar
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							activeClassName="active"
							to="/about">
							About
						</Nav.Link>
					</Nav>
					<Nav className="justify-content-end">
						<Nav.Item>
							<Nav.Link href="#home">Sign Up / Log In</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Fragment>
	);

	const authNavbar = (
		<Fragment>
			<Navbar bg="dark" expand="lg" variant="dark" fixed="top">
				<Navbar.Brand href="/">BB</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as={NavLink} to="/" exact>
							Home
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							activeClassName="active"
							to="/calendar">
							Calendar
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							activeClassName="active"
							to="/about">
							About
						</Nav.Link>
					</Nav>
					<Nav className="justify-content-end">
						<Nav.Item>
							<Nav.Link href="#home">Log Out</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Fragment>
	);

	return isAuthenticated ? authNavbar : guestNavbar;
};

NavBar.propTypes = {
	logout: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(NavBar);
