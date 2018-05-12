import { Reviews } from "./reviews.js";
import { Companies } from "./companies.js";
import SimpleSchema from "simpl-schema";
import "./denormalization.js"

Meteor.methods({
	"hasFiveWords": function (inputString) {
		// Funny story, String.prototype.wordCount is actually
		// defined in reviews.js because I couldn't find a
		// better place for it. Just in case you're wondering.
		if(inputString.wordCount() < 5) {
			throw new Meteor.Error("needsFiveWords", "You should write at least 5 words in this field");
		}
		return "all good";
	},


//method to search
"companies.search": function (searchstring){
	


},


	'reviews.submitReview': function(newReview) {
		// Make sure the user is logged in before inserting a task
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		//This avoids a lot of problems
		Reviews.simpleSchema().clean(newReview);

		// Error-out if _id field is defined
		if ("_id" in newReview) {
			throw new Meteor.Error("containsId","You are not allowed to specifiy your own _id attribute");
		}

		// console.log("SERVER: validating...");
		let validationResult = Reviews.simpleSchema().namedContext().validate(newReview);
		// console.log("SERVER: Here is the validation result: ");
		// console.log(validationResult);
		// console.log(Reviews.simpleSchema().namedContext().validationErrors());

		// console.log("SERVER: inserting");
		Reviews.insert(newReview);

		/*
			PROBLEM
			What happens if the company under review does not have a profile yet?
			I can think of two things we could do:
			- Create a profile for it, which introduces the hassle of
				how to handle it when it actually creates a profile
			- Do nothing, and when the company is created we just automatically
				calculate its initial stats based on the reviews that have
				been posted. This might involve a race condition if reviews
				are being written and profiles created at the same time, because
				Mongo doesn't ensure ACID.

			So here are the things I need to look out for right now:
			- What does this method do, or need to do, when the company doesn't exist?
			- If the actions taken are different depending on whether the company
				is verified or unverified, how do I handle that?
			- Should we even allow reviews for companies that don't already have profiles?
			- Is the math correct?
		*/

		// Update denormalizations.
		// console.log("SERVER: before update");
		// console.log(Companies.findOne({name: newreview.companyName}));
		// Companies.update(
		// 	{ name: newReview.companyName },
		// 	{
		// 		$set: {
		// 			/*
		// 				I'm not sure how these denormalizations work,
		// 				but please make sure that they're using the correct
		// 				variable names as per Reviews.schema.
		//
		// 				In fact, I'm almost certain that one or more of them
		// 				is wrong because the schema attribute names used to have
		// 				the same names as this method's arguments, but I'm
		// 				not sure which is supposed to be which.
		// 					- Josh
		// 			*/
		// 			healthAndSafety: addToAvg(newReview.healthAndSafety, "$numReviews", "$healthAndSafety"),
		// 			managerRelationship: addToAvg(newReview.managerRelationship, "$numReviews", "$managerRelationship"),
		// 			workEnvironment: addToAvg(newReview.workEnvironment, "$numReviews", "$workEnvironment"),
		// 			benefits: addToAvg(newReview.benefits, "$numReviews", "$benefits"),
		// 			overallSatisfaction: addToAvg(newReview.overallSatisfaction, "$numReviews", "$overallSatisfaction"),
		// 		},
		// 		$inc: { numReviews: 1 } //this will increment the numReviews by 1
		// 	}
		// );
		// console.log("SERVER: after update");
		// console.log(Companies.findOne({name: newreview.companyName}));
	},

	"companies.isCompanyNameAvailable": function (companyName) {
		if(Companies.hasEntry(companyName)) {
			throw new Meteor.Error("nameTaken", "The name you provided is already taken");
		}

		return "all good";
	},

	//Add method for creating a new CompanyProfile
	//	--> The full solution will require cross-validation
	//	--> with the collection of companies that have not
	//	--> yet set up accounts. We're not ready for that quite yet.
	"companies.createProfile": function (newCompanyProfile) {
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
			throw new Meteor.Error("loggedOut","You must be logged in to your account in order to create a profile");
		}

		//This avoids a lot of problems
		Companies.simpleSchema().clean(newCompanyProfile);

		// Error-out if _id field is defined
		if ("_id" in newCompanyProfile) {
			throw new Meteor.Error("containsId","You are not allowed to specifiy your own _id attribute");
		}

		//Throws an exception if argument is invalid.
		// console.log("SERVER: validating...");
		let validationResult = Companies.simpleSchema().namedContext().validate(newCompanyProfile);
		// console.log("SERVER: Here is the validation result: ");
		// console.log(validationResult);
		// console.log(Companies.simpleSchema().namedContext().validationErrors());

		/* We will probably end up needing more checks here,
		I just don't immediately know what they need to be. */
		//try {
		// console.log("SERVER: inserting");

		Companies.insert(newCompanyProfile);
	},

	//Edits an existing company profile -- UNTESTED
	"companies.editProfile": function (companyProfileEdits) {
		/*
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
