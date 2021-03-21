import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
// import profile from "./profile";
// import post from "./post";
import events from "./events";

import "bootstrap/dist/css/bootstrap.css";

export default combineReducers({
	alert,
	auth,
	//	profile,
	//	post,
	events,
});
