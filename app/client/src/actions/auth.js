import axios from "axios";
import { setAlert, clearAlerts } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import { RED_ALERT, GREEN_ALERT } from "../components/layout/AlertTypes";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE,
} from "./types";

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get("profile/");
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

export const register = (userName, email, password, passwordRepeat) => async (
	dispatch
) => {
	clearAlerts();
	if (passwordRepeat !== password) {
		dispatch(setAlert("Passwords should match", RED_ALERT));
		return;
	}
	if (password.length < 8 || passwordRepeat < 8) {
		dispatch(
			setAlert("Password should have at least 8 characters", RED_ALERT)
		);
		return;
	}
	console.log("signing up with ", userName, email, password);
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({ userName, email, password });

	try {
		const res = await axios.post("user/signup", body, config);
		dispatch(
			setAlert(
				"Registeration succeeded! You are now logged in.",
				GREEN_ALERT
			)
		);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const errorMessage = err.response.data.error;
		dispatch(setAlert(errorMessage, RED_ALERT));
		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

export const login = (email, password) => async (dispatch) => {
	clearAlerts();
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post("user/login", body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
		dispatch(setAlert("Successfully logged in!", GREEN_ALERT));
	} catch (err) {
		const errorMessage = err.response.data.error;
		console.log(errorMessage);
		dispatch(setAlert(errorMessage, RED_ALERT));
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

export const logout = () => (dispatch) => {
	dispatch({
		type: CLEAR_PROFILE,
	});
	dispatch({
		type: LOGOUT,
	});
	dispatch(setAlert("Logged out", GREEN_ALERT));
};

export const resetPassword = (email) => (dispatch) => {
	console.log("resetting password for ", email);
	dispatch({
		type: "reset",
	});
};
