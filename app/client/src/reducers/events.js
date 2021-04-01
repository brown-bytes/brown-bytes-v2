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
	loadingPast: false,
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

		case CREATE_EVENT_SUCCESS:
		case CREATE_EVENT_FAILED:
		default:
			return state;
	}
}
