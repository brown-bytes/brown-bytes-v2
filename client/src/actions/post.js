import axios from "axios";

import { GREEN_ALERT, RED_ALERT } from "../components/layout/AlertTypes";
import proxy from "../utils/proxy";
import { clearAlerts, setAlert } from "./alert";
import {
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
		await axios.post(`${proxy}/posts`, body, config);
		dispatch(setAlert("Successfully created a new post!", GREEN_ALERT));
		const res = await axios.get(`${proxy}/posts`, {
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

export const postNetworkingPostComment = (
	comment,
	postId,
	placeDisplayed
) => async (dispatch) => {
	clearAlerts();
	console.log("posting comment:", comment, postId, placeDisplayed);
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({
		content: comment,
	});

	try {
		await axios.post(`${proxy}/posts/comment/${postId}`, body, config);
		const res = await axios.get(`${proxy}/posts`, {
			params: {
				fetched: 0,
			},
		});
		console.log("posted a comment, res from server:", res.data);
		console.log("placeDisplayed:", placeDisplayed);
		switch (placeDisplayed) {
			case "networkingPage":
				dispatch({
					type: CREATE_POST_COMMENT,
					payload: { posts: res.data.posts, postId: postId },
				});
				break;
			case "dashboardPosts":
				dispatch({
					type: CREATE_POST_COMMENT,
					payload: { posts: res.data.posts, postId: postId },
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
	}
	return;
};

export const getPosts = (numFetchedPosts) => async (dispatch) => {
	try {
		const res = await axios.get(`${proxy}/posts`, {
			params: {
				fetched: numFetchedPosts,
			},
		});
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
		const res = await axios.get(`${proxy}/posts/created`);
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
	try {
		const res = await axios.get(`${proxy}/posts`, {
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
		await axios.delete(`${proxy}/posts/${postId}`);
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
