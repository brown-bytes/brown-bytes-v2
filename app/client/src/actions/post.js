import axios from "axios";
import moment from "moment";

import { GREEN_ALERT, RED_ALERT } from "../components/layout/AlertTypes";
import toTop from "../utils/scrollToTop";
import { clearAlerts, setAlert } from "./alert";
import {
	CHANGE_POST_QUERY_STRING,
	CREATE_POST_COMMENT,
	CREATE_POST_FAILED,
	CREATE_POST_SUCCESS,
	DELETE_POST_FAILED,
	DELETE_POST_SUCCESS,
	GET_CREATED_POSTS,
	GET_POSTS,
	REFRESH_POSTS,
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
			dispatch(setAlert(errorMessage, RED_ALERT));
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
	} catch (err) {}
	return;
};

export const refreshPosts = () => async (dispatch) => {
	try {
		const res = await axios.get("posts", {
			params: {
				fetched: 0,
			},
		});
		console.log("get posts:", res.data.posts);
		dispatch({
			type: REFRESH_POSTS,
			payload: res.data.posts,
		});
	} catch (err) {}
	return;
};

export const changeQueryString = (newQueryString) => (dispatch) => {};

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
			default:
		}
	} catch (err) {
		if (err.response) {
			const errorMessage = err.response.data.error;
			dispatch(setAlert(errorMessage, RED_ALERT));
			dispatch({
				type: DELETE_POST_FAILED,
			});
		}
	}
	return;
};

export const postNetworkingPostComment = () => async (dispatch) => {};
