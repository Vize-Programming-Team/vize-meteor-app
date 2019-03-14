// Code generated by github.com/prisma/graphqlgen, DO NOT EDIT.

import { GraphQLResolveInfo } from "graphql";
import { User } from "../models/user";
import { Location } from "../models/location";
import { StarRatings } from "../models/misc";
import { Review } from "../models/review";
import { Comment } from "../models/comment";
import { JobAd } from "../models/job-ad";
import { Salary } from "../models/salary";
import { Context } from "./resolvers";

export type UserRole = "WORKER" | "COMPANY" | "COMPANY_UNVERIFIED";
export type RewardStatus = "CAN_EARN" | "CAN_CLAIM" | "CLAIMED" | "INELEGABLE";
export type PaymentMethod = "PAYPAL" | "XOOM";

export namespace QueryResolvers {
	export const defaultResolvers = {};

	export interface ArgsAllComments {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export interface ArgsAllCompanies {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export interface ArgsAllJobAds {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export interface ArgsAllReviews {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export interface ArgsAllSalaries {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export interface ArgsAllUsers {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export interface ArgsAllVotes {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export interface ArgsComment {
		id: string;
	}

	export interface ArgsCompany {
		id: string;
	}

	export interface ArgsJobAd {
		id: string;
	}

	export interface ArgsReview {
		id: string;
	}

	export interface ArgsSalary {
		id: string;
	}

	export interface ArgsUser {
		id: string;
	}

	export interface ArgsVote {
		id: string;
	}

	export interface ArgsSearchCompanies {
		searchText?: string | null;
		pageSize?: number | null;
		pageNum?: number | null;
	}

