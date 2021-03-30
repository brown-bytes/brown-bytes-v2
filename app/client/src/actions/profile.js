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

	console.log("body:", body);

	try {
		const res = await axios.patch("profile/", body, config);
		dispatch(setAlert("Successfully updated profile!", GREEN_ALERT));

		// dispatch({
		// 	type: LOGIN_SUCCESS,
		// 	payload: res.data,
		// });

		dispatch(loadUser());
	} catch (err) {
		const errorMessage = err.response.data.error;
		console.log(err.response);
		dispatch(setAlert(errorMessage, RED_ALERT));
		// dispatch({
		// 	type: LOGIN_FAIL,
		// });
	}
};
