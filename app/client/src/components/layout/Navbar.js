import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavBar = ({ isAuthenticated, logout }) => {
	const guestNavbar = (
		<Fragment>
			<Navbar
				className="py-0"
				bg="dark"
				expand="lg"
				variant="dark"
				fixed="top">
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
						<Nav.Link
							as={NavLink}
							activeClassName="active"
							to="/login">
							Sign Up / Log In
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Fragment>
	);

	const authNavbar = (
		<Fragment>
			<Navbar
				className="py-0"
				bg="dark"
				expand="lg"
				variant="dark"
				fixed="top">
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
						<Nav.Link
							as={NavLink}
							activeClassName="active"
							to="/profile">
							Profile
						</Nav.Link>
					</Nav>
					<Nav className="justify-content-end">
						<Nav.Item onClick={logout}>
							<Nav.Link>Log Out</Nav.Link>
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
	isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(NavBar);
