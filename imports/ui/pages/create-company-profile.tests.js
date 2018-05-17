// Stuff for the form
import { React } from "react";
import { ReactDOM } from "react-dom";
import { Mongo } from "meteor/mongo";
import { CompanyCreateProfileForm } from "./create-company-profile.jsx"

// Testing facilities
import { chai } from "meteor/practicalmeteor:chai";
import { sinon } from "meteor/practicalmeteor:sinon";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Factory } from 'meteor/dburles:factory';
const faker = require('faker');
import { StubCollections } from "meteor/hwillson:stub-collections";
import { shallow } from "enzyme";
/*
	Fake login, because otherwise all the Methods break
	Comment from their GitHub page:
	Must be accessed this way because it is a debug only package
*/
var Phony = Package['csauer:accounts-phony'].Phony;
Meteor.loginWithPhony(Phony.user);


describe("CompanyCreateProfileForm", function() {

	// generate the same random data every time,
	// so we can see how...the "same stuff" changes
	// as we write code.
	// 42, because, I told you, you wouldn't like it.
	faker.seed(42);
	Factory.define("companyProfile", Companies, {
		name: faker.company.companyName(),
		dateEstablished: faker.date.recent(),
		dateJoined: faker.date.recent(),
		numEmployees: 1,
		industry: faker.commerce.product(),
		locations: faker.address.streetAddress(),
		contantInfo: faker.lorem.sentence(),
		email: faker.internet.email(),
		numFlags: 0,
		aveSafety: 0,
		avgRespect: 0,
		avgBenefits: 0,
		avgSatisfaction: 0,
		numReviews: 0,
	});

	beforeEach(function () {
		StubCollections.stub(Companies);
	});

	afterEach(function () {
		StubCollections.restore(Companies);
	});

	it("should render", function() {
		//let form = shallow(<CompanyCreateProfileForm />);
		ReactDOM.render(<CompanyCreateProfileForm />, document.getElementById("view-render")); // yolo
	});
});