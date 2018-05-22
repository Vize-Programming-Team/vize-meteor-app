import { Meteor } from "meteor/meteor";
import { $ } from "meteor/jquery";

/* The FlowRouter is automaticaly initialized on Meteor.startup.
 * The routes only need to be imported here. No other code is needed.
 */
import "../imports/startup/client/router.jsx";

Meteor.startup(() => {
	$.getScript("js/prettySticky.js", function() {});
	$.getScript("js/bootstrap-multiselect.js", function() {});
});
