import store from "../store";
import { CLEAR_ALERT, SET_ALERT } from "./types";

export const setAlert = (msg, alertType) => (dispatch) => {
	dispatch({
		type: SET_ALERT,
		payload: { msg, alertType },
	});
};

export const clearAlerts = () => {
	store.dispatch({
		type: CLEAR_ALERT,
		payload: null,
	});
};
