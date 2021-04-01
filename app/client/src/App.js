import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./components/routing/Routes";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";
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
