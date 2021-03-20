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
	dispatch(setAlert("hello", RED_ALERT));
	toTop();
	console.log("creating an event with ", info);
};
