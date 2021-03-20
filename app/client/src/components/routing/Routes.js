import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Alert from "../layout/Alert";

import Home from "../home/Home";
import Calendar from "../calendar/Calendar";
import About from "../about/About";
import Login from "../login/Login";
import Profile from "../profile/Profile";
import ForgotPassword from "../login/ForgotPassword";
import SignUp from "../login/SignUp";
import Team from "../team/Team";
import NewEvent from "../event/NewEvent";

const Routes = () => {
	return (
		<section className="container">
			<Alert />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/calendar" component={Calendar} />
				<Route exact path="/about" component={About} />
				<Route exact path="/profile" component={Profile} />
				<Route exact path="/login" component={Login} />
				<Route
					exact
					path="/forgotpassword"
					component={ForgotPassword}
				/>
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/team" component={Team} />

				<PrivateRoute exact path="/newevent" component={NewEvent} />
			</Switch>
		</section>
	);
};

export default Routes;
