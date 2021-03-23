import axios from "axios";
import moment from "moment";
import { setAlert, clearAlerts } from "./alert";
import { RED_ALERT, GREEN_ALERT } from "../components/layout/AlertTypes";
import toTop from "../utils/scrollToTop";

export const createOffer = (info) => async (dispatch) => {
	clearAlerts();
	console.log(info);
	// input time from MacOS Safari will be like "06:22 AM", "AM" or "PM" cannot be parsed by moment.js
	// So first remove "AM" or "PM" to ensure moment.js works
};
