import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import events from "./events";
import feedback from "./feedback";
import offers from "./offers";
import post from "./post";

import "bootstrap/dist/css/bootstrap.css";

export default combineReducers({
	alert,
	auth,
	events,
	offers,
	post,
	feedback,
});
