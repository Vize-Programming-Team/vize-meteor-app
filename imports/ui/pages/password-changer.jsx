import React from "react";

import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Accounts } from "meteor/accounts-base";
import i18n from "meteor/universe:i18n";

import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";

const t = i18n.createTranslator("common.passwordChanger");
const T = i18n.createComponent(t);

/* A form where users can change their passwords.
 */
class PasswordChanger extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: Meteor.userId() !== null ? null : "Not logged in",
			success: false,
			oldPassword: "",
			newPassword: "",
			repeatNewPassword: "",
		};

		// These bindings are necessary to make `this` work in callbacks.
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// Ask to be updated "reactively".
		// universe:i18n cannot be trusted to do that automaticaly.
		this.i18nInvalidate = () => this.forceUpdate();
		i18n.onChangeLocale(this.i18nInvalidate);
	}

	componentWillUnmount() {
		i18n.offChangeLocale(this.i18nInvalidate);
	}

	handleInputChange(event) {
		const { target } = event;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const { name } = target;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault(); // Prevent the default behavior for this event.
		const callback = error => {
			if (error) console.error(error);
			this.setState({
				error: error ? error.reason : null,
				success: !error,
			});
		};

		// Double check to avoid typos.
		if (this.state.newPassword !== this.state.repeatNewPassword) {
			callback({ reason: "New passwords do not match" });
			return;
		}

		Accounts.changePassword(
			this.state.oldPassword,
			this.state.newPassword,
			callback
		);
	}

	renderContent() {
		return (
			<div
				className="password-reset"
				style={{ width: "80%", margin: "auto" }}
			>
				{this.state.error ? (
					<div>
						<T>{`error.${this.state.error}`}</T>
					</div>
				) : null}
				<br />
				<h3>
					<strong>Change Password</strong>
				</h3>
				<br />
				<form onSubmit={this.handleSubmit}>
					<label
						htmlFor="passwordChangeForm-oldPassword"
						style={{ width: "100%" }}
					>
						<input
							id="passwordChangeForm-oldPassword"
							name="oldPassword"
							type="password"
							placeholder={t("oldPassword")}
							required
							value={this.state.oldPassword}
							onChange={this.handleInputChange}
							style={{ width: "100%" }}
						/>
					</label>
					<br />
					<br />
					<label
						htmlFor="passwordChangeForm-newPassword"
						style={{ width: "100%" }}
					>
						<input
							id="passwordChangeForm-newPassword"
							name="newPassword"
							type="password"
							placeholder={t("newPassword")}
							required
							value={this.state.newPassword}
							onChange={this.handleInputChange}
							style={{ width: "100%" }}
						/>
					</label>
					<br />
					<br />
					<label
						htmlFor="passwordChangeForm-repeatNewPassword"
						style={{ width: "100%" }}
					>
						<input
							id="passwordChangeForm-repeatNewPassword"
							name="repeatNewPassword"
							type="password"
							placeholder={t("newPassword")}
							required
							value={this.state.repeatNewPassword}
							onChange={this.handleInputChange}
							style={{ width: "100%" }}
						/>
					</label>
					<br />
					<br />
					<input
						type="submit"
						className="btn btn-primary"
						value={t("submit")}
					/>
					<br />
					<br />
				</form>
			</div>
		);
	}

	render() {
		let content = null;

		if (this.state.success) {
			content = (
				<div
					style={{ width: "80%", margin: "0 auto" }}
					className="password-reset"
				>
					<T>success</T>
					<br />
					<br />
				</div>
			);
		} else if (this.props.user) {
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
			</div>
		);
	}
}

export default withTracker(() => ({
	user: Meteor.user(),
}))(PasswordChanger);
