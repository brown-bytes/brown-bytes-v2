import axios from "axios";

const sendFeedBack = (name, email, comments) => async (dispatch) => {
	console.log("sending ", name, email, comments, " to server");
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({ name, email, comments });

	try {
		const res = await axios.post("/api/auth", body, config);

		dispatch({
			type: "feedback_success",
			payload: res.data,
		});

		// dispatch(loadUser());
	} catch (err) {}
	return;
};

export default sendFeedBack;
