/* eslint-disable import/no-anonymous-default-export */
import { set } from "mongoose";
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
	fetchedPostIds: new Set(),
	loadingPosts: true,
	numPostsFetched: 0,
	queryString: "",
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_POSTS:
			return {
				...state,
				posts: [...state.posts, ...payload],
				fetchedPostIds: new Set([
					...state.fetchedPostIds,
					...payload.map((post) => post.id),
				]),
				loadingPosts: false,
				numPostsFetched: state.numPostsFetched + payload.length,
			};
		case CREATE_POST_SUCCESS:
			const newPosts = payload.filter(
				(post) => !state.fetchedPostIds.has(post.id)
			);
			return {
				...state,
				posts: [...newPosts, ...state.posts],
				fetchedPostIds: new Set([
					...state.fetchedPostIds,
					...newPosts.map((post) => post.id),
				]),
				loadingPosts: false,
				numPostsFetched: state.numPostsFetched + newPosts.length,
			};
		default:
			return state;
	}
}
