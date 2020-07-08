import React from "react";

function disableGlobalStyle(disabled: boolean) {
	const styleLinks = document.getElementsByClassName("__meteor-css__");

	for (let i = 0; i < styleLinks.length; ++i) {
		//@ts-ignore
		styleLinks[i].disabled = disabled;
	}
}

/**
 * A component that dissables the global style sheet when it is rendered.
 */
export default function NoGlobalStyle() {
	React.useEffect(() => {
		disableGlobalStyle(true);
		return () => {
			disableGlobalStyle(false);
		};
	});

	return null;
}