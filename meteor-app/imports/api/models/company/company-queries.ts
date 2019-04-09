import sql from "imports/lib/sql-template";
import { simpleQuery, simpleQuery1 } from "imports/api/connectors/postgresql";

import { CompanyId, Company } from "imports/api/models";

const attributes = sql.raw(
	[
		'companyid AS "companyId"',
		"name",
		'dateadded AS "dateAdded"',
		'yearestablished AS "yearEstablished"',
		"industry",
		'descriptionofcompany AS "descriptionOfCompany"',
		'numemployees AS "numEmployees"',
		'contactemail AS "contactEmail"',
		'websiteurl AS "websiteURL"',
		'contactphonenumber AS "contactPhoneNumber"',
		'numflags AS "numFlags"',
		'numreviews AS "numReviews"',
		'avgnummonthsworked AS "avgNumMonthsWorked"',
		'percentrecommended AS "percentRecommended"',
		'healthandsafety AS "healthAndSafety"',
		'managerrelationship AS "managerRelationship"',
		'workenvironment AS "workEnvironment"',
		"benefits",
		'overallsatisfaction AS "overallSatisfaction"',
	].join(", ")
);

const baseQuery = sql`
	SELECT ${attributes}
	FROM companies NATURAL JOIN company_review_statistics
`;

// Get the company with a given id.
export async function getCompanyById(id: CompanyId): Promise<Company | null> {
	// id is a string for now, and company id's
	// are integers, so I think this should be fine
	// for now
	if (Number.isNaN(Number(id))) throw Error("not a valid company id");

	return simpleQuery1(sql`${baseQuery} WHERE companyid=${Number(id)}`);
}

// Get the company with a given name.
export async function getCompanyByName(name: string): Promise<Company | null> {
	return simpleQuery1(sql`${baseQuery} WHERE name=${name}`);
}

// return all companies whose name
// contains the given search text
export async function searchForCompanies(
	searchText: string,
	pageNumber: number,
	pageSize: number
): Promise<Company[]> {
	return simpleQuery(sql`
		${baseQuery}
		WHERE name LIKE ${"%" + searchText + "%"}
		OFFSET ${pageNumber * pageSize}
		LIMIT ${pageSize}
	`);
}