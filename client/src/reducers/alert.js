import { SET_ALERT, CLEAR_ALERT } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_ALERT:
			return [...state, payload];
		case CLEAR_ALERT:
			return [];
		default:
			return state;
	}
}
