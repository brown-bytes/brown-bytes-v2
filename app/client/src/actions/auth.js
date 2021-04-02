import axios from "axios";

import { GREEN_ALERT, RED_ALERT } from "../components/layout/AlertTypes";
import toTop from "../utils/scrollToTop";
import setAuthToken from "../utils/setAuthToken";
import { clearAlerts, setAlert } from "./alert";
import { getCreatedEvents, getWatchingEvents } from "./event";
import { getCreatedOffers } from "./offer";
import {
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	REGISTER_EMAIL_SENT,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
} from "./types";

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	} else {
		dispatch({
			type: AUTH_ERROR,
		});
	}

	try {
		const res = await axios.get("profile");
		dispatch(getWatchingEvents());
		dispatch(getCreatedEvents());
		dispatch(getCreatedOffers());
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
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({ userName, email, password });

	try {
		await axios.post("users/signup", body, config);
		dispatch(
			setAlert(
				"Thank you for signing up, a verification link has been emailed to you.",
				GREEN_ALERT
			)
		);
		dispatch({
			type: REGISTER_EMAIL_SENT,
		});
		toTop();
	} catch (err) {
		const errorMessage = err.response.data.error;
		if (errorMessage === "users.email must be unique") {
			dispatch(
				setAlert(
					"There is already an account associated with this email.",
					RED_ALERT
				)
			);
		} else {
			dispatch(setAlert(errorMessage, RED_ALERT));
		}

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
		const res = await axios.post("users/login", body, config);
		dispatch(setAlert("Successfully logged in!", GREEN_ALERT));
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
		toTop();
	} catch (err) {
		const errorMessage = err.response.data.error;
		dispatch(setAlert(errorMessage, RED_ALERT));
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

export const logout = () => (dispatch) => {
	dispatch({
		type: LOGOUT,
	});
	dispatch(setAlert("Logged out", GREEN_ALERT));
	toTop();
};

export const resetPassword = (email) => (dispatch) => {
	dispatch({
		type: "reset",
	});
};

export const loginGoogle = (data) => async (dispatch) => {
	clearAlerts();
	const userName = data.profileObj.name;
	const email = data.profileObj.email + ".google";
	const avatarUrl = data.profileObj.imageUrl;
	// temororily use googleId as password to "sign up" on our sever, will be improved later
	const password = data.googleId;

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const trySignUp = JSON.stringify({
			userName,
			email,
			password,
			avatarUrl,
		});
		const res = await axios.post("users/signupsocial", trySignUp, config);
		dispatch(
			setAlert(
				"Successfully logged in with your google account!",
				GREEN_ALERT
			)
		);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
		toTop();
	} catch (err) {
		const tryLogIn = JSON.stringify({ email, password });

		try {
			const res = await axios.post("users/login", tryLogIn, config);
			dispatch(
				setAlert(
					"Successfully logged in with your google account!",
					GREEN_ALERT
				)
			);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});

			dispatch(loadUser());
			toTop();
		} catch (err) {
			const errorMessage = err.response.data.error;
			dispatch(setAlert(errorMessage, RED_ALERT));
			dispatch({
				type: LOGIN_FAIL,
			});
		}
	}
};

export const loginFacebook = (data) => async (dispatch) => {
	clearAlerts();
	const userName = data.name;
	const email = data.email + ".facebook";
	const avatarUrl = data.picture.data.url;
	// temororily use facebookId as password to "sign up" on our sever, will be improved later
	const password = data.id;

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const trySignUp = JSON.stringify({
			userName,
			email,
			password,
			avatarUrl,
		});
		const res = await axios.post("users/signupsocial", trySignUp, config);
		dispatch(
			setAlert(
				"Successfully logged in with your facebook account!",
				GREEN_ALERT
			)
		);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
		toTop();
	} catch (err) {
		const tryLogIn = JSON.stringify({ email, password });

		try {
			const res = await axios.post("users/login", tryLogIn, config);
			dispatch(
				setAlert(
					"Successfully logged in with your facebook account!",
					GREEN_ALERT
				)
			);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});

			dispatch(loadUser());
			toTop();
		} catch (err) {
			const errorMessage = err.response.data.error;
			dispatch(setAlert(errorMessage, RED_ALERT));
			dispatch({
				type: LOGIN_FAIL,
			});
		}
	}
};
