import axios from "axios";

import { GREEN_ALERT, RED_ALERT } from "../components/layout/AlertTypes";
import toTop from "../utils/scrollToTop";
import { clearAlerts, setAlert } from "./alert";
import { GET_FEEDBACKS, SEND_FEEDBACK } from "./types";

export const sendFeedBack = (posterName, email, feedback) => async (
	dispatch
) => {
	clearAlerts();
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({ posterName, email, feedback });

	try {
		await axios.post("/feedbacks", body, config);

		dispatch({
			type: SEND_FEEDBACK,
		});

		dispatch(setAlert("Thanks for your feedback!", GREEN_ALERT));
		toTop();
	} catch (err) {
		dispatch(setAlert("Failed to send you feedback.", RED_ALERT));
	}
	return;
};

export const getFeedBacks = () => async (dispatch) => {
	clearAlerts();
	try {
		const res = await axios.get("/feedbacks");
		const feedbacks = res.data.feedbacks;
		dispatch({
			type: GET_FEEDBACKS,
			payload: feedbacks,
		});
		dispatch(setAlert("Fetched user feedbacks from server", GREEN_ALERT));
	} catch (err) {
		console.log("fetching feedbacks failed");
	}
	return;
};
