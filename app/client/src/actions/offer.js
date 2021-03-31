import { clearAlerts } from "./alert";

export const createOffer = (info) => async (dispatch) => {
	clearAlerts();
	console.log(info);
	// input time from MacOS Safari will be like "06:22 AM", "AM" or "PM" cannot be parsed by moment.js
	// So first remove "AM" or "PM" to ensure moment.js works
};

export const getOffers = () => {
	return;
};

export const deleteOffer = () => {
	return;
};
export const postComment = () => {
	return;
};
