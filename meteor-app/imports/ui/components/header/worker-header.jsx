import React from "react";
import { Link } from "react-router-dom";

import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";
import { withTracker } from "meteor/react-meteor-data";

import { If, Then, Else } from "/imports/ui/if-else.jsx";
import LangSelector from "./lang-selector.jsx";

const T = i18n.createComponent();

class WorkerHeader extends React.Component {
	render() {
		return (
			<div className="top-nav">
				<nav>
					<div className="container">
						<div className="navbar-header logo">
							<button
								type="button"
								className="navbar-toggle collapsed slide-toggle "
								data-toggle="collapse"
								data-target="#bs-example-navbar-collapse-1"
							>
								<span className="sr-only">
									Toggle navigation
								</span>
								<span className="icon-bar" />
								<span className="icon-bar" />
								<span className="icon-bar" />
							</button>
							<h2 className="site-logo">
								<Link to="/">
									<img src="/images/logo.png" />
								</Link>
							</h2>
						</div>
						<div
							className="collapse navbar-collapse"
							id="bs-example-navbar-collapse-1"
						>
							<ul className="nav navbar-nav left_nav">
								<li>
									<If cond={this.props.isLoggedIn}>
										<Then>
											<Link
												to="/my-account"
												type="button"
												className="toggle-only-display btn navbar-btn margin-right btn-green hvr-icon-forward"
											>
												<T>common.header.myaccount</T>
											</Link>
										</Then>
										<Else>
											<Link
												to="/login"
												type="button"
												className="toggle-only-display btn navbar-btn margin-right btn-green hvr-icon-forward"
											>
												<span>
													<T>
														common.header.signup_or_login
													</T>
												</span>
											</Link>
										</Else>
									</If>
								</li>
								<li>
									<Link
										to="/companies"
										className="link-kumya "
									>
										<span>
											<T>common.header.companies</T>
										</span>
									</Link>
								</li>
								<li>
									<Link to="/jobs" className="link-kumya">
										<span>
											<T>common.header.jobs</T>
										</span>
									</Link>
								</li>
								<li>
									<Link
										to="/worker-resources"
										className="link-kumya"
									>
										<span>
											<T>common.header.resources</T>
										</span>
									</Link>
								</li>
							</ul>
							<ul className="nav navbar-nav navbar-right">
								<If cond={this.props.isLoggedIn}>
									<Then>
										<li className="navigation-only-display dropdown pf  show-on-hover-pf">
											<Link
												to="#"
												className="dropdown-toggle  "
												data-toggle="dropdown"
											>
												<img
													src="images/profileIcon.png"
													className="img-responsive  dp-profile"
												/>{" "}
											</Link>
											<ul className="dropdown-menu pf">
												<li className="tr">
													<Link
														to="/my-account"
														className="navbar-link margin-right"
													>
														<T>
															common.header.myaccount
														</T>
													</Link>
												</li>
												<li className="tr">
													<a
														onClick={Meteor.logout}
														className="navbar-link margin-right"
														style={{
															cursor: "pointer",
														}}
													>
														<T>
															common.header.logout
														</T>
													</a>
												</li>
											</ul>
										</li>
									</Then>
									<Else>
										<li>
											<Link
												to="/register"
												type="button"
												id="register-button"
												className="btn navbar-btn margin-right btn-green hvr-icon-forward"
											>
												<T>common.header.signup</T>
											</Link>
										</li>
										<li>
											<Link
												to="/login"
												className="navbar-link margin-right"
											>
												<T>common.header.login</T>
											</Link>
										</li>
									</Else>
								</If>

								<li className="dropdown">
									<LangSelector />
								</li>
								<li>
									<Link
										to="/foremployers"
										className="link-kumya"
									>
										<span>
											<T>common.header.for_employers</T>
										</span>
									</Link>
								</li>
								<br />
								<If cond={this.props.isLoggedIn}>
									<Then>
										<li>
											<a
												onClick={Meteor.logout}
												className="toggle-only-display navbar-link margin-right"
												style={{ cursor: "pointer" }}
											>
												<T>common.header.logout</T>
											</a>
										</li>
									</Then>
									<Else> </Else>
								</If>
							</ul>
							<div className="clearfix" />
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

export default withTracker(() => ({
	isLoggedIn: Meteor.userId() !== null,
}))(WorkerHeader);
