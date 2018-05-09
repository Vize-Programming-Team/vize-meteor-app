import { Reviews } from "./reviews.js";
import { Companies } from "./companies.js";
import {Email} from "meteor/email";
import {Meteor} from "meteor/meteor";
//import "./denormalizers.js"

Meteor.methods({
	//This method needs to be modified to take a Review
	//object and validate it against a schema.
	// // - Josh
    // Server: Define a method that the client can call.
    sendEmail: function(to, from, subject, text) {
		console.log("--- sendEmail: checking arguments");
		check([to, from, subject, text], [String]);
        let realEmail = { to, from, subject, text };
		console.log("--- sendEmail: before send, here is the email:");
        console.log(realEmail);
        this.unblock();
        Email.send(realEmail);
        console.log("--- sendEmail: after send");
		return "return value of sendEmail: we made it";
    },

	"reviews.insert"(company_id, text, safety, respect) {
		// Make sure the user is logged in before inserting a task
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		Reviews.insert({
			date: new Date(),
			text: text,
			company_id: company_id,
			user_id: this.userId,
			safety: safety,
			respect: respect
		});

		// Update denormalizations.
		Companies.update(
			{ _id: company_id },
			{
				$set: {
					/*
						I'm not sure how these denormalizations work,
						but please make sure that they're using the correct
						variable names as per Reviews.schema.

						In fact, I'm almost certain that one or more of them
						is wrong because the schema attribute names used to have
						the same names as this method's arguments, but I'm
						not sure which is supposed to be which. BUG
							- Josh
					*/
					safety: addToAvg(safety, "$numReviews", "$safety"),
					respect: addToAvg(respect, "$numReviews", "$respect")
				},
				$inc: { numReviews: 1 }
			}
		);
	},

	//Add method for creating a new CompanyProfile
	//	--> The full solution will require cross-validation
	//	--> with the collection of companies that have not
	//	--> yet set up accounts. We're not ready for that quite yet.
	"companies.createProfile" (newCompanyProfile) {
		/*
			ATTENTION UX DEVELOPERS
			This method expects a single argument,
			corresponding to a single object, which must
			conform to a SimpleSchema as defined for the
			Companies collection in "imports/api/data/companies.js".

			Translation: Call this method with an object that has
			all the fields and meets all the constraints defined
			in Companies.schema, and it shall go well with you.

			NOTE: This method throws an exception if you
			pass in a newCompanyProfile with a defined _id
			field. This is becuase we want Mongo to define
			the _id's for us, and be agnostic as to what
			any given _id value actually is.
		*/

		// Make sure the user is logged in before inserting a task
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		// Error-out if _id field is defined
		if ("_id" in newCompanyProfile) {
			throw new Meteor.Error("invalid newCompanyProfile: contains _id field");
		}

		//Throws an exception if argument is invalid.
		Companies.schema.validate(newCompanyProfile);

		/* We will probably end up needing more checks here,
		I just don't immediately know what they need to be. */

		Companies.insert(newCompanyProfile);
	},

	//Edits an existing company profile
	"companies.editProfile"(companyProfileEdits) {
		/*
			COMING SOON!
			Note: Don't worry about the fact that this code hasn't been
			written yet. This is how it's going to work when it has been written.

			ATTENTION UX DEVELOPERS
			This function takes a single object, which must have
			an _id field for the Mongo.ObjectId of the CompanyProfile
			to be updated, and other fields corresponding to the
			document fields that need to be edited.

			The _id will be used as a Mongo-Style Selector, and the
			entire object is used as a  Mongo-Style Modifier via $set.

			Example: if you want to append to a company's name,
			then pass an object with a "name" field which has the old name
			plus whatever new text you want to append. You can do this,
			or something like it, for as many fields as you need to change.

			Note: we may need to better define which fields can be changed
			by this method and by whom.

			See the Companies.schema definition in
			"imports/api/data/companies.js" for a list of field names,
			types, and constraints.
				- Josh
		*/

		// Copy-paste until we implement real security
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		// Mongo-style modifiers seem to just be JSON objects
		// where the field names are modifiers and the values
		// are JSON objects with keys identifying the doc field
		// to be modified and values identifying "how" to perform
		// the modifier (as in {$inc: {name: 2}} would increment
		// name by 2 if that was valid). Which means we can just
		// pass companyProfileEdits to $set. Woohoo.
		let modifier = {$set: companyProfileEdits};

		// Apparently SimpleSchema lets you validate
		// Mongo-style modifiers. Dunno about you guys,
		// but I think that's extremely cool.
		Companies.schema.validate(modifier);

		// Will probably just silently do nothing if there's
		// no profile with _id.
		Companies.update(companyProfileEdits._id, modifier);
	},

});
