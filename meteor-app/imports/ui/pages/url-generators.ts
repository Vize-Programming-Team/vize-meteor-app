const queryRoutes = {
	resources: "recursos",
	companies: "companies",
	companyProfile: "companyprofile",
	writeReview: "write-review",
	submitSalaryData: "submit-salary-data",
	applyForJob: "apply-for-job",
	register: "register",
	login: "login",
	user: "user",
};

// exporting commonly-used URL generators
// in order to reduce the risk of typos
// and reduce the use of magic strings
const vizeArticleUrl = function(slug: string) {
	return `/${queryRoutes.resources}/articulo/${slug}`;
};
const vizeArticleTopicUrl = function(topicName: string) {
	return `/${queryRoutes.resources}/temas/${topicName}`;
};
const vizeProfileUrl = function(companyId) {
	return `/${queryRoutes.companyProfile}/?id=${companyId}`;
};
const vizeReviewUrl = function(companyName?: string) {
	return `/${queryRoutes.writeReview}/${
		companyName ? `?companyname=${encodeURIComponent(companyName)}` : ""
	}`;
};
const vizeSalaryUrl = function(companyName?: string) {
	return `/${queryRoutes.submitSalaryData}/${
		companyName ? `?companyname=${encodeURIComponent(companyName)}` : ""
	}`;
};
const vizeApplyForJobUrl = function(jobId) {
	return `/${queryRoutes.applyForJob}/?id=${jobId}`;
};
const vizeRegister = function(userRole?: string) {
	return `/${queryRoutes.register}/${
		userRole ? `?user=${encodeURIComponent(userRole)}` : ""
	}`;
};
const vizeLogin = function(userRole?: string) {
	return `/${queryRoutes.login}/${
		userRole ? `?user=${encodeURIComponent(userRole)}` : ""
	}`;
};
/*const vizeLoginToRegister = function(userRole?: string) {
	return `/${queryRoutes.login}/${
		userRole ? `?user=${encodeURIComponent(userRole)}` : ""
	}`;
};
const vizeRegisterToLogin = function(userRole?: string) {
	return `/${queryRoutes.login}/${
		userRole ? `?user=${encodeURIComponent(userRole)}` : ""
	}`;
};*/

const urlGenerators = {
	vizeArticleUrl,
	vizeArticleTopicUrl,
	vizeProfileUrl,
	vizeReviewUrl,
	vizeSalaryUrl,
	vizeApplyForJobUrl,
	vizeRegister,
	vizeLogin,
};

export { queryRoutes, urlGenerators };
