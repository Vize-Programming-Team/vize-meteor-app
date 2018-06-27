\i server/sql/wipedb.sql;
\i server/sql/init/init-db.sql
START TRANSACTION;
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('a', '1 - 50', 'example@gmail.com', 'https://example.com',0);
INSERT INTO company_locations(companyId,locationName) VALUES (1,'somewhere over the rainbow'),(1,'hello world'),(1,'anotherwhere'),(1,'movin right along');
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('b', '1 - 50', 'example@gmail.com', 'https://example.com',0);
INSERT INTO company_locations(companyId,locationName) VALUES (2,'somewhere over the rainbow'),(2,'hello world'),(2,'anotherwhere'),(2,'movin right along');
INSERT INTO reviews
(submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (0,'a','a','a',0,
			'a a a a a','a a a a a',FALSE,
			0,0,0,0,0,'Hello world!');
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (1,'hello world');
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (1,'anotherwhere');
INSERT INTO reviews
(submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (0,'b','a','a',0,
			'a a a a a','a a a a a',FALSE,
			0,0,0,0,0,'Hello world!');
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (2,'somewhere over the rainbow');

INSERT INTO review_comments (reviewId,submittedBy,content) VALUES (1,0,'hello world');

INSERT INTO reviews
(reviewId,submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (3,0,'a','a','a',2,
			'a a a a a','a a a a a',TRUE,
			1,2,3,4,0,'Hello world!');
INSERT INTO reviews
(reviewId,submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (4,1,'a','a','a',3,
			'a a a a a','a a a a a',TRUE,
			1,2,3,4,0,'Hello world!');
INSERT INTO reviews
(reviewId,submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (5,2,'a','a','a',4,
			'a a a a a','a a a a a',TRUE,
			1,2,3,4,0,'Hello world!');
INSERT INTO reviews
(reviewId,submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (6,3,'a','a','a',5,
			'a a a a a','a a a a a',FALSE,
			1,2,3,4,0,'Hello world!');
INSERT INTO reviews
(reviewId,submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (7,4,'a','a','a',6,
			'a a a a a','a a a a a',FALSE,
			2,3,4,5,1,'Hello world!');
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (3,'somewhere over the rainbow');
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (4,'somewhere over the rainbow');
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (5,'somewhere over the rainbow');
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (6,'somewhere over the rainbow');
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (7,'somewhere over the rainbow');

INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (99,1,'t');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (99,1,'t');
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (100,1,'f');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (100,1,'t');
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (101,1,'t');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (101,1,'f');
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (102,1,'f');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (102,1,'f');
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (103,2,'f');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (103,1,'t');

INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a','1.00','Part time','a','a','a');
INSERT INTO job_locations (jobadId,jobLocation) VALUES (1,'hello world');
INSERT INTO job_locations (jobadId,jobLocation) VALUES (1,'anotherwhere');
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('b','a','1.00','Part time','a','a','a');
INSERT INTO job_locations (jobadId,jobLocation) VALUES (2,'somewhere over the rainbow');

INSERT INTO salaries
(submittedBy,companyName,
	jobTitle,incomeType,incomeAmount)
	VALUES
	(0,'a','a','Hourly Wage',10),
	(1,'a','a','Hourly Wage',15),
	(2,'a','a','Hourly Wage',40);

COMMIT;
