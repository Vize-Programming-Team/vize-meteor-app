import React from "react";

import { Meteor } from "meteor/meteor";
import { $, jQuery } from "meteor/jquery";

function setUpButtons() {
	$(document).ready(function() {
		const chatbox = jQuery.noConflict();
		chatbox(() => {
			chatbox(".chatbox-open").click(() =>
				chatbox(".chatbox-popup, .chatbox-close").fadeIn()
			);
			chatbox(".chatbox-close").click(() =>
				chatbox(".chatbox-popup, .chatbox-close").fadeOut()
			);
		});
	});
}

/* The "Dialog" page. */
export default class Dialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			value: "",
			count: 0,
		};
		this.sendClicked = this.sendClicked.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
	}

	componentDidMount() {
		setUpButtons();
	}

	componentDidUpdate() {
		setUpButtons();
	}

	handleTextChange(event) {
		this.setState({ value: event.target.value });
	}

	sendClicked(event) {
		event.preventDefault();

		Meteor.call(
			"sendEmail",
			"incentivizinggood@gmail.com",
			"postmaster@incentivizinggood.com",
			`Contacting us: Anonymous`,
			`${"Howdy Vize reader,\n" + "Below is the message: \n"}${
				this.state.value
			}.\n\nSincerely,\n\n Vize Inc.\n\n Sender's email: Anonymous`,
			(err, res) => {
				if (err) {
					console.log("--- BEGIN error:");
					alert("Please try again");
					console.log(err);
					console.log("--- END error");
					alert("System error, please refresh and try again. Thank you!");
				} else {
					console.log("--- BEGIN success:");
					console.log(res);
					console.log("--- END success");
					alert("Thank you for the feedback!");
				}
			}
		);

		alert("wassup2");
	}

	render() {
		return (
			<div>
				<button className="chatbox-open">
					<i className="fa fa-comments fa-2x" aria-hidden="true" />
				</button>
				<button className="chatbox-close">
					<i className="fa fa-close fa-2x" aria-hidden="true" />
				</button>
				<section className="chatbox-popup">
					<header className="chatbox-popup__header" />
					<main className="chatbox-popup__main">
						Please send us feedback on how to improve below. Thank
						you!
					</main>
					<footer className="chatbox-popup__footer">
						<aside
							style={{ flex: "1", color: "#888", text: "center" }}
						/>
						<aside style={{ flex: "10" }}>
							<textarea type="text" placeholder="Type your message here..." onChange={this.handleTextChange} />
						</aside>
						<aside
							style={{
								flex: "1",
								color: "#2079b5",
								text: "center",
							}}
						>
							<i className="fa fa-paper-plane" aria-hidden="true" onClick={this.sendClicked}
							/>
						</aside>
					</footer>
				</section>
			</div>
		);
	}
}
