import moment from "moment";

export const postTimeComparator = (post1, post2) => {
	const date1 = post1.createdAt;
	const date2 = post2.createdAt;
	if (moment(date1).isBefore(date2)) {
		return 1;
	} else {
		return -1;
	}
};
