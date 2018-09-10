// Boilerplate first
import React from "react";
import PropTypes from "prop-types";
import { Template } from "meteor/templating"; // Used to set up the autoform
import Blaze from "meteor/gadicc:blaze-react-component"; // used to insert Blaze templates into React components
import ErrorWidget from "../error-widget.jsx"; // used to display errors thrown by methods
import { ReactiveVar } from "meteor/reactive-var";
import { ReactiveDict } from "meteor/reactive-dict"; // used to hold global state because...you can't "pass props" to Blaze templates
import { AutoForm } from "meteor/aldeed:autoform";
import i18n from "meteor/universe:i18n";

import Header from "/imports/ui/components/header.jsx";
import Footer from "/imports/ui/components/footer.jsx";
import Dialog from "/imports/ui/components/dialog-box";

// Specific stuff second
import { JobAds } from "../../api/data/jobads.js";
import { Companies } from "../../api/data/companies.js";
import "/imports/ui/forms/apply-for-job.html";

const afj_form_state = new ReactiveDict();
afj_form_state.set("formError", "good"); // Shared with AutoForm helpers
afj_form_state.set("jobId", undefined); // Shared with the React wrapper
afj_form_state.set("job", {
	companyName: i18n.__("common.forms.pleaseWait"),
});

if (Meteor.isClient) {
	Template.afj_blaze_form.bindI18nNamespace("common.forms");

	Template.afj_blaze_form.onCreated(function() {
		const id = afj_form_state.get("jobId");
		this.autorun(function() {
			Meteor.call("jobads.findOne", id, (error, result) => {
				if (!result) {
					afj_form_state.set("job", undefined);
				} else {
					afj_form_state.set("job", result);
				}
			});
		});
	});

	Template.afj_blaze_form.onRendered(function() {
		if (Meteor.isDevelopment) console.log("Rendering afj_blaze_form");
	});

	Template.afj_blaze_form.helpers({
		jobApplicationSchema: JobAds.applicationSchema,
		ErrorWidget() {
			return ErrorWidget;
		},
		jobId() {
			return afj_form_state.get("jobId");
		},
		getCompanyName() {
			const job = afj_form_state.get("job");
			if (job === undefined) {
				return "ERROR: INVALID JOB ID";
			}
			return job.companyName;
		},
		hasError() {
			return afj_form_state.get("formError") !== "good";
		},
		error() {
			return afj_form_state.get("formError");
		},
		resetFormError() {
			// called when reset button is clicked
			if (Meteor.isDevelopment) console.log("Resetting afj_blaze_form");
			afj_form_state.set("formError", "good");
		},
	});

	AutoForm.addHooks("afj_blaze_form", {
		onSuccess(formType, result) {
			// If your method returns something, it will show up in "result"
			if (Meteor.isDevelopment)
				console.log(
					`SUCCESS: We did a thing in a ${formType} form: ${result}`
				);
			afj_form_state.set("formError", "good");
		},
		onError(formType, error) {
			// "error" contains whatever error object was thrown
			if (Meteor.isDevelopment)
				console.log(
					`ERROR: We did a thing in a ${formType} form: ${error}`
				);
			afj_form_state.set("formError", error.toString());
		},
	});
}

export default class ApplyForJobForm extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		afj_form_state.set("jobId", this.props.jobId);

		return (
			<div>
				<div className="navbarwhite">
					<Header />
				</div>
				<div className="page ApplyForJobForm">
					<Blaze template="afj_blaze_form" />
				</div>
				<Footer />
				<Dialog/>
			</div>
		);
	}
}

ApplyForJobForm.propTypes = {
	jobId: PropTypes.string,
};
