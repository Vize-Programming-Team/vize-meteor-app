-- regex check for email w/ TLD
CREATE OR REPLACE FUNCTION is_valid_email_with_tld(arg text)
RETURNS boolean AS
$$
	const emailWithTldRegex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailWithTldRegex.test(arg);
$$ LANGUAGE plv8;

-- regex check for URL
CREATE OR REPLACE FUNCTION is_valid_url(arg text)
RETURNS boolean AS
$$
	const urlRegex=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
	return urlRegex.test(arg);
$$ LANGUAGE plv8;

-- helper function for when we want to use a trigger
-- to blanketly disallow some action
CREATE OR REPLACE FUNCTION deny_op() RETURNS TRIGGER AS
$$
	// plv8 is very intuitive, just not in the ways you might expect XD,
	// apparently this statement translates to a nice SQL exception
	// and rolls back the parent transaction
	throw "Operation not permitted";
$$ LANGUAGE plv8;

-- This one is going to be used in an after-insert
-- constraint trigger on companies so that each
-- company starts off with at least one location.
CREATE OR REPLACE FUNCTION check_company_location_count() RETURNS TRIGGER AS
$$
	const newCompanyName = NEW.name;
	const plan = plv8.prepare("select count(companyName) from company_locations where companyName=$1", ['text']);
	const location_count = plan.execute([newCompanyName])[0].count;
	plan.free();
	if(location_count >= 1) {
		return null;
	}
	else {
		throw "Each company must have at least one location";
	}
$$ LANGUAGE plv8;

-- This is for after-delete and after-update triggers
-- on locations, to make sure that a company's last location
-- doesn't accidentally get moved or deleted
CREATE OR REPLACE FUNCTION check_remaining_company_locations() RETURNS TRIGGER AS
$$
	plv8.elog(NOTICE, "Hello, world!");
$$ LANGUAGE plv8;
