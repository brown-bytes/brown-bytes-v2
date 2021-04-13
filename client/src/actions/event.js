import axios from "axios";
import moment from "moment";

import { GREEN_ALERT, RED_ALERT } from "../components/layout/AlertTypes";
import proxy from "../utils/proxy";
import toTop from "../utils/scrollToTop";
import { clearAlerts, setAlert } from "./alert";
import {
	CHANGE_EVENT_QUERY_STRING,
	CREATE_EVENT_FAILED,
	CREATE_EVENT_SUCCESS,
	DELETE_EVENT_FAILED,
	DELETE_EVENT_SUCCESS,
	GET_CREATED_EVENTS,
	GET_FUTURE_EVENTS,
	GET_PAST_EVENTS,
	GET_WATCHING_EVENTS,
	CREATE_EVENT_COMMENT,
	UNWATCH_EVENT,
	WATCH_EVENT,
} from "./types";

export const createEvent = (info) => async (dispatch) => {
	let date = info.date;
	let startTime = info.startTime;
	let endTime = info.endTime;

	clearAlerts();

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
		await axios.post(`${proxy}/events`, body, config);
		dispatch(
			setAlert(
				"Successfully created an event. You can check it out in calendar",
				GREEN_ALERT
			)
		);
		dispatch({
			type: CREATE_EVENT_SUCCESS,
		});
		toTop();
	} catch (err) {
		const errorMessage = err.response.data.error;
		if (errorMessage) {
			dispatch(setAlert(errorMessage, RED_ALERT));
		}
		dispatch({
			type: CREATE_EVENT_FAILED,
		});
	}
};

export const getFutureEvents = () => async (dispatch) => {
	try {
		const res = await axios.get(`${proxy}/events`);
		const events = Object.values(res.data.events);
		dispatch({
			type: GET_FUTURE_EVENTS,
			payload: events,
		});
	} catch (err) {}
	return;
};

export const getPastEvents = (numPastEventFetched) => async (dispatch) => {
	try {
		const res = await axios.get(`${proxy}/events/past`, {
			params: {
				fetched: numPastEventFetched,
			},
		});
		const events = Object.values(res.data.events);

		dispatch({
			type: GET_PAST_EVENTS,
			payload: events,
		});
	} catch (err) {}
	return;
};

export const getWatchingEvents = () => async (dispatch) => {
	try {
		const res = await axios.get(`${proxy}/events/watched`);
		const events = Object.values(res.data.events).map(
			(watchingEvent) => watchingEvent.event
		);
		dispatch({
			type: GET_WATCHING_EVENTS,
			payload: events,
		});
	} catch (err) {}
	return;
};

export const getCreatedEvents = () => async (dispatch) => {
	try {
		const res = await axios.get(`${proxy}/events/created`);
		let events = Object.values(res.data.events);
		dispatch({
			type: GET_CREATED_EVENTS,
			payload: events,
		});
	} catch (err) {}
	return;
};

export const watchEvent = (e, placeDisplayed) => async (dispatch) => {
	const eventId = e.target.id;
	try {
		await axios.post(`${proxy}/events/watch/${eventId}`);
		dispatch({
			type: WATCH_EVENT,
			payload: eventId,
		});
		switch (placeDisplayed) {
			case "homeAndCalendar":
				dispatch(getFutureEvents());
				break;
			case "dashboardEvents":
				dispatch(getWatchingEvents());
				dispatch(getCreatedEvents());
				break;
			default:
		}
	} catch (err) {
		console.log("You've already watched this event");
	}
	return;
};

export const unwatchEvent = (e, placeDisplayed) => async (dispatch) => {
	const eventId = e.target.id;
	try {
		await axios.delete(`${proxy}/events/watch/${eventId}`);
		dispatch({
			type: UNWATCH_EVENT,
			payload: eventId,
		});
		switch (placeDisplayed) {
			case "homeAndCalendar":
				dispatch(getFutureEvents());
				break;
			case "dashboardEvents":
				dispatch(getWatchingEvents());
				dispatch(getCreatedEvents());
				break;
			default:
		}
	} catch (err) {
		console.log("You haven't watched this event yet");
	}
	return;
};

export const deleteEvent = (e, placeDisplayed) => async (dispatch) => {
	const eventId = e.target.id;
	try {
		await axios.delete(`${proxy}/events/${eventId}`);
		dispatch({
			type: DELETE_EVENT_SUCCESS,
		});
		dispatch(setAlert("Successfully deleted the event", GREEN_ALERT));
		switch (placeDisplayed) {
			case "homeAndCalendar":
				dispatch(getFutureEvents());
				break;
			case "dashboardEvents":
				dispatch(getWatchingEvents());
				dispatch(getCreatedEvents());
				break;
			default:
		}
		toTop();
		return;
	} catch (err) {
		if (err.response) {
			dispatch({
				type: DELETE_EVENT_FAILED,
			});
		}
	}
	return;
};

export const postEventComment = (comment, eventId, placeDisplayed) => async (
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
		await axios.post(`${proxy}/events/comment/${eventId}`, body, config);
		dispatch({
			type: CREATE_EVENT_COMMENT,
		});
		switch (placeDisplayed) {
			case "homeAndCalendar":
				dispatch(getFutureEvents());
				break;
			case "dashboardEvents":
				dispatch(getWatchingEvents());
				dispatch(getCreatedEvents());
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
		type: CHANGE_EVENT_QUERY_STRING,
		payload: newQueryString,
	});
	return;
};
