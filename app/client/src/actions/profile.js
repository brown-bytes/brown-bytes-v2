import axios from "axios";
import { RED_ALERT, GREEN_ALERT } from "../components/layout/AlertTypes";
import { setAlert, clearAlerts } from "./alert";
import { loadUser } from "./auth";
import {
	UPDATE_AVATAR_SUCCESS,
	UPDATE_AVATAR_FAILED,
	UPDATE_SOCIAL_LINKS_SUCCESS,
	UPDATE_SOCIAL_LINKS_FAILED,
	AUTH_ERROR,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

export const updateSocialLinks = (data) => async (dispatch) => {
	clearAlerts();

	const bio = data.formbio;
	const facebook = data.formfaceBookLink;
	const twitter = data.formtwitterLink;
	const instagram = data.forminstagramLink;

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	} else {
		dispatch({
			type: AUTH_ERROR,
		});
		return;
	}

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({
		bio,
		facebook,
		twitter,
		instagram,
	});

	try {
		await axios.patch("profile/", body, config);
		dispatch(setAlert("Successfully updated profile!", GREEN_ALERT));
		dispatch(loadUser());
		dispatch({
			type: UPDATE_SOCIAL_LINKS_SUCCESS,
		});
	} catch (err) {
		const errorMessage = err.response.data.error;
		dispatch(setAlert(errorMessage, RED_ALERT));
		dispatch({
			type: UPDATE_SOCIAL_LINKS_FAILED,
		});
	}
};

export const updateAvatar = (image) => async (dispatch) => {
	clearAlerts();
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	} else {
		dispatch({
			type: AUTH_ERROR,
		});
		return;
	}
	const body = image;
	try {
		await axios.post("profile/avatar", body);
		dispatch(
			setAlert(
				"Successfully updated avatar! Reload this page to see your new avatar.",
				GREEN_ALERT
			)
		);
		dispatch(loadUser());
		dispatch({
			type: UPDATE_AVATAR_SUCCESS,
		});
	} catch (err) {
		const errorMessage = err.response.data.error;
		dispatch(setAlert(errorMessage, RED_ALERT));
		dispatch({
			type: UPDATE_AVATAR_FAILED,
		});
	}
};
