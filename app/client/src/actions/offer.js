import moment from "moment";
import axios from "axios";
import { setAlert, clearAlerts } from "./alert";
import toTop from "../utils/scrollToTop";
import setAuthToken from "../utils/setAuthToken";
import { RED_ALERT, GREEN_ALERT } from "../components/layout/AlertTypes";
import {
	CREATE_OFFER_SUCCESS,
	CREATE_OFFER_FAILED,
	GET_OFFERS,
	DELETE_OFFER,
} from "./types";

export const createOffer = (info) => async (dispatch) => {
	clearAlerts();
	console.log(info);
	let date = info.date;
	let startTime = info.startTime;
	let endTime = info.endTime;
	// input time from MacOS Safari will be like "06:22 AM", "AM" or "PM" cannot be parsed by moment.js
	// So first remove "AM" or "PM" to ensure moment.js works
	if (startTime.includes("AM") || startTime.includes("PM")) {
		startTime = startTime.slice(0, 5);
	}

	if (endTime.includes("AM") || endTime.includes("PM")) {
		endTime = endTime.slice(0, 5);
	}

	if (!moment(date).isValid()) {
		dispatch(setAlert("Invalid event date", RED_ALERT));
		toTop();
		return;
	}

	const startDateTime = date + " " + startTime;
	const endDateTime = date + " " + endTime;
	if (!moment(startDateTime).isValid()) {
		dispatch(setAlert("Invalid event start time", RED_ALERT));
		toTop();
		return;
	}

	if (!moment(endDateTime).isValid()) {
		dispatch(setAlert("Invalid event end time", RED_ALERT));
		toTop();
		return;
	}

	if (moment(startDateTime).isSameOrBefore(Date.now())) {
		dispatch(
			setAlert("Please enter future start date and time", RED_ALERT)
		);
		toTop();
		return;
	}

	if (moment(endDateTime).isSameOrBefore(startDateTime)) {
		dispatch(
			setAlert("End time should be later than start time", RED_ALERT)
		);
		toTop();
		return;
	}

	console.log(startDateTime, endDateTime);

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const anonymous = info.anonymous;
	const description = info.description;
	const location = info.location;
	const otherInfo = info.otherInfo;
	startTime = startDateTime;
	endTime = endDateTime;

	const body = JSON.stringify({
		anonymous,
		description,
		location,
		otherInfo,
		date,
		startTime,
		endTime,
	});

	try {
		const res = await axios.post("offers", body, config);
		dispatch(setAlert("Successfully created a new offer!", GREEN_ALERT));
		dispatch({
			type: CREATE_OFFER_SUCCESS,
			payload: res.data,
		});
		toTop();
	} catch (err) {
		const errorMessage = err.response.data.error;
		dispatch(setAlert(errorMessage, RED_ALERT));
		dispatch({
			type: CREATE_OFFER_FAILED,
		});
	}
};

export const getOffers = () => async (dispatch) => {
	console.log("getting offers");

	try {
		const res = await axios.get("offers");
		const offers = Object.values(res.data.offers);
		//offers = Object.values(offers);
		console.log(offers.length);
		console.log(typeof offers);
		dispatch({
			type: GET_OFFERS,
			payload: offers,
		});
	} catch (err) {
		if (err.response) {
			const errorMessage = err.response.data.error;
			dispatch(setAlert(errorMessage, RED_ALERT));
		}
	}

	return;
};

export const deleteOffer = () => {
	return;
};

export const postComment = () => {
	return;
};
