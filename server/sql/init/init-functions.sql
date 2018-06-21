-- regex check for email w/ TLD
CREATE OR REPLACE FUNCTION is_valid_email_with_tld(arg text)
RETURNS boolean AS
$$
	const emailWithTldRegex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailWithTldRegex.test(arg);
$$ LANGUAGE plv8 IMMUTABLE;

-- regex check for URL
CREATE OR REPLACE FUNCTION is_valid_url(arg text)
RETURNS boolean AS
$$
	const urlRegex=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
	return urlRegex.test(arg);
$$ LANGUAGE plv8 IMMUTABLE;

-- count words in a string, used for checking pros and cons
-- in the reviews table, hooray for plv8 letting me reuse
-- the Javascript code that I fought so hard to get working
CREATE OR REPLACE FUNCTION word_count(arg text)
RETURNS integer AS
$$
	return arg.split(/\s+\b/).length;
$$ LANGUAGE plv8 IMMUTABLE;

-- helper function for when we want to use a trigger
-- to blanketly disallow some action
CREATE OR REPLACE FUNCTION deny_op() RETURNS TRIGGER AS
$$
	// plv8 is very intuitive, just not in the ways you might expect XD,
	// apparently this statement translates to a nice SQL exception
	// and rolls back the parent transaction
	throw "Operation not permitted";
$$ LANGUAGE plv8;

-- selects the set of X from table 1 (company_locations or review_locations)
-- related to Y in table 2 (companies or reviews)
-- by integer factor Z (companyId or reviewId)
-- and return the set's size
-- or -1 if Z does not exist in table 2
-- this breaks if Z's name is not the same in both table1 and table2
CREATE OR REPLACE FUNCTION count_related_by_int
(table1 text, table2 text, factorname text, factorvalue integer)
RETURNS integer AS
$$
	const checkTable2Plan = plv8.prepare("select $1 from $2 where $1=$3",['text','text','integer']);
	const doesYexist = checkTable2Plan.execute([factorname,table2,factorvalue]).length >= 1;
	checkTable2Plan.free();
	if(!doesYexist) return -1;
	const countXplan = plv8.prepare("select count($1) from $2 where $1=$3",['text','text','integer']);
	return countXplan.execute([factorname,table1,factorvalue])[0].length;
$$ LANGUAGE plv8;

-- This one is going to be used in an after-insert
-- constraint trigger on companies so that each
-- company starts off with at least one location.
CREATE OR REPLACE FUNCTION check_company_location_count() RETURNS TRIGGER AS
-- should just call "check_location_count" with company arguments
$$
	const newCompanyId = NEW.companyid;
	const plan = plv8.prepare("select count(companyId) from company_locations where companyId=$1", ['integer']);
	const location_count = plan.execute([newCompanyId])[0].count;
	plan.free();
	if(location_count >= 1) {
		return null;
	}
	else {
		throw "Each company must have at least one location";
	}
$$ LANGUAGE plv8;

-- ditto for review locations
CREATE OR REPLACE FUNCTION check_review_location_count() RETURNS TRIGGER AS
-- should just call "check_location_count" with review arguments
$$
	const newReviewId = NEW.reviewid;
	const plan = plv8.prepare("select count(reviewId) from review_locations where reviewId=$1", ['integer']);
	const location_count = plan.execute([newReviewId])[0].count;
	plan.free();
	if(location_count >= 1) {
		return null;
	}
	else {
		throw "Each review must have at least one location";
	}
$$ LANGUAGE plv8;

-- This is for after-delete and after-update triggers
-- on company locations, to make sure that a company's last location
-- doesn't accidentally get moved or deleted
CREATE OR REPLACE FUNCTION check_remaining_company_locations() RETURNS TRIGGER AS
$$
	// skip case we don't care about so we don't have to worry about NEW
	if(TG_OP === 'UPDATE' && OLD.companyid === NEW.companyid)
		return null;
	const oldcompanyid = OLD.companyid;
	// * FROM HERE ... *
	// make sure old company actually exists
	let plan = plv8.prepare("select companyid from companies where companyid=$1",['integer']);
	const oldCompanyExists = plan.execute([oldcompanyid]).length >= 1;
	plan.free();
	// skip another case that we do not care about
	if(!oldCompanyExists)
		return null;
	plan = plv8.prepare("select companyId from company_locations where companyId=$1",['integer']);
	const isLastLocation = plan.execute([oldcompanyid]).length < 1;
	// * ... TO HERE CAN BE FACTORED OUT INTO check_location_count *
	// finally, the reason we came here to begin with
	if(isLastLocation)
		throw "Each company must have at least one location (cannot remove last location)";
	return null;
$$ LANGUAGE plv8;

-- ditto for review locations
CREATE OR REPLACE FUNCTION check_remaining_review_locations() RETURNS TRIGGER AS
$$
	// skip case we don't care about so we don't have to worry about NEW
	if(TG_OP === 'UPDATE' && OLD.reviewid === NEW.reviewid)
		return null;
	const oldReviewId = OLD.reviewid;
	// * FROM HERE ... *
	// make sure old company actually exists
	let plan = plv8.prepare("select reviewId from reviews where reviewId=$1",['integer']);
	const oldReviewExists = plan.execute([oldReviewId]).length >= 1;
	plan.free();
	// skip another case that we do not care about
	if(!oldReviewExists)
		return null;
	plan = plv8.prepare("select reviewId from review_locations where reviewId=$1",['integer']);
	const isLastLocation = plan.execute([oldReviewId]).length < 1;
	// * ... TO HERE CAN BE FACTORED OUT INTO check_location_count *
	// finally, the reason we came here to begin with
	if(isLastLocation)
		throw "Each review must have at least one location (cannot remove last location)";
	return null;
$$ LANGUAGE plv8;
