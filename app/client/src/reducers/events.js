/* eslint-disable import/no-anonymous-default-export */
import {
	CREATE_EVENT_SUCCESS,
	CREATE_EVENT_FAILED,
	GET_FUTURE_EVENTS,
	GET_PAST_EVENTS,
	GET_WATCHING_EVENTS,
	GET_CREATED_EVENTS,
	DELETE_EVENT_SUCCESS,
	DELETE_EVENT_FAILED,
	CHANGE_EVENT_QUERY_STRING,
	POST_EVENT_COMMENT,
	WATCH_EVENT,
	UNWATCH_EVENT,
} from "../actions/types";

const initialState = {
	futureEvents: [],
	pastEvents: [],
	watchingEvents: [],
	createdEvents: [],
	loadingFutureEvents: true,
	loadingPastEvents: true,
	loadingWatchingEvents: true,
	loadingCreatedEvents: true,
	numPastEventsFetched: 0,
	queryString: "",
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_FUTURE_EVENTS:
			return {
				...state,
				futureEvents: [...payload],
				loadingFutureEvents: false,
			};
		case GET_PAST_EVENTS:
			return {
				...state,
				pastEvents: [...state.pastEvents, ...payload],
				loadingPastEvents: false,
				numPastEventsFetched:
					state.numPastEventsFetched + payload.length,
			};
		case GET_WATCHING_EVENTS:
			return {
				...state,
				watchingEvents: [...payload],
				loadingWatchingEvents: false,
			};
		case GET_CREATED_EVENTS:
			return {
				...state,
				createdEvents: [...payload],
				loadingCreatedEvents: false,
			};
		case CHANGE_EVENT_QUERY_STRING:
			return {
				...state,
				queryString: payload,
			};
		case CREATE_EVENT_SUCCESS:
		case CREATE_EVENT_FAILED:
		case DELETE_EVENT_SUCCESS:
		case DELETE_EVENT_FAILED:
		case WATCH_EVENT:
		case UNWATCH_EVENT:
		case POST_EVENT_COMMENT:
		default:
			return state;
	}
}
