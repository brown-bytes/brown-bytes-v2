import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import events from "./events";
import feedbacks from "./feedbacks";
import offers from "./offers";

import "bootstrap/dist/css/bootstrap.css";

export default combineReducers({
	alert,
	auth,
	events,
	offers,
	feedbacks,
});
