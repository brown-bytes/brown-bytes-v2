/* eslint-disable import/no-anonymous-default-export */
import {
	CHANGE_POST_QUERY_STRING,
	CREATE_POST_FAILED,
	CREATE_POST_SUCCESS,
	DELETE_POST_FAILED,
	DELETE_POST_SUCCESS,
	GET_CREATED_POSTS,
	GET_POSTS,
	CREATE_POST_COMMENT,
} from "../actions/types";

const initialState = {
	posts: [],
	loadingPosts: true,
	numPostsFetched: 0,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_POSTS:
			return {
				posts: [...state.posts, ...payload],
				loadingPosts: false,
				numPostsFetched: state.numPostsFetched + payload.length,
			};
		default:
			return state;
	}
}