	export type SayResolver = (
		parent: undefined,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type CurrentUserResolver = (
		parent: undefined,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => User | null | Promise<User | null>;

	export type AllCommentsResolver = (
		parent: undefined,
		args: ArgsAllComments,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Comment[] | Promise<Comment[]>;

	export type AllCompaniesResolver = (
		parent: undefined,
		args: ArgsAllCompanies,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Company[] | Promise<Company[]>;

	export type AllJobAdsResolver = (
		parent: undefined,
		args: ArgsAllJobAds,
		ctx: Context,
		info: GraphQLResolveInfo
	) => JobAd[] | Promise<JobAd[]>;

	export type AllReviewsResolver = (
		parent: undefined,
		args: ArgsAllReviews,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Review[] | Promise<Review[]>;

	export type AllSalariesResolver = (
		parent: undefined,
		args: ArgsAllSalaries,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Salary[] | Promise<Salary[]>;

	export type AllUsersResolver = (
		parent: undefined,
		args: ArgsAllUsers,
		ctx: Context,
		info: GraphQLResolveInfo
	) => User[] | Promise<User[]>;

	export type AllVotesResolver = (
		parent: undefined,
		args: ArgsAllVotes,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Vote[] | Promise<Vote[]>;

	export type CommentResolver = (
		parent: undefined,
		args: ArgsComment,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Comment | null | Promise<Comment | null>;

	export type CompanyResolver = (
		parent: undefined,
		args: ArgsCompany,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Company | null | Promise<Company | null>;

	export type JobAdResolver = (
		parent: undefined,
		args: ArgsJobAd,
		ctx: Context,
		info: GraphQLResolveInfo
	) => JobAd | null | Promise<JobAd | null>;

	export type ReviewResolver = (
		parent: undefined,
		args: ArgsReview,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Review | null | Promise<Review | null>;

	export type SalaryResolver = (
		parent: undefined,
		args: ArgsSalary,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Salary | null | Promise<Salary | null>;

	export type UserResolver = (
		parent: undefined,
		args: ArgsUser,
		ctx: Context,
		info: GraphQLResolveInfo
	) => User | null | Promise<User | null>;

	export type VoteResolver = (
		parent: undefined,
		args: ArgsVote,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Vote | null | Promise<Vote | null>;

	export type SearchCompaniesResolver = (
		parent: undefined,
		args: ArgsSearchCompanies,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Company[] | Promise<Company[]>;

	export type WroteAReviewResolver = (
		parent: undefined,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => RewardStatus | Promise<RewardStatus>;

	export interface Type {
		say: (
			parent: undefined,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		currentUser: (
			parent: undefined,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => User | null | Promise<User | null>;

		allComments: (
			parent: undefined,
			args: ArgsAllComments,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Comment[] | Promise<Comment[]>;

		allCompanies: (
			parent: undefined,
			args: ArgsAllCompanies,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Company[] | Promise<Company[]>;

		allJobAds: (
			parent: undefined,
			args: ArgsAllJobAds,
			ctx: Context,
			info: GraphQLResolveInfo
		) => JobAd[] | Promise<JobAd[]>;

		allReviews: (
			parent: undefined,
			args: ArgsAllReviews,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Review[] | Promise<Review[]>;

		allSalaries: (
			parent: undefined,
			args: ArgsAllSalaries,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Salary[] | Promise<Salary[]>;

		allUsers: (
			parent: undefined,
			args: ArgsAllUsers,
			ctx: Context,
			info: GraphQLResolveInfo
		) => User[] | Promise<User[]>;

		allVotes: (
			parent: undefined,
			args: ArgsAllVotes,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Vote[] | Promise<Vote[]>;

		comment: (
			parent: undefined,
			args: ArgsComment,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Comment | null | Promise<Comment | null>;

		company: (
			parent: undefined,
			args: ArgsCompany,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Company | null | Promise<Company | null>;

		jobAd: (
			parent: undefined,
			args: ArgsJobAd,
			ctx: Context,
			info: GraphQLResolveInfo
		) => JobAd | null | Promise<JobAd | null>;

		review: (
			parent: undefined,
			args: ArgsReview,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Review | null | Promise<Review | null>;

		salary: (
			parent: undefined,
			args: ArgsSalary,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Salary | null | Promise<Salary | null>;

		user: (
			parent: undefined,
			args: ArgsUser,
			ctx: Context,
			info: GraphQLResolveInfo
		) => User | null | Promise<User | null>;

		vote: (
			parent: undefined,
			args: ArgsVote,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Vote | null | Promise<Vote | null>;

		searchCompanies: (
			parent: undefined,
			args: ArgsSearchCompanies,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Company[] | Promise<Company[]>;

		wroteAReview: (
			parent: undefined,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => RewardStatus | Promise<RewardStatus>;
	}
}

export namespace UserResolvers {
	export const defaultResolvers = {
		username: (parent: User) => parent.username,
	};

	export interface ArgsReviews {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export interface ArgsComments {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export interface ArgsVotes {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export type IdResolver = (
		parent: User,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type UsernameResolver = (
		parent: User,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type RoleResolver = (
		parent: User,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => UserRole | Promise<UserRole>;

	export type CreatedResolver = (
		parent: User,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type CompanyResolver = (
		parent: User,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Company | null | Promise<Company | null>;

	export type ReviewsResolver = (
		parent: User,
		args: ArgsReviews,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Review[] | null | Promise<Review[] | null>;

	export type CommentsResolver = (
		parent: User,
		args: ArgsComments,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Comment[] | Promise<Comment[]>;

	export type VotesResolver = (
		parent: User,
		args: ArgsVotes,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Vote[] | Promise<Vote[]>;

	export interface Type {
		id: (
			parent: User,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		username: (
			parent: User,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		role: (
			parent: User,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => UserRole | Promise<UserRole>;

		created: (
			parent: User,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		company: (
			parent: User,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => Company | null | Promise<Company | null>;

		reviews: (
			parent: User,
			args: ArgsReviews,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Review[] | null | Promise<Review[] | null>;

		comments: (
			parent: User,
			args: ArgsComments,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Comment[] | Promise<Comment[]>;

		votes: (
			parent: User,
			args: ArgsVotes,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Vote[] | Promise<Vote[]>;
	}
}

export namespace CompanyResolvers {
	export const defaultResolvers = {};

	export interface ArgsReviews {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export interface ArgsJobAds {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export interface ArgsSalaries {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export type IdResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type NameResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type ContactEmailResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type YearEstablishedResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | null | Promise<number | null>;

	export type NumEmployeesResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	export type IndustryResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	export type LocationsResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Location[] | Promise<Location[]>;

	export type ContactPhoneNumberResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	export type WebsiteURLResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	export type DescriptionOfCompanyResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	export type DateJoinedResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	export type NumFlagsResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | null | Promise<number | null>;

	export type AvgStarRatingsResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => StarRatings | null | Promise<StarRatings | null>;

	export type PercentRecommendedResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | null | Promise<number | null>;

	export type AvgNumMonthsWorkedResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | null | Promise<number | null>;

	export type ReviewsResolver = (
		parent: Company,
		args: ArgsReviews,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Review[] | Promise<Review[]>;

	export type NumReviewsResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	export type JobAdsResolver = (
		parent: Company,
		args: ArgsJobAds,
		ctx: Context,
		info: GraphQLResolveInfo
	) => JobAd[] | Promise<JobAd[]>;

	export type NumJobAdsResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	export type SalariesResolver = (
		parent: Company,
		args: ArgsSalaries,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Salary[] | Promise<Salary[]>;

	export type NumSalariesResolver = (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	export interface Type {
		id: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		name: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		contactEmail: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		yearEstablished: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => number | null | Promise<number | null>;

		numEmployees: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | null | Promise<string | null>;

		industry: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | null | Promise<string | null>;

		locations: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => Location[] | Promise<Location[]>;

		contactPhoneNumber: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | null | Promise<string | null>;

		websiteURL: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | null | Promise<string | null>;

		descriptionOfCompany: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | null | Promise<string | null>;

		dateJoined: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | null | Promise<string | null>;

		numFlags: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => number | null | Promise<number | null>;

		avgStarRatings: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => StarRatings | null | Promise<StarRatings | null>;

		percentRecommended: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => number | null | Promise<number | null>;

		avgNumMonthsWorked: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => number | null | Promise<number | null>;

		reviews: (
			parent: Company,
			args: ArgsReviews,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Review[] | Promise<Review[]>;

		numReviews: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => number | Promise<number>;

		jobAds: (
			parent: Company,
			args: ArgsJobAds,
			ctx: Context,
			info: GraphQLResolveInfo
		) => JobAd[] | Promise<JobAd[]>;

		numJobAds: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => number | Promise<number>;

		salaries: (
			parent: Company,
			args: ArgsSalaries,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Salary[] | Promise<Salary[]>;

		numSalaries: (
			parent: Company,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => number | Promise<number>;
	}
}

export namespace LocationResolvers {
	export const defaultResolvers = {
		city: (parent: Location) => parent.city,
		address: (parent: Location) => parent.address,
		industrialHub: (parent: Location) =>
			parent.industrialHub === undefined ? null : parent.industrialHub,
	};

	export type CityResolver = (
		parent: Location,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type AddressResolver = (
		parent: Location,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type IndustrialHubResolver = (
		parent: Location,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	export interface Type {
		city: (
			parent: Location,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		address: (
			parent: Location,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		industrialHub: (
			parent: Location,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | null | Promise<string | null>;
	}
}

export namespace StarRatingsResolvers {
	export const defaultResolvers = {
		healthAndSafety: (parent: StarRatings) => parent.healthAndSafety,
		managerRelationship: (parent: StarRatings) =>
			parent.managerRelationship,
		workEnvironment: (parent: StarRatings) => parent.workEnvironment,
		benefits: (parent: StarRatings) => parent.benefits,
		overallSatisfaction: (parent: StarRatings) =>
			parent.overallSatisfaction,
	};

	export type HealthAndSafetyResolver = (
		parent: StarRatings,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	export type ManagerRelationshipResolver = (
		parent: StarRatings,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	export type WorkEnvironmentResolver = (
		parent: StarRatings,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	export type BenefitsResolver = (
		parent: StarRatings,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	export type OverallSatisfactionResolver = (
		parent: StarRatings,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	export interface Type {
		healthAndSafety: (
			parent: StarRatings,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => number | Promise<number>;

		managerRelationship: (
			parent: StarRatings,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => number | Promise<number>;

		workEnvironment: (
			parent: StarRatings,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => number | Promise<number>;

		benefits: (
			parent: StarRatings,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => number | Promise<number>;

		overallSatisfaction: (
			parent: StarRatings,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => number | Promise<number>;
	}
}

export namespace ReviewResolvers {
	export const defaultResolvers = {
		pros: (parent: Review) => parent.pros,
		cons: (parent: Review) => parent.cons,
		upvotes: (parent: Review) => parent.upvotes,
		downvotes: (parent: Review) => parent.downvotes,
	};

	export interface ArgsComments {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export interface ArgsVotes {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export type IdResolver = (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type TitleResolver = (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type JobTitleResolver = (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type LocationResolver = (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Location | Promise<Location>;

	export type NumberOfMonthsWorkedResolver = (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	export type ProsResolver = (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type ConsResolver = (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type WouldRecommendToOtherJobSeekersResolver = (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => boolean | Promise<boolean>;

	export type StarRatingsResolver = (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => StarRatings | Promise<StarRatings>;

	export type AdditionalCommentsResolver = (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	export type CreatedResolver = (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	export type UpvotesResolver = (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | null | Promise<number | null>;

	export type DownvotesResolver = (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | null | Promise<number | null>;

	export type AuthorResolver = (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => User | Promise<User>;

	export type CompanyResolver = (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Company | Promise<Company>;

	export type CommentsResolver = (
		parent: Review,
		args: ArgsComments,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Comment[] | Promise<Comment[]>;

	export type VotesResolver = (
		parent: Review,
		args: ArgsVotes,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Vote[] | Promise<Vote[]>;

	export type CurrentUserVoteResolver = (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Vote | null | Promise<Vote | null>;

	export interface Type {
		id: (
			parent: Review,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		title: (
			parent: Review,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		jobTitle: (
			parent: Review,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		location: (
			parent: Review,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => Location | Promise<Location>;

		numberOfMonthsWorked: (
			parent: Review,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => number | Promise<number>;

		pros: (
			parent: Review,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		cons: (
			parent: Review,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		wouldRecommendToOtherJobSeekers: (
			parent: Review,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => boolean | Promise<boolean>;

		starRatings: (
			parent: Review,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => StarRatings | Promise<StarRatings>;

		additionalComments: (
			parent: Review,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | null | Promise<string | null>;

		created: (
			parent: Review,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | null | Promise<string | null>;

		upvotes: (
			parent: Review,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => number | null | Promise<number | null>;

		downvotes: (
			parent: Review,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => number | null | Promise<number | null>;

		author: (
			parent: Review,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => User | Promise<User>;

		company: (
			parent: Review,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => Company | Promise<Company>;

		comments: (
			parent: Review,
			args: ArgsComments,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Comment[] | Promise<Comment[]>;

		votes: (
			parent: Review,
			args: ArgsVotes,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Vote[] | Promise<Vote[]>;

		currentUserVote: (
			parent: Review,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => Vote | null | Promise<Vote | null>;
	}
}

export namespace CommentResolvers {
	export const defaultResolvers = {
		content: (parent: Comment) => parent.content,
	};

	export interface ArgsChildren {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export interface ArgsVotes {
		pageNum?: number | null;
		pageSize?: number | null;
	}

	export type IdResolver = (
		parent: Comment,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type ContentResolver = (
		parent: Comment,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type CreatedResolver = (
		parent: Comment,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	export type AuthorResolver = (
		parent: Comment,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => User | Promise<User>;

	export type ParentResolver = (
		parent: Comment,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => {} | Promise<{}>;

	export type ChildrenResolver = (
		parent: Comment,
		args: ArgsChildren,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Comment[] | Promise<Comment[]>;

	export type VotesResolver = (
		parent: Comment,
		args: ArgsVotes,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Vote[] | Promise<Vote[]>;

	export interface Type {
		id: (
			parent: Comment,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		content: (
			parent: Comment,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		created: (
			parent: Comment,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | null | Promise<string | null>;

		author: (
			parent: Comment,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => User | Promise<User>;

		parent: (
			parent: Comment,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => {} | Promise<{}>;

		children: (
			parent: Comment,
			args: ArgsChildren,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Comment[] | Promise<Comment[]>;

		votes: (
			parent: Comment,
			args: ArgsVotes,
			ctx: Context,
			info: GraphQLResolveInfo
		) => Vote[] | Promise<Vote[]>;
	}
}

export namespace VoteResolvers {
	export const defaultResolvers = {};

	export type IdResolver = (
		parent: Vote,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type IsUpvoteResolver = (
		parent: Vote,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => boolean | Promise<boolean>;

	export type AuthorResolver = (
		parent: Vote,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => User | Promise<User>;

	export type SubjectResolver = (
		parent: Vote,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => {} | Promise<{}>;

	export interface Type {
		id: (
			parent: Vote,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		isUpvote: (
			parent: Vote,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => boolean | Promise<boolean>;

		author: (
			parent: Vote,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => User | Promise<User>;

		subject: (
			parent: Vote,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => {} | Promise<{}>;
	}
}

export namespace JobAdResolvers {
	export const defaultResolvers = {
		responsibilities: (parent: JobAd) => parent.responsibilities,
		qualifications: (parent: JobAd) => parent.qualifications,
	};

	export type IdResolver = (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type JobTitleResolver = (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type LocationsResolver = (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Location[] | Promise<Location[]>;

	export type PesosPerHourResolver = (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type ContractTypeResolver = (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type JobDescriptionResolver = (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type ResponsibilitiesResolver = (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type QualificationsResolver = (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type CreatedResolver = (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	export type CompanyResolver = (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Company | Promise<Company>;

	export interface Type {
		id: (
			parent: JobAd,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		jobTitle: (
			parent: JobAd,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		locations: (
			parent: JobAd,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => Location[] | Promise<Location[]>;

		pesosPerHour: (
			parent: JobAd,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		contractType: (
			parent: JobAd,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		jobDescription: (
			parent: JobAd,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		responsibilities: (
			parent: JobAd,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		qualifications: (
			parent: JobAd,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		created: (
			parent: JobAd,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | null | Promise<string | null>;

		company: (
			parent: JobAd,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => Company | Promise<Company>;
	}
}

export namespace SalaryResolvers {
	export const defaultResolvers = {};

	export type IdResolver = (
		parent: Salary,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type JobTitleResolver = (
		parent: Salary,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type LocationResolver = (
		parent: Salary,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Location | Promise<Location>;

	export type IncomeTypeResolver = (
		parent: Salary,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	export type IncomeAmountResolver = (
		parent: Salary,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	export type CreatedResolver = (
		parent: Salary,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	export type AuthorResolver = (
		parent: Salary,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => User | Promise<User>;

	export type CompanyResolver = (
		parent: Salary,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Company | Promise<Company>;

	export interface Type {
		id: (
			parent: Salary,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		jobTitle: (
			parent: Salary,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		location: (
			parent: Salary,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => Location | Promise<Location>;

		incomeType: (
			parent: Salary,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | Promise<string>;

		incomeAmount: (
			parent: Salary,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => number | Promise<number>;

		created: (
			parent: Salary,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => string | null | Promise<string | null>;

		author: (
			parent: Salary,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => User | Promise<User>;

		company: (
			parent: Salary,
			args: {},
			ctx: Context,
			info: GraphQLResolveInfo
		) => Company | Promise<Company>;
	}
}

export namespace MutationResolvers {
	export const defaultResolvers = {};

	export interface ArgsClaimWroteAReview {
		phoneNumber: string;
		paymentMethod: PaymentMethod;
	}

	export type ClaimWroteAReviewResolver = (
		parent: undefined,
		args: ArgsClaimWroteAReview,
		ctx: Context,
		info: GraphQLResolveInfo
	) => RewardStatus | Promise<RewardStatus>;

	export interface Type {
		claimWroteAReview: (
			parent: undefined,
			args: ArgsClaimWroteAReview,
			ctx: Context,
			info: GraphQLResolveInfo
		) => RewardStatus | Promise<RewardStatus>;
	}
}

export interface Resolvers {
	Query: QueryResolvers.Type;
	User: UserResolvers.Type;
	Company: CompanyResolvers.Type;
	Location: LocationResolvers.Type;
	StarRatings: StarRatingsResolvers.Type;
	Review: ReviewResolvers.Type;
	Comment: CommentResolvers.Type;
	Vote: VoteResolvers.Type;
	JobAd: JobAdResolvers.Type;
	Salary: SalaryResolvers.Type;
	Mutation: MutationResolvers.Type;
}
