import {
	CREATE_OFFER_SUCCESS,
	CREATE_OFFER_FAILED,
	GET_OFFERS,
	CHANGE_OFFER_QUERY_STRING,
	DELETE_OFFER_SUCCESS,
	DELETE_OFFER_FAILED,
	POST_OFFER_COMMENT,
} from "../actions/types";

const initialState = {
	offers: [],
	loading: true,
	queryString: "",
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_OFFERS:
			return {
				...state,
				offers: [...payload],
				loading: false,
			};
		case CHANGE_OFFER_QUERY_STRING:
			return {
				...state,
				queryString: payload,
			};
		case POST_OFFER_COMMENT:
		case CREATE_OFFER_SUCCESS:
		case CREATE_OFFER_FAILED:
		case DELETE_OFFER_SUCCESS:
		case DELETE_OFFER_FAILED:
		default:
			return state;
	}
}
