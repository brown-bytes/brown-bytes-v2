import moment from "moment";
import axios from "axios";
import { setAlert, clearAlerts } from "./alert";
import toTop from "../utils/scrollToTop";
import { RED_ALERT, GREEN_ALERT } from "../components/layout/AlertTypes";
import {
	CREATE_OFFER_SUCCESS,
	CREATE_OFFER_FAILED,
	GET_OFFERS,
	GET_CREATED_OFFERS,
	DELETE_OFFER_SUCCESS,
	DELETE_OFFER_FAILED,
	CHANGE_OFFER_QUERY_STRING,
	POST_OFFER_COMMENT,
} from "./types";

export const createOffer = (info) => async (dispatch) => {
	clearAlerts();
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
	try {
		const res = await axios.get("offers");
		const offers = Object.values(res.data.offers);
		dispatch({
			type: GET_OFFERS,
			payload: offers,
		});
	} catch (err) {
		if (err.response) {
		}
	}
	return;
};

export const getCreatedOffers = () => async (dispatch) => {
	try {
		const res = await axios.get("offers/created");
		const offers = Object.values(res.data.offers);
		dispatch({
			type: GET_CREATED_OFFERS,
			payload: offers,
		});
	} catch (err) {
		if (err.response) {
		}
	}
	return;
};

export const deleteOffer = (e) => async (dispatch) => {
	const offerId = e.target.id;
	try {
		await axios.delete(`offers/${offerId}`);
		dispatch({
			type: DELETE_OFFER_SUCCESS,
		});
		dispatch(setAlert("Successfully deleted your offer", GREEN_ALERT));
		dispatch(getOffers());
		toTop();
	} catch (err) {
		if (err.response) {
			const errorMessage = err.response.data.error;
			dispatch(setAlert(errorMessage, RED_ALERT));
			dispatch({
				type: DELETE_OFFER_FAILED,
			});
		}
	}

	return;
};

export const postOfferComment = (comment, offerId) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({
		content: comment,
	});

	try {
		await axios.post(`offers/comment/${offerId}`, body, config);
		// dispatch(setAlert("Successfully posted a new comment", GREEN_ALERT));
		dispatch({
			type: POST_OFFER_COMMENT,
		});
		dispatch(getOffers());
	} catch (err) {
		const errorMessage = err.response.data.error;
		dispatch(setAlert(errorMessage, RED_ALERT));
	}
	return;
};

export const changeQueryString = (newQueryString) => async (dispatch) => {
	dispatch({
		type: CHANGE_OFFER_QUERY_STRING,
		payload: newQueryString,
	});

	return;
};
