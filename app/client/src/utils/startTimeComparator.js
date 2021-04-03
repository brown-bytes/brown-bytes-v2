import moment from "moment";

export const startTimeComparator = (event1, event2) => {
	const date1 = event1.startTime;
	const date2 = event2.startTime;
	if (moment(date1).isBefore(date2)) {
		return -1;
	} else {
		return 1;
	}
};

export const startTimeComparatorInverse = (event1, event2) => {
	const date1 = event1.startTime;
	const date2 = event2.startTime;
	if (moment(date1).isBefore(date2)) {
		return 1;
	} else {
		return -1;
	}
};
