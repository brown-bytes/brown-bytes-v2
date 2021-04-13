import {
	CREATE_POST_FAILED,
	CREATE_POST_SUCCESS,
	DELETE_POST_FAILED,
	DELETE_POST_SUCCESS,
	GET_CREATED_POSTS,
	GET_POSTS,
	CREATE_POST_COMMENT,
	SEARCH_POSTS,
} from "../actions/types";

const initialState = {
	posts: [],
	createdPosts: [],
	fetchedPostIds: new Set(),
	loadingPosts: true,
	loadingCreatedPosts: true,
	numPostsFetched: 0,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_POSTS:
			const newPostsAfterFetched = payload.filter(
				(post) => !state.fetchedPostIds.has(post.id)
			);
			return {
				...state,
				posts: [...newPostsAfterFetched, ...state.posts],
				fetchedPostIds: new Set([
					...state.fetchedPostIds,
					...newPostsAfterFetched.map((post) => post.id),
				]),
				loadingPosts: false,
				numPostsFetched:
					state.numPostsFetched + newPostsAfterFetched.length,
			};
		case CREATE_POST_SUCCESS:
			const newPostsAfterCreation = payload.filter(
				(post) => !state.fetchedPostIds.has(post.id)
			);
			return {
				...state,
				posts: [...newPostsAfterCreation, ...state.posts],
				fetchedPostIds: new Set([
					...state.fetchedPostIds,
					...newPostsAfterCreation.map((post) => post.id),
				]),
				loadingPosts: false,
				numPostsFetched:
					state.numPostsFetched + newPostsAfterCreation.length,
			};
		case CREATE_POST_COMMENT:
			const newPostsAfterComment = payload.posts.filter(
				(post) =>
					post.id === Number(payload.postId) ||
					!state.fetchedPostIds.has(post.id)
			);
			return {
				...state,
				posts: [
					...newPostsAfterComment,
					...state.posts.filter(
						(post) => post.id !== Number(payload.postId)
					),
				],
				fetchedPostIds: new Set([
					...state.fetchedPostIds,
					...newPostsAfterComment.map((post) => post.id),
				]),
				loadingPosts: false,
				numPostsFetched:
					state.numPostsFetched + newPostsAfterComment.length - 1,
			};
		case DELETE_POST_SUCCESS:
			return {
				...state,
				posts: state.posts.filter(
					(post) => post.id !== Number(payload)
				),
				fetchedPostIds: new Set(
					[...state.fetchedPostIds].filter(
						(id) => id !== Number(payload)
					)
				),
				loadingPosts: false,
				numPostsFetched: state.numPostsFetched - 1,
			};
		case SEARCH_POSTS:
			return {
				...state,
				posts: [...payload],
				fetchedPostIds: new Set([...payload.map((post) => post.id)]),
				loadingPosts: false,
				numPostsFetched: 0,
			};
		case GET_CREATED_POSTS:
			return {
				...state,
				createdPosts: [...payload],
				loadingCreatedPosts: false,
			};
		case CREATE_POST_FAILED:
		case DELETE_POST_FAILED:
		default:
			return state;
	}
}
