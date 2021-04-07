import { SkipNavContent, SkipNavLink } from "@reach/skip-nav";
import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { loadUser } from "./actions/auth";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routing/Routes";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
import "@reach/skip-nav/styles.css";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<SkipNavLink contentId="mainContent">
						Skip To Main Content
					</SkipNavLink>
					<Navbar />
					<SkipNavContent id="mainContent">
						<Switch>
							<Route component={Routes} />
						</Switch>
						<Footer />
					</SkipNavContent>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
