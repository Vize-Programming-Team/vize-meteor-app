-- company review statistics -> calculated on companies, from reviews
DROP VIEW IF EXISTS company_review_statistics CASCADE;
CREATE OR REPLACE VIEW company_review_statistics AS

select

	companyname as name,
	count(companyname) as numreviews,
	avg(nummonthsworked) as avgnummonthsworked,
	avg(wouldrecommend::int) as percentrecommended,
	avg(healthandsafety) as healthandsafety,
	avg(managerrelationship) as managerrelationship,
	avg(workenvironment) as workenvironment,
	avg(benefits) as benefits,
	avg(overallsatisfaction) overallsatisfaction

from

	reviews

group by

	companyname;

-- company salary statistics -> calculated on companies, from salaries
-- NOTE this view is meant to directly satisfy a prototype page
-- that Julian gave me, which ignores both location and pay type
DROP VIEW IF EXISTS company_salary_statistics CASCADE;
CREATE OR REPLACE VIEW company_salary_statistics AS

select

	companyname,jobtitle,
	total_avg_pay,total_max_pay,total_min_pay,
	male_avg_pay,male_max_pay,male_min_pay,
	female_avg_pay,female_max_pay,female_min_pay

from

	(select
		companyname,jobtitle,
		avg(incomeamount) as total_avg_pay,
		max(incomeamount) as total_max_pay,
		min(incomeamount) as total_min_pay
	from
		salaries
	group by
		companyname,jobtitle) as total_pay_stats

	NATURAL FULL OUTER JOIN

	(select
		companyname,jobtitle,
		avg(incomeamount) as male_avg_pay,
		max(incomeamount) as male_max_pay,
		min(incomeamount) as male_min_pay
	from
		salaries
	where
		gender='Male'
	group by
		companyname,jobtitle) as male_pay_stats

	NATURAL FULL OUTER JOIN

	(select
		companyname,jobtitle,
		avg(incomeamount) as female_avg_pay,
		max(incomeamount) as female_max_pay,
		min(incomeamount) as female_min_pay
	from
		salaries
	where
		gender='Female'
	group by
		companyname,jobtitle) as female_pay_stats;

-- review upvotes and downvotes -> calculated on reviews, from votes
DROP VIEW IF EXISTS review_vote_counts CASCADE;
CREATE OR REPLACE VIEW review_vote_counts AS

select

	refersto,
	zero_if_null(upvotes) as upvotes,
	zero_if_null(downvotes) as downvotes

from

	(select refersto,count(value) as upvotes from review_votes
	group by refersto,value
	having value='t') as votes1

	NATURAL FULL OUTER JOIN

	(select refersto,count(value) as downvotes from review_votes
	group by refersto,value
	having value='f') as votes2;

-- comment upvotes and downvotes -> calculated on review_comments, from votes
DROP VIEW IF EXISTS comment_vote_counts CASCADE;
CREATE OR REPLACE VIEW comment_vote_counts AS

select

	refersto,
	zero_if_null(upvotes) as upvotes,
	zero_if_null(downvotes) as downvotes

from

	(select refersto,count(value) as upvotes from comment_votes
	group by refersto,value
	having value='t') as votes1

	NATURAL FULL OUTER JOIN

	(select refersto,count(value) as downvotes from comment_votes
	group by refersto,value
	having value='f') as votes2;

-- job ad counts, can be used to more easily check whether
-- companies are over their limit
DROP VIEW IF EXISTS job_post_counts CASCADE;
CREATE OR REPLACE VIEW job_post_counts AS

select

	companyname,
	count(jobadid) as count

from

	jobads

group by

	companyname;