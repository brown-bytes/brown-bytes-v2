/* eslint-disable import/no-anonymous-default-export */
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
} from "../actions/types";

const initialState = {
	futureEvents: [],
	pastEvents: [],
	watchingEvents: [],
	watchingEventIds: new Set(),
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
				watchingEventIds: new Set(payload.map((event) => event.id)),
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
		case WATCH_EVENT:
			return {
				...state,
				watchingEventIds: new Set([
					...state.watchingEventIds,
					Number(payload),
				]),
			};
		case UNWATCH_EVENT:
			return {
				...state,
				watchingEventIds: new Set(
					[...state.watchingEventIds].filter(
						(id) => id !== Number(payload)
					)
				),
			};
		case CREATE_EVENT_SUCCESS:
		case CREATE_EVENT_FAILED:
		case DELETE_EVENT_SUCCESS:
		case DELETE_EVENT_FAILED:
		case CREATE_EVENT_COMMENT:
		default:
			return state;
	}
}
