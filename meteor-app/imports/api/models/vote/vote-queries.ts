import { simpleQuery, simpleQuery1 } from "imports/api/connectors/postgresql";

import {
	VoteId,
	User,
	Vote,
	VoteSubject,
	getUserPostgresId,
	getUserById,
	getReviewById,
	getCommentById,
	getVoteSubjectRef,
	unpackVoteId,
} from "imports/api/models";

const defaultPageSize = 100;
const attributes = [
	'submittedby AS "submittedBy"',
	'refersto AS "refersTo"',
	'value AS "isUpvote"',
];
const baseQuery = (subjectType: "review" | "comment") =>
	`SELECT ${attributes.join(
		", "
	)}, '${subjectType}' AS subjecttype FROM ${subjectType}_votes`;

// Get the vote with a given id.
export async function getVoteById(id: VoteId): Promise<Vote | null> {
	// requires VoteId to be a JSON.parse-able
	// string with the fields/types:
	// subjectType: "review" or "comment"
	// submittedBy: integer
	// refersTo: integer
	const { subjectType, submittedBy, refersTo } = unpackVoteId(id);

	return simpleQuery1(
		`${baseQuery(subjectType)} WHERE submittedby=$1 AND refersto=$2`,
		submittedBy,
		refersTo
	);
}

// Get the vote cast by a given user on a given thing.
export async function getVoteByAuthorAndSubject(
	user: User,
	subject: VoteSubject
): Promise<Vote | null> {
	let { subjectType, refersTo } = getVoteSubjectRef(subject);

	const submittedBy = await getUserPostgresId(user._id);

	return simpleQuery1(
		`${baseQuery(subjectType)} WHERE submittedby=$1 AND refersto=$2`,
		submittedBy,
		refersTo
	);
}

// Get all votes cast by a given user.
export async function getVotesByAuthor(
	user: User,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Vote[]> {
	const submittedBy = await getUserPostgresId(user._id);

	return simpleQuery(
		`${baseQuery("review")} WHERE submittedby=$1 UNION ALL ${baseQuery(
			"comment"
		)} WHERE submittedby=$1 OFFSET $2 LIMIT $3`,
		submittedBy,
		pageNumber * pageSize,
		pageSize
	);
}

// Get the user who cast a given vote.
export async function getAuthorOfVote(vote: Vote): Promise<User> {
	return getUserById(vote.submittedBy);
}

// Get all votes that were cast on a given thing.
export async function getVotesBySubject(
	subject: VoteSubject,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Vote[]> {
	let { subjectType, refersTo } = getVoteSubjectRef(subject);

	// result has subject (string "review" or "comment")
	// and votes, the query results from the underlying
	// vote counting view for that item. Although pageNumber
	// and pageSize are indeed use (for offset and limit)
	// in the underlying query, they don't have much meaning
	// as each such query should yield exactly 1 or 0 results.

	return simpleQuery(
		`${baseQuery(subjectType)} WHERE refersto=$1 OFFSET $2 LIMIT $3`,
		refersTo,
		pageNumber * pageSize,
		pageSize
	);
}

// Get the thing that a given vote was cast on.
export async function getSubjectOfVote(vote: Vote): Promise<VoteSubject> {
	if (vote.subjectType === "review") return getReviewById(vote.refersTo);

	if (vote.subjectType === "comment") return getCommentById(vote.refersTo);

	throw new Error("vote.subjectType is not a valid value");
}

// Get all of the votes.
export async function getAllVotes(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Vote[]> {
	return simpleQuery(
		`${baseQuery("review")} UNION ALL ${baseQuery(
			"comment"
		)} OFFSET $1 LIMIT $2`,
		pageNumber * pageSize,
		pageSize
	);
}
