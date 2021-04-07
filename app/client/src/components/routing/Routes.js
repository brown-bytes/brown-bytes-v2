import React from "react";
import { Route, Switch } from "react-router-dom";

import About from "../about/About";
import Calendar from "../calendar/Calendar";
import NewEvent from "../calendar/event/NewEvent";
import DashBoard from "../dashboard/Dashboard";
import Home from "../home/Home";
import Alert from "../layout/Alert";
import NotFound from "../layout/NotFound";
import ForgotPassword from "../login/ForgotPassword";
import Login from "../login/Login";
import ResetPassword from "../login/ResetPassword";
import SignUp from "../login/SignUp";
import NewOffer from "../offers/offer/NewOffer";
import Offers from "../offers/Offers";
import Networking from "../networking/Networking";
import Team from "../team/Team";
import FeedBack from "../feedback/FeedBack";
import NotLoggedInRoute from "./NotLoggedInRoute";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const Routes = () => {
	return (
		<section className="container">
			<Alert />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/calendar" component={Calendar} />
				<Route exact path="/offers" component={Offers} />
				<Route exact path="/networking" component={Networking} />
				<Route exact path="/about" component={About} />
				<PrivateRoute exact path="/dashboard" component={DashBoard} />
				<AdminRoute exact path="/feedbacks" component={FeedBack} />

				<NotLoggedInRoute exact path="/login" component={Login} />
				<Route
					exact
					path="/forgotpassword"
					component={ForgotPassword}
				/>
				<NotLoggedInRoute exact path="/signup" component={SignUp} />
				<Route exact path="/team" component={Team} />

				<PrivateRoute exact path="/NewEvent" component={NewEvent} />
				<PrivateRoute exact path="/NewOffer" component={NewOffer} />

				<Route exact path="/resetpassword" component={ResetPassword} />
				<Route component={NotFound} />
			</Switch>
		</section>
	);
};

export default Routes;
