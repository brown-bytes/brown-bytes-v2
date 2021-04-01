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
	events: [],
	futureEvents: [],
	pastEvents: [],
	loading: false,
	queryString: "",
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case CREATE_EVENT_SUCCESS:
		case CREATE_EVENT_FAILED:
		default:
			return state;
	}
}
