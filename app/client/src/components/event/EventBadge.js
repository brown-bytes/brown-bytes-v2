import moment from "moment";

const EventBadge = ({ startTime, endTime }) => {
	let eventType = "Ongoing";
	const current_time = Date.now();
	const futureFlag = moment(current_time).isBefore(startTime);
	if (!futureFlag) {
		const pastFlag = moment(endTime).isBefore(current_time);
		if (pastFlag) {
			eventType = "Ended";
		}
	} else {
		eventType = "Upcoming";
	}
	switch (eventType) {
		case "Ongoing":
			return (
				<div className="event-ongoing-badge">
					<span className="event-ongoing-text">Ongoing</span>
				</div>
			);
		case "Upcoming":
			return (
				<div className="event-upcoming-badge">
					<span className="event-upcoming-text">Upcoming</span>
				</div>
			);
		case "Ended":
			return (
				<div className="event-ended-badge">
					<span className="event-ended-text">Ended</span>
				</div>
			);
		default:
			return;
	}
};

export default EventBadge;
