import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMapMarker,
	faMoneyBillAlt,
	faFileSignature,
	faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import colors from "src/colors";

import { forSize } from "src/responsive";
import * as urlGenerators from "src/pages/url-generators";
import { translations } from "src/translations";
import { JobPostingFragment } from "generated/graphql-operations";
import RatingsDropdown from "src/pages/company-profile/articles/ratings-dropdown";
const T = translations.legacyTranslationsNeedsRefactor;
import { JobSchedule } from "src/components/job-schedual";

const FontAwesomeIconSized = styled(FontAwesomeIcon)`
	width: 16px !important;
	height: 16px;
	margin-right: 10px;
`;

const JobContainer = styled.div`
	margin-top: 15px;
	margin-bottom: 15px;
	padding: 20px 30px;

	background-color: white;
	border-radius: 10px;
	box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);

	${forSize.tabletAndDown} {
		padding: 12px;
	}
`;

const ApplyNowButton = styled(Link)`
	background-color: ${colors.vizeBlue};
	color: white;
	font-weight: bold;
	border-radius: 6px;
	font-size: 15px;
	padding: 8px 15px;
	max-height: 40px;
	min-width: 110px;

	&:hover {
		color: white;
		filter: grayscale(80%);
	}
`;

const JobTitleAndApplyButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const DatePostedDiv = styled.div`
	float: right;
	margin-top: -32px;

	${forSize.tabletAndDown} {
		float: none;
		margin-top: 0px;
		text-align: center !important;
	}
`;

interface JobPostingProps {
	job: JobPostingFragment;
}

function JobPosting({ job }: JobPostingProps) {
	// @options -  For the date formatting
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	const datePosted = new Date(job.created);

	console.log(job);

	let contractType =
		job.contractType === "FULL_TIME" ? (
			<T.showjob.fullTime />
		) : job.contractType === "PART_TIME" ? (
			<T.showjob.partTime />
		) : job.contractType === "INTERNSHIP" ? (
			<T.showjob.internship />
		) : job.contractType === "TEMPORARY" ? (
			<T.showjob.temporary />
		) : (
			<T.showjob.contractor />
		);

	// True if there is a city and an industrial hub for a job
	const isTwoJobLocations =
		job.locations[0].city && job.locations[0].industrialHub;
	const showJobSchedule =
		(job.startTime && job.endTime) || (job.startDay && job.endDay);

	return (
		<JobContainer>
			<JobTitleAndApplyButtonContainer>
				<h3>
					<strong>{job.jobTitle}</strong>
				</h3>
				<ApplyNowButton to={urlGenerators.vizeApplyForJobUrl(job.id)}>
					<T.showjob.apply_now />
				</ApplyNowButton>
			</JobTitleAndApplyButtonContainer>
			<br />
			<h3 style={{ fontSize: "20px" }}>
				<Link to={urlGenerators.vizeCompanyProfileUrl(job.company.id)}>
					<strong>{job.company.name}</strong>
				</Link>
			</h3>

			{job.company.avgStarRatings &&
				job.company.avgStarRatings.benefits != 0 && (
					<RatingsDropdown
						ratings={job.company.avgStarRatings}
						numReviews={job.company.numReviews}
						companyName={job.company.id}
					/>
				)}
			<div>
				<FontAwesomeIconSized icon={faMapMarker} />
				{isTwoJobLocations && (
					<>
						{job.locations[0].city}&nbsp;&#8226;&nbsp;
						{job.locations[0].industrialHub}
					</>
				)}
			</div>
			<div>
				<FontAwesomeIconSized icon={faMoneyBillAlt} />
				{job.salaryMin === job.salaryMax ? (
					job.salaryMin
				) : (
					<>
						{"$"}
						{job.salaryMin} - {"$"}
						{job.salaryMax}
					</>
				)}{" "}
				{
					{
						YEARLY_SALARY: <T.showjob.year />,
						MONTHLY_SALARY: <T.showjob.month />,
						WEEKLY_SALARY: <T.showjob.week />,
						DAILY_SALARY: <T.showjob.day />,
						HOURLY_WAGE: <T.showjob.hour />,
					}[job.salaryType]
				}
			</div>
			<div>
				<FontAwesomeIconSized icon={faFileSignature} />
				{contractType}
			</div>

			{showJobSchedule && (
				<div>
					<FontAwesomeIconSized icon={faClock} />
					<JobSchedule
						startTime={job.startTime}
						endTime={job.endTime}
						startDay={job.startDay}
						endDay={job.endDay}
					/>
				</div>
			)}

			<hr />
			<h4 className="h4-font-sz-job">
				<T.showjob.job_description />
			</h4>
			<div className="h4-font-sz">
				<article>
					<p>{job.jobDescription}</p>
					<input
						id={job.id}
						className="read-more-toggle"
						type="checkbox"
					/>
					<div className="read-more-content">
						<br />
						<h4>
							<T.showjob.qualifications />
						</h4>
						<p>{job.qualifications} </p>
						<br />
						<div>
							<h4>
								<T.showjob.responsibilities />
							</h4>
							<p>{job.responsibilities}</p>
						</div>
					</div>

					<label className="read-more-toggle-label" htmlFor={job.id}>
						{" "}
					</label>
					<DatePostedDiv>
						<p>
							<T.showjob.posted_on />{" "}
							{datePosted.toLocaleDateString("es-MX", options)}
						</p>
					</DatePostedDiv>
				</article>
			</div>
		</JobContainer>
	);
}

export default JobPosting;
