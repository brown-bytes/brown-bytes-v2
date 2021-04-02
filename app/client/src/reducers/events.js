/* eslint-disable import/no-anonymous-default-export */
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
} from "../actions/types";

const initialState = {
	futureEvents: [],
	pastEvents: [],
	loadingFuture: true,
	loadingPast: true,
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
				loadingFuture: false,
			};
		case GET_PAST_EVENTS:
			return {
				...state,
				pastEvents: [...state.pastEvents, ...payload],
				loadingPast: false,
				numPastEventsFetched:
					state.numPastEventsFetched + payload.length,
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
