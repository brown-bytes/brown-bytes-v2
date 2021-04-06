import axios from "axios";
import moment from "moment";

import { GREEN_ALERT, RED_ALERT } from "../components/layout/AlertTypes";
import toTop from "../utils/scrollToTop";
import { clearAlerts, setAlert } from "./alert";
import { getCreatedOffers } from "./offer";
import {
	CHANGE_POST_QUERY_STRING,
	CREATE_POST_COMMENT,
	CREATE_POST_FAILED,
	CREATE_POST_SUCCESS,
	DELETE_POST_FAILED,
	DELETE_POST_SUCCESS,
	GET_CREATED_POSTS,
	GET_POSTS,
	SEARCH_POSTS,
} from "./types";

export const createPost = (content) => async (dispatch) => {
	clearAlerts();

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({
		content,
	});

	try {
		await axios.post("posts", body, config);
		dispatch(setAlert("Successfully created a new post!", GREEN_ALERT));
		const res = await axios.get("posts", {
			params: {
				fetched: 0,
			},
		});
		dispatch({
			type: CREATE_POST_SUCCESS,
			payload: res.data.posts,
		});
	} catch (err) {
		if (err.response) {
			const errorMessage = err.response.data.error;
			if (errorMessage) {
				dispatch(setAlert(errorMessage, RED_ALERT));
			}
		}
		dispatch({
			type: CREATE_POST_FAILED,
		});
	}
};

export const getPosts = (numFetchedPosts) => async (dispatch) => {
	try {
		const res = await axios.get("posts", {
			params: {
				fetched: numFetchedPosts,
			},
		});
		console.log("get posts:", res.data.posts);
		dispatch({
			type: GET_POSTS,
			payload: res.data.posts,
		});
	} catch (err) {
		if (err.response) {
			const errorMessage = err.response.data.error;
			if (errorMessage) {
				dispatch(setAlert(errorMessage, RED_ALERT));
			}
		}
	}
	return;
};

export const getCreatedPosts = () => async (dispatch) => {
	try {
		const res = await axios.get("posts/created");
		const posts = Object.values(res.data.posts);
		dispatch({
			type: GET_CREATED_POSTS,
			payload: posts,
		});
	} catch (err) {}
	return;
};

export const searchPost = (queryString) => async (dispatch) => {
	if (queryString.length <= 1) return;
	console.log("searching with:", queryString);
	try {
		const res = await axios.get("posts", {
			params: {
				queryString: queryString,
			},
		});
		dispatch({
			type: SEARCH_POSTS,
			payload: res.data.posts,
		});
		console.log("search result:", res.data);
	} catch (err) {
		if (err.response) {
			const errorMessage = err.response.data.error;
			if (errorMessage) {
				dispatch(setAlert(errorMessage, RED_ALERT));
			}
		}
	}
	return;
};

export const deletePost = (e, placeDisplayed) => async (dispatch) => {
	clearAlerts();
	const postId = e.target.id;
	try {
		await axios.delete(`posts/${postId}`);
		dispatch(setAlert("Successfully deleted the post", GREEN_ALERT));
		switch (placeDisplayed) {
			case "networkingPage":
				dispatch({
					type: DELETE_POST_SUCCESS,
					payload: postId,
				});
				break;
			case "dashboardPosts":
				dispatch({
					type: DELETE_POST_SUCCESS,
					payload: postId,
				});
				dispatch(getCreatedPosts());
				break;
			default:
		}
	} catch (err) {
		if (err.response) {
			const errorMessage = err.response.data.error;
			if (errorMessage) {
				dispatch(setAlert(errorMessage, RED_ALERT));
			}
		}
		dispatch({
			type: DELETE_POST_FAILED,
		});
	}
	return;
};

export const postNetworkingPostComment = () => async (dispatch) => {};
