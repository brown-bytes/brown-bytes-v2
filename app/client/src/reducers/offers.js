/* eslint-disable import/no-anonymous-default-export */
import {
	CHANGE_OFFER_QUERY_STRING,
	CREATE_OFFER_FAILED,
	CREATE_OFFER_SUCCESS,
	DELETE_OFFER_FAILED,
	DELETE_OFFER_SUCCESS,
	GET_CREATED_OFFERS,
	GET_OFFERS,
	POST_OFFER_COMMENT,
} from "../actions/types";

const initialState = {
	offers: [],
	createdOffers: [],
	loading: true,
	loadingCreatedOffers: true,
	queryString: "",
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_OFFERS:
			return {
				...state,
				offers: [...payload],
				loading: false,
			};
		case GET_CREATED_OFFERS:
			return {
				...state,
				createdOffers: [...payload],
				loadingCreatedOffers: false,
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
};
