import axios from "axios";
import moment from "moment";

import { GREEN_ALERT, RED_ALERT } from "../components/layout/AlertTypes";
import proxy from "../utils/proxy";
import toTop from "../utils/scrollToTop";
import { clearAlerts, setAlert } from "./alert";
import {
	CHANGE_OFFER_QUERY_STRING,
	CREATE_OFFER_FAILED,
	CREATE_OFFER_SUCCESS,
	DELETE_OFFER_FAILED,
	DELETE_OFFER_SUCCESS,
	GET_CREATED_OFFERS,
	GET_OFFERS,
	CREATE_OFFER_COMMENT,
} from "./types";

export const createOffer = (info) => async (dispatch) => {
	clearAlerts();
	let date = info.date;
	let startTime = info.startTime;
	let endTime = info.endTime;
	// input time from MacOS Safari will be like "13:22 PM", "AM" or "PM" cannot be parsed by moment.js
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
		const res = await axios.post(`${proxy}/offers`, body, config);

		dispatch(setAlert("Successfully created a new offer!", GREEN_ALERT));
		dispatch({
			type: CREATE_OFFER_SUCCESS,
			payload: res.data,
		});
		toTop();
	} catch (err) {
		const errorMessage = err.response.data.error;
		if (errorMessage) {
			dispatch(setAlert(errorMessage, RED_ALERT));
		}
		dispatch({
			type: CREATE_OFFER_FAILED,
		});
	}
};

export const getOffers = () => async (dispatch) => {
	try {
		const res = await axios.get(`${proxy}/offers`);
		const offers = Object.values(res.data.offers);
		dispatch({
			type: GET_OFFERS,
			payload: offers,
		});
	} catch (err) {}
	return;
};

export const getCreatedOffers = () => async (dispatch) => {
	try {
		const res = await axios.get(`${proxy}/offers/created`);
		const offers = Object.values(res.data.offers);
		dispatch({
			type: GET_CREATED_OFFERS,
			payload: offers,
		});
	} catch (err) {}
	return;
};

export const deleteOffer = (e, placeDisplayed) => async (dispatch) => {
	const offerId = e.target.id;
	try {
		await axios.delete(`${proxy}/offers/${offerId}`);
		dispatch({
			type: DELETE_OFFER_SUCCESS,
		});
		dispatch(setAlert("Successfully deleted the offer", GREEN_ALERT));
		switch (placeDisplayed) {
			case "offersPage":
				dispatch(getOffers());
				break;
			case "dashboardOffers":
				dispatch(getCreatedOffers());
				break;
			default:
		}
		toTop();
	} catch (err) {
		if (err.response) {
			const errorMessage = err.response.data.error;
			if (errorMessage) {
				dispatch(setAlert(errorMessage, RED_ALERT));
			}
			dispatch({
				type: DELETE_OFFER_FAILED,
			});
		}
	}
	return;
};

export const postOfferComment = (comment, offerId, placeDisplayed) => async (
	dispatch
) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({
		content: comment,
	});

	try {
		await axios.post(`${proxy}/offers/comment/${offerId}`, body, config);
		dispatch({
			type: CREATE_OFFER_COMMENT,
		});
		switch (placeDisplayed) {
			case "offersPage":
				dispatch(getOffers());
				break;
			case "dashboardOffers":
				dispatch(getCreatedOffers());
				break;
			default:
		}
	} catch (err) {
		const errorMessage = err.response.data.error;
		if (errorMessage) {
			dispatch(setAlert(errorMessage, RED_ALERT));
		}
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
