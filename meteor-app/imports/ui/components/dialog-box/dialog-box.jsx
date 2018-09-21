import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Meteor } from "meteor/meteor";
import { $, jQuery } from "meteor/jquery";

import style from "./dialog-box.scss";

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

function removeEvent() {
	$("#changer").click();
}

/* The "Dialog" page. */
export default class Dialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
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
			`${"Howdy Vize reader,\nBelow is the message: \n"}${
				this.state.value
			}.\n\nSincerely,\n\n Vize Inc.\n\n Sender's email: Anonymous`,
			(err, res) => {
				if (err) {
					console.log("--- BEGIN error:");
					alert("Please try again");
					console.log(err);
					console.log("--- END error");
					alert(
						"System error, please refresh and try again. Thank you!"
					);
					removeEvent();
				} else {
					console.log("--- BEGIN success:");
					console.log(res);
					console.log("--- END success");
					alert("Thank you for the feedback!");
					removeEvent();
				}
			}
		);
	}

	render() {
		return (
			<div>
				<button className="chatbox-open">
					<FontAwesomeIcon icon="comments" size="2x" />
				</button>
				<button className="chatbox-close">
					<FontAwesomeIcon icon="times" id="changer" size="2x" />
				</button>
				<section className="chatbox-popup">
					<header className="chatbox-popup__header" />
					<main className="chatbox-popup__main">
						Please send us feedback on how to improve below. Thank
						you!
					</main>
					<footer className="chatbox-popup__footer">
						<aside className={style.bar}>
							<textarea
								type="text"
								placeholder="Type your message here..."
								onChange={this.handleTextChange}
							/>
						</aside>
						<aside className={style.baz}>
							<FontAwesomeIcon
								icon="paper-plane"
								onClick={this.sendClicked}
							/>
						</aside>
					</footer>
				</section>
			</div>
		);
	}
}