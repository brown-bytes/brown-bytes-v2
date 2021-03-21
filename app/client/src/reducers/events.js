import {
	GET_EVENTS,
	ADD_EVENT,
	DELETE_EVENT,
	UPDATE_WATCHES,
	ADD_EVENT_ERROR,
	ADD_COMMENT,
	REMOVE_COMMENT,
} from "../actions/types";

const initialState = {
	events: [
		{
			id: "1",
			title: "Jazz Night",
			location: "CIT",
			date: "2021-03-23",
			startTime: "9:00 PM",
			endTime: "10:00 PM",
			hostGroup: "GSC",
			whoCanCome: "Anyone",
			foodType: "Pizza",
			foodAmount: "Many",
			OtherInfo: "Welcome!",
			creator: "Amy",
			creatTime: "2021-03-21 21:21",
			watches: "6",
			comments: [
				{
					user: "Jack",
					content: "Cool!",
					postTime: "2021-03-21 21:48",
				},
			],
		},
		{
			id: "2",
			title: "Jazz Night",
			location: "CIT",
			date: "2021-03-23",
			startTime: "9:00 PM",
			endTime: "10:00 PM",
			hostGroup: "",
			whoCanCome: "Anyone",
			foodType: "Pizza",
			foodAmount: "",
			OtherInfo: "Welcome!",
			creator: "Amy",
			creatTime: "2021-03-21 21:21",
			watches: "6",
			comments: [
				{
					user: "Jack",
					content: "Cool!",
					postTime: "2021-03-21 21:48",
				},
			],
		},
	],
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
