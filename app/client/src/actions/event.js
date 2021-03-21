import axios from "axios";
import moment from "moment";
import { setAlert } from "./alert";
import { RED_ALERT, GREEN_ALERT } from "../components/layout/AlertTypes";
import toTop from "../utils/scrollToTop";

export const createEvent = (info) => async (dispatch) => {
	const {
		title,
		location,
		date,
		startTime,
		endTime,
		eventType,
		hostGroup,
		whoCanCome,
		foodType,
		foodAmount,
		otherInfo,
	} = info;

	if (!moment().isValid(date)) {
		dispatch(setAlert("Invalid event date", RED_ALERT));
		toTop();
	}

	if (!moment().isValid(startTime)) {
		dispatch(setAlert("Invalid event start time", RED_ALERT));
		toTop();
	}

	if (!moment().isValid(endTime)) {
		dispatch(setAlert("Invalid event end time", RED_ALERT));
		toTop();
	}

	dispatch(setAlert("Successfully created an event", GREEN_ALERT));
	toTop();
	console.log("creating an event with ", info);
};
