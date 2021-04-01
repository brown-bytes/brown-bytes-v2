// import {
// 	GET_EVENTS,
// 	ADD_EVENT,
// 	DELETE_EVENT,
// 	UPDATE_WATCHES,
// 	ADD_EVENT_ERROR,
// 	ADD_COMMENT,
// 	REMOVE_COMMENT,
// } from "../actions/types";

const initialState = {
	// events: [
	// 	{
	// 		id: "1",
	// 		title: "Jazz Night",
	// 		location: "CIT",
	// 		date: "2021-03-26",
	// 		startTime: "09:00",
	// 		endTime: "23:59",
	// 		hostGroup: "GSC",
	// 		whoCanCome: "Anyone",
	// 		foodType: "Pizza",
	// 		foodAmount: "Many",
	// 		OtherInfo: "Welcome!",
	// 		creator: "eric",
	// 		creatTime: "2021-03-21 21:21",
	// 		watches: ["1", "2", "3"],
	// 		comments: [
	// 			{
	// 				id: 1,
	// 				user: "Jack",
	// 				content: "Cool!",
	// 				postTime: "2021-03-21 21:48",
	// 			},
	// 		],
	// 	},
	// 	{
	// 		id: "2",
	// 		title: "Jazz Night",
	// 		location: "CIT",
	// 		date: "2021-03-31",
	// 		startTime: "09:00",
	// 		endTime: "10:00",
	// 		hostGroup: "",
	// 		whoCanCome: "Anyone",
	// 		foodType: "Pizza",
	// 		foodAmount: "",
	// 		OtherInfo: "Welcome!",
	// 		creator: "Amy",
	// 		creatTime: "2021-03-21 21:21",
	// 		watches: ["1", "2", "3"],
	// 		comments: [
	// 			{
	// 				id: 1,
	// 				user: "Jack",
	// 				content: "Cool!",
	// 				postTime: "2021-03-21 21:48",
	// 			},
	// 		],
	// 	},
	// 	{
	// 		id: "3",
	// 		title: "Jazz Night",
	// 		location: "CIT",
	// 		date: "2021-03-21",
	// 		startTime: "00:01",
	// 		endTime: "23:59",
	// 		hostGroup: "",
	// 		whoCanCome: "Anyone",
	// 		foodType: "Pizza",
	// 		foodAmount: "",
	// 		OtherInfo: "Welcome!",
	// 		creator: "Amy",
	// 		creatTime: "2021-03-21 21:21",
	// 		watches: [],
	// 		comments: [
	// 			{
	// 				id: 1,
	// 				user: "Jack",
	// 				content: "Cool!",
	// 				postTime: "2021-03-21 21:48",
	// 			},
	// 			{
	// 				id: 2,
	// 				user: "Jack",
	// 				content:
	// 					"Cool!Y was added in 2.11.1. It will match any number, signed or unsigned. It is useful for years that are not 4 digits or are before the common era. It can be used for any year.",
	// 				postTime: "2021-03-21 21:48",
	// 			},
	// 		],
	// 	},
	// ],
	events: [],
	futureEvents: [],
	pastEvents: [],
	loading: false,
	queryString: "",
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		default:
			return state;
	}
}
