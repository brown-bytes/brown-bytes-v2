import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// const Alert = ({ alerts }) =>
// 	alerts !== null &&
// 	alerts.length > 0 &&
// 	alerts.map((alert) => (
// 		<div key={alert.id} className={`alert alert-${alert.alertType}`}>
// 			{alert.msg}
// 		</div>
// 	));

// Alert.propTypes = {
// 	alerts: PropTypes.array.isRequired,
// };

// const mapStateToProps = (state) => ({
// 	alerts: state.alert,
// });

// export default connect(mapStateToProps)(Alert);

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

const Profile = () => (
	<div className="home">
		<h1>Profile</h1>
	</div>
);

export default connect(mapStateToProps)(Profile);
