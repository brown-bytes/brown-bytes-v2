import { SEND_FEEDBACK, GET_FEEDBACKS } from "../actions/types";

const initialState = {
	feedbacks: [],
	loadingFeedbacks: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_FEEDBACKS:
			return {
				feedbacks: payload,
				loadingFeedbacks: false,
			};
		case SEND_FEEDBACK:
		default:
			return state;
	}
}
