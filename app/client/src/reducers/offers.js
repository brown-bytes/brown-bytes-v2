import {
	CREATE_OFFER_SUCCESS,
	CREATE_OFFER_FAILED,
	GET_OFFERS,
	DELETE_OFFER,
} from "../actions/types";

const initialState = {
	offers: [
		// {
		// 	id: "1",
		// 	description: "Give out a swipe",
		// 	location: "Anywhere",
		// 	date: "2021-03-23",
		// 	startTime: "09:00",
		// 	endTime: "10:00",
		// 	otherInfo: "Welcome!",
		// 	creator: "eric",
		// 	creatTime: "2021-03-21 21:21",
		// 	comments: [
		// 		{
		// 			id: 1,
		// 			user: "Jack",
		// 			content: "Cool!",
		// 			postTime: "2021-03-21 21:48",
		// 		},
		// 	],
		// },
		// {
		// 	id: "2",
		// 	description: "Give out a swipe",
		// 	location: "Anywhere",
		// 	date: "2021-03-23",
		// 	startTime: "09:00",
		// 	endTime: "10:00",
		// 	OtherInfo: "Welcome!",
		// 	creator: "amy",
		// 	creatTime: "2021-03-21 21:21",
		// 	comments: [
		// 		{
		// 			id: 1,
		// 			user: "Jack",
		// 			content: "Cool!",
		// 			postTime: "2021-03-21 21:48",
		// 		},
		// 	],
		// },
	],
	//offers: [],
	loading: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_OFFERS:
			return {
				...state,
				offers: [...payload],
			};
		default:
			return state;
	}
}
