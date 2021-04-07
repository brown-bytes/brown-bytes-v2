import moment from "moment";

export const commentTimeComparator = (comment1, comment2) => {
	const date1 = comment1.createdAt;
	const date2 = comment2.createdAt;
	if (moment(date1).isBefore(date2)) {
		return -1;
	} else {
		return 1;
	}
};
