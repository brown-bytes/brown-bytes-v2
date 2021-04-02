import moment from "moment";
import axios from "axios";
import { setAlert, clearAlerts } from "./alert";
import { RED_ALERT, GREEN_ALERT } from "../components/layout/AlertTypes";
import toTop from "../utils/scrollToTop";
import {
	CREATE_EVENT_SUCCESS,
	CREATE_EVENT_FAILED,
	GET_FUTURE_EVENTS,
	GET_PAST_EVENTS,
	DELETE_EVENT_SUCCESS,
	DELETE_EVENT_FAILED,
	CHANGE_EVENT_QUERY_STRING,
	POST_EVENT_COMMENT,
	WATCH_EVENT,
	UNWATCH_EVENT,
} from "./types";

export const createEvent = (info) => async (dispatch) => {
	let date = info.date;
	let startTime = info.startTime;
	let endTime = info.endTime;

	clearAlerts();

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

	const title = info.title;
	const location = info.location;
	date = info.date;
	startTime = startDateTime;
	endTime = endDateTime;
	const hostGroup = info.hostGroup;
	const eventType = info.eventType;
	const whoCanCome = info.whoCanCome;
	const foodType = info.foodType;
	const foodAmount = info.foodAmount;
	const otherInfo = info.otherInfo;

	const body = JSON.stringify({
		title,
		location,
		date,
		startTime,
		endTime,
		hostGroup,
		eventType,
		whoCanCome,
		foodType,
		foodAmount,
		otherInfo,
	});

	try {
		await axios.post("events", body, config);
		dispatch(
			setAlert(
				"Successfully created an event. Check it out in calendar",
				GREEN_ALERT
			)
		);
		dispatch({
			type: CREATE_EVENT_SUCCESS,
		});
		toTop();
	} catch (err) {
		const errorMessage = err.response.data.error;
		dispatch(setAlert(errorMessage, RED_ALERT));
		dispatch({
			type: CREATE_EVENT_FAILED,
		});
	}
};

export const getFutureEvents = () => async (dispatch) => {
	try {
		const res = await axios.get("events");
		const events = Object.values(res.data.events);
		dispatch({
			type: GET_FUTURE_EVENTS,
			payload: events,
		});
	} catch (err) {
		if (err.response) {
			const errorMessage = err.response.data.error;
			dispatch(setAlert(errorMessage, RED_ALERT));
		}
	}

	return;
};

export const getPastEvents = (numPastEventFetched) => async (dispatch) => {
	try {
		const res = await axios.get("events/past", {
			params: {
				fetched: numPastEventFetched,
			},
		});
		const events = Object.values(res.data.events);

		dispatch({
			type: GET_PAST_EVENTS,
			payload: events,
		});
	} catch (err) {
		if (err.response) {
			const errorMessage = err.response.data.error;
			dispatch(setAlert(errorMessage, RED_ALERT));
		}
	}

	return;
};

export const watchEvent = (e) => async (dispatch) => {
	const eventId = e.target.id;
	try {
		await axios.post(`events/watch/${eventId}`);
		dispatch({
			type: WATCH_EVENT,
		});
		dispatch(getFutureEvents());
	} catch (err) {}
	return;
};
export const unwatchEvent = (e) => async (dispatch) => {
	const eventId = e.target.id;
	try {
		await axios.delete(`events/watch/${eventId}`);
		dispatch({
			type: UNWATCH_EVENT,
		});
		dispatch(getFutureEvents());
	} catch (err) {
		if (err.response) {
		}
	}
	return;
};
export const deleteEvent = (e) => async (dispatch) => {
	const eventId = e.target.id;
	try {
		await axios.delete(`events/${eventId}`);
		dispatch({
			type: DELETE_EVENT_SUCCESS,
		});
		dispatch(setAlert("Successfully deleted your event", GREEN_ALERT));
		dispatch(getFutureEvents());
		toTop();
		return;
	} catch (err) {
		if (err.response) {
			//const errorMessage = err.response.data.error;
			//dispatch(setAlert(errorMessage, RED_ALERT));
			dispatch({
				type: DELETE_EVENT_FAILED,
			});
		}
	}
	return;
};

export const postEventComment = (comment, eventId) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({
		content: comment,
	});

	try {
		await axios.post(`events/comment/${eventId}`, body, config);
		// dispatch(setAlert("Successfully posted a new comment", GREEN_ALERT));
		dispatch({
			type: POST_EVENT_COMMENT,
		});
		dispatch(getFutureEvents());
	} catch (err) {
		const errorMessage = err.response.data.error;
		dispatch(setAlert(errorMessage, RED_ALERT));
	}
	return;
};

export const changeQueryString = (newQueryString) => async (dispatch) => {
	dispatch({
		type: CHANGE_EVENT_QUERY_STRING,
		payload: newQueryString,
	});

	return;
};
