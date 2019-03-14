/* eslint-disable no-unused-vars */
import { GraphQLResolveInfo } from "graphql";
import { GraphQLDateTime } from "graphql-iso-date";

import * as dataModel from "imports/api/models";

// This file is generated by graphqlgen. If this file is not found or it is
// causing errors then it may not exist yet or it may be out of date. Try
// generating it with the command `./run.sh i`. (If you are working with this
// code a lot, you may prefer to use `cd meteor-app && npm run gen` instead.
// This command runs faster and ONLY generates the "./graphqlgen.js" file.)
import {
	Resolvers,
	CommentResolvers,
	CompanyResolvers,
	JobAdResolvers,
	ReviewResolvers,
	SalaryResolvers,
	UserResolvers,
	VoteResolvers,
	LocationResolvers,
	StarRatingsResolvers,
} from "./graphqlgen";

export type Context = {
	user: dataModel.User;
};

const defaultPageSize = 100;

const resolvers: Resolvers = {
	Query: {
		say: (obj, args, context, info) => "Hello world.",

		currentUser: (obj, args, context, info) =>
			// The current user is added to the context
			// by the `meteor/apollo` package.
			context.user,

		allComments: (obj, args, context, info) =>
			dataModel.getAllComments(
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		allCompanies: (obj, args, context, info) =>
			dataModel.getAllCompanies(
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		allJobAds: (obj, args, context, info) =>
			dataModel.getAllJobAds(
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		allReviews: (obj, args, context, info) =>
			dataModel.getAllReviews(
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		allSalaries: (obj, args, context, info) =>
			dataModel.getAllSalaries(
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		allUsers: (obj, args, context, info) =>
			dataModel.getAllUsers(
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		allVotes: (obj, args, context, info) =>
			dataModel.getAllVotes(
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		comment: (obj, args, context, info) =>
			dataModel.getCommentById(dataModel.stringToCommentId(args.id)),

		company: (obj, args, context, info) =>
			dataModel.getCompanyById(dataModel.stringToCompanyId(args.id)),

		jobAd: (obj, args, context, info) =>
			dataModel.getJobAdById(dataModel.stringToJobAdId(args.id)),

		review: (obj, args, context, info) =>
			dataModel.getReviewById(dataModel.stringToReviewId(args.id)),

		salary: (obj, args, context, info) =>
			dataModel.getSalaryById(dataModel.stringToSalaryId(args.id)),

		user: (obj, args, context, info) =>
			dataModel.getUserById(dataModel.stringToUserId(args.id)),

		vote: (obj, args, context, info) =>
			dataModel.getVoteById(dataModel.stringToVoteId(args.id)),

		searchCompanies: (obj, args, context, info) =>
			dataModel.searchForCompanies(
				args.searchText || "",
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		wroteAReview: (obj, args, context, info) =>
			dataModel.wroteAReviewStatus(context.user),
	},

	Mutation: {
		claimWroteAReview: (obj, args, context, info) =>
			dataModel.claimWroteAReview(
				context.user,
				args.phoneNumber,
				args.paymentMethod
			),
	},

	CommentParent: {
		// WARNING: Comments have not been fully implemented yet. The code for
		// them is a half done mess. Keep that in mind when working with it.
		__resolveType(
			obj: dataModel.CommentParent,
			context: Context,
			info: GraphQLResolveInfo
		) {
			// In order to determine what type obj actualy is, we test for the
			// existance of fields that are unique to each of the types that obj
			// could be. Example: If obj has things that only comments have,
			// then obj is a comment. We also use type assertions to double
			// check that each of these tests are correct. See Flow's docs on
			// "type refinement" for more info.
			if ((<dataModel.Comment>obj)._id) {
				return "Comment";
			}

			if ((<dataModel.Review>obj).reviewid) {
				return "Review";
			}

			// It should be imposible to get here.
			// TODO throw a more informative error message.
			return null;
		},
	},

	Comment: {
		// WARNING: Comments have not been fully implemented yet. The code for
		// them is a half done mess. Keep that in mind when working with it.
		...CommentResolvers.defaultResolvers,

		id: (obj, args, context, info) => dataModel.commentIdToString(obj._id),

		// Dates do not work with graphqlgen yet. It does not understand custom
		// scalers and thus it thinks that dates need to be resolved to strings.
		created: (obj, args, context, info) => obj.datePosted,

		author: (obj, args, context, info) => dataModel.getAuthorOfComment(obj),

		parent: (obj, args, context, info) => dataModel.getParentOfComment(obj),

		children: (obj, args, context, info) =>
			dataModel.getCommentsByParent(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		votes: (obj, args, context, info) =>
			dataModel.getVotesBySubject(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),
	},

	Company: {
		...CompanyResolvers.defaultResolvers,

		id: (obj, args, context, info) =>
			dataModel.companyIdToString(obj.companyid),
		name: (obj, args, context, info) => obj.name,

		contactEmail: (obj, args, context, info) => obj.contactemail,
		yearEstablished: (obj, args, context, info) => obj.yearestablished,
		numEmployees: (obj, args, context, info) => obj.numemployees,
		industry: (obj, args, context, info) => obj.industry,

		locations: (obj, args, context, info) =>
			dataModel.getLocationsByCompany(obj),

		contactPhoneNumber: (obj, args, context, info) =>
			obj.contactphonenumber,
		websiteURL: (obj, args, context, info) => obj.websiteurl,
		descriptionOfCompany: (obj, args, context, info) =>
			obj.descriptionofcompany,

		// Dates do not work with graphqlgen yet. It does not understand custom
		// scalers and thus it thinks that dates need to be resolved to strings.
		dateJoined: (obj, args, context, info) => obj.dateadded,
		numFlags: (obj, args, context, info) => obj.numflags,

		avgStarRatings: (obj, args, context, info) => {
			if (
				obj.healthandsafety === null ||
				obj.healthandsafety === undefined ||
				obj.managerrelationship === null ||
				obj.managerrelationship === undefined ||
				obj.workenvironment === null ||
				obj.workenvironment === undefined ||
				obj.benefits === null ||
				obj.benefits === undefined ||
				obj.overallsatisfaction === null ||
				obj.overallsatisfaction === undefined
			) {
				return null;
			} else {
				return {
					healthAndSafety: obj.healthandsafety,
					managerRelationship: obj.managerrelationship,
					workEnvironment: obj.workenvironment,
					benefits: obj.benefits,
					overallSatisfaction: obj.overallsatisfaction,
				};
			}
		},

		percentRecommended: (obj, args, context, info) =>
			obj.percentrecommended,
		avgNumMonthsWorked: (obj, args, context, info) =>
			obj.avgnummonthsworked,
		numReviews: (obj, args, context, info) => obj.numreviews,

		reviews: (obj, args, context, info) =>
			dataModel.getReviewsByCompany(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		jobAds: (obj, args, context, info) =>
			dataModel.getJobAdsByCompany(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		numJobAds: (obj, args, context, info) =>
			dataModel.countJobAdsByCompany(obj),
		salaries: (obj, args, context, info) =>
			dataModel.getSalariesByCompany(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		numSalaries: (obj, args, context, info) =>
			dataModel.countSalariesByCompany(obj),
	},

	JobAd: {
		...JobAdResolvers.defaultResolvers,

		id: (obj, args, context, info) =>
			dataModel.jobAdIdToString(obj.jobadid),

		jobTitle: (obj, args, context, info) => obj.jobtitle,
		locations: (obj, args, context, info) =>
			dataModel.getLocationsByJobAd(obj),
		pesosPerHour: (obj, args, context, info) => obj.pesosperhour,
		contractType: (obj, args, context, info) => obj.contracttype,
		jobDescription: (obj, args, context, info) => obj.jobdescription,

		// Dates do not work with graphqlgen yet. It does not understand custom
		// scalers and thus it thinks that dates need to be resolved to strings.
		created: (obj, args, context, info) => obj.dateadded,

		company: (obj, args, context, info) => dataModel.getCompanyOfJobAd(obj),
	},

	Review: {
		...ReviewResolvers.defaultResolvers,

		id: (obj, args, context, info) =>
			dataModel.reviewIdToString(obj.reviewid),

		title: (obj, args, context, info) => obj.reviewtitle,

		jobTitle: (obj, args, context, info) => obj.jobtitle,
		location: (obj, args, context, info) =>
			dataModel.parseLocationString(obj.reviewlocation),
		numberOfMonthsWorked: (obj, args, context, info) => obj.nummonthsworked,
		wouldRecommendToOtherJobSeekers: (obj, args, context, info) =>
			obj.wouldrecommend,

		starRatings: (obj, args, context, info) => ({
			healthAndSafety: obj.healthandsafety,
			managerRelationship: obj.managerrelationship,
			workEnvironment: obj.workenvironment,
			benefits: obj.benefits,
			overallSatisfaction: obj.overallsatisfaction,
		}),

		additionalComments: (obj, args, context, info) =>
			obj.additionalcomments,

		// Dates do not work with graphqlgen yet. It does not understand custom
		// scalers and thus it thinks that dates need to be resolved to strings.
		created: (obj, args, context, info) => obj.dateadded,

		author: (obj, args, context, info) => dataModel.getAuthorOfReview(obj),

		company: (obj, args, context, info) =>
			dataModel.getCompanyOfReview(obj),

		comments: (obj, args, context, info) =>
			dataModel.getCommentsByParent(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		votes: (obj, args, context, info) =>
			dataModel.getVotesBySubject(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		currentUserVote: (obj, args, context, info) =>
			context.user
				? dataModel.getVoteByAuthorAndSubject(context.user, obj)
				: null,
	},

	Salary: {
		...SalaryResolvers.defaultResolvers,

		id: (obj, args, context, info) =>
			dataModel.salaryIdToString(obj.salaryid),

		jobTitle: (obj, args, context, info) => obj.jobtitle,
		location: (obj, args, context, info) =>
			dataModel.parseLocationString(obj.salarylocation),
		incomeType: (obj, args, context, info) => obj.incometype,
		incomeAmount: (obj, args, context, info) => obj.incomeamount,

		// Dates do not work with graphqlgen yet. It does not understand custom
		// scalers and thus it thinks that dates need to be resolved to strings.
		created: (obj, args, context, info) => obj.dateadded,

		author: (obj, args, context, info) => dataModel.getAuthorOfSalary(obj),

		company: (obj, args, context, info) =>
			dataModel.getCompanyOfSalary(obj),
	},

	User: {
		...UserResolvers.defaultResolvers,

		id: (obj, args, context, info) => dataModel.userIdToString(obj._id),

		role: (obj, args, context, info) => {
			if (obj.role === "worker") return "WORKER";
			if (obj.role === "company-unverified") return "COMPANY_UNVERIFIED";
			if (obj.role === "company") return "COMPANY";
			throw Error("User role is not valid.");
		},

		// Dates do not work with graphqlgen yet. It does not understand custom
		// scalers and thus it thinks that dates need to be resolved to strings.
		created: (obj, args, context, info) => obj.createdAt,

		company: (obj, args, context, info) => dataModel.getCompanyOfUser(obj),

		reviews: (obj, args, context, info) =>
			dataModel.getReviewsByAuthor(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		comments: (obj, args, context, info) =>
			dataModel.getCommentsByAuthor(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		votes: (obj, args, context, info) =>
			dataModel.getVotesByAuthor(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),
	},

	VoteSubject: {
		__resolveType(
			obj: dataModel.VoteSubject,
			context: Context,
			info: GraphQLResolveInfo
		) {
			// In order to determine what type obj actualy is, we test for the
			// existance of fields that are unique to each of the types that obj
			// could be. Example: If obj has things that only comments have,
			// then obj is a comment. We also use type assertions to double
			// check that each of these tests are correct. See Flow's docs on
			// "type refinement" for more info.
			if ((<dataModel.Comment>obj)._id) {
				return "Comment";
			}

			if ((<dataModel.Review>obj).reviewid) {
				return "Review";
			}

			// It should be imposible to get here.
			// TODO throw a more informative error message.
			return null;
		},
	},

	Vote: {
		...VoteResolvers.defaultResolvers,

		id: (obj, args, context, info) =>
			dataModel.voteIdToString(dataModel.getIdOfVote(obj)),
		isUpvote: (obj, args, context, info) => obj.value,

		author: (obj, args, context, info) => dataModel.getAuthorOfVote(obj),

		subject: (obj, args, context, info) => dataModel.getSubjectOfVote(obj),
	},

	Location: {
		...LocationResolvers.defaultResolvers,
	},

	StarRatings: {
		...StarRatingsResolvers.defaultResolvers,
	},

	DateTime: GraphQLDateTime,
};

export default resolvers;
