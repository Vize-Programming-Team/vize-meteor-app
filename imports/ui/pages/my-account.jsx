import React from "react";

import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import Dialog from "/imports/ui/components/dialog-box";
import Header from "/imports/ui/components/header.jsx";
import Footer from "/imports/ui/components/footer.jsx";

/* The page where users can view their account details,
 * update their profiles, and change settings.
 */
class MyAccountPage extends React.Component {
	renderContent() {
		return (
			<div style={{ width: "80%", margin: "0 auto" }}>
				<br />
				<h2>
					<strong>My Account</strong>
				</h2>
				<hr />
				<div>
					<strong>Username: </strong>
					{this.props.user.username}
					<br />
					<br />
					<a className="btn btn-info" href="/change-password">
						Change Password
					</a>
					<br />
					<br />
				</div>
			</div>
		);
	}

	render() {
		let content = null;
		if (this.props.user) {
			content = this.renderContent();
		} else {
			content = (
				<div style={{ width: "80%", margin: "0 auto" }}>
					<br />
					You must be logged in to use this page. <br /> <br />
					<a className="btn btn-primary" href="/login">
						Log In
					</a>
					<br />
				</div>
			);
		}

		return (
			<div>
				<div className="navbarwhite">
					<Header />
				</div>
				<div className="container fom-job">
					<div className="row">
						<div
							className="back_top_hover"
							style={{ backgroundColor: "#ffffff" }}
						>
							<br />
							{content}
						</div>
					</div>
				</div>
				<Footer />
				<Dialog/>
			</div>
		);
	}
}
export default withTracker(() => ({
	user: Meteor.user(),
}))(MyAccountPage);
