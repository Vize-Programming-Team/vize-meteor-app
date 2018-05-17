import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";
import { AutoForm } from "meteor/aldeed:autoform";
import { Companies } from "./companies.js";
SimpleSchema.extendOptions(["autoform"]); // gives us the "autoform" schema option

export const Salaries = new Mongo.Collection("Salaries", { idGeneration: 'STRING' });


/*
	Change this all from "Salaries" to "Incomes" or "Pay"?
*/
Salaries.schema = new SimpleSchema({
	_id: {
		type: String,
		optional: true,
		denyUpdate: true,
		autoValue: new Meteor.Collection.ObjectID(), // forces a correct value
		autoform: {
			omit: true,
		}, },
	submittedBy: { //userId of the review author
		type: String,
		optional: true,
		denyUpdate: true,
		autoValue: function() {
			if(Meteor.isServer) {
				// userId is not normally part of the autoValue "this" context, but the collection2 package adds it automatically
				return this.userId;
			}
		},
		autoform: {
			omit: true,
		}, },
	companyName: {		//Filled in by user, or auto-filled by form, but in any
		type: String,	//case, company names are indexed so we may as well use
	 	optional: false,//use this instead of companyID
		index: true,
		custom: function() {
			if (Meteor.isClient && this.isSet) {
				Meteor.call("companies.doesCompanyExist", this.value, (error, result) => {
					if (!result) {
						this.validationContext.addValidationErrors([{
							name: "companyName",
							type: "noCompanyWithThatName",
						}]);
					}
				});
			}
			else if (Meteor.isServer && this.isSet) {
				if(!Companies.hasEntry(this.value)) {
					return "noCompanyWithThatName";
				}
			}
		}, },
	companyId: {
		type: String,
		optional: true,
		denyUpdate: true,
		index: true,
		autoValue: function() {
			if(Meteor.isServer && this.field("companyName").isSet) {
				let company = Companies.findOne({name: this.field("companyName").value});
				if (company !== undefined) {
					return company._id;
				}
				else {
					// This should never happen, because
					// companies not in the database cannot
					// have salaries submitted for them:
					// that error is caught in another
					// custom validator
					return undefined;
				}
			}
		},
		autoform: {
			omit: true,
		}, },
	jobTitle: {
		type: String,
		optional: false, },
	incomeType: {
		type: String,
		optional: false,
		allowedValues: ["Yearly Salary", "Monthly Salary", "Hourly Wage"], },
	incomeAmount: {
		type: Number,
		optional: false,
		min: 0, },
	gender: {
		type: String,
		allowedValues: ["Male", "Female"], },
	datePosted: {
		type: Date,
		optional: true,
		denyUpdate: true,
		defaultValue: new Date(), //obviously, assumes it cannot possibly have been posted before it is posted
		autoform: {
			omit: true,
		}, },
}, { tracker: Tracker } );

Salaries.schema.messageBox.messages({
	//en? does that mean we can add internationalization
	//in this block of code?
	en: {
		noCompanyWithThatName: "There is no company with that name in our database",
	},
});

Salaries.attachSchema(Salaries.schema, { replace: true });

Salaries.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

if (Meteor.isServer) {
	Meteor.publish("Salaries", function() {
		return Salaries.find({});
	});
}