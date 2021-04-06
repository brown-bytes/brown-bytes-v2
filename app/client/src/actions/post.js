import axios from "axios";
import moment from "moment";

import { GREEN_ALERT, RED_ALERT } from "../components/layout/AlertTypes";
import { clearAlerts, setAlert } from "./alert";
import {
	CHANGE_POST_QUERY_STRING,
	CREATE_POST_FAILED,
	CREATE_POST_SUCCESS,
	DELETE_POST_FAILED,
	DELETE_POST_SUCCESS,
	GET_CREATED_POSTS,
	GET_POSTS,
	CREATE_POST_COMMENT,
} from "./types";

export const createPost = (content) => async (dispatch) => {
	console.log("creating a post:", content);
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
		const errorMessage = err.response.data.error;
		dispatch(setAlert(errorMessage, RED_ALERT));
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

export const deletePost = () => async (dispatch) => {};
