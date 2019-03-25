import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from "./vote-buttons.scss";

function voteToCast(vote, isUpButton) {
	if (vote === null || vote.isUpvote === null) {
		return isUpButton;
	} else if (vote.isUpvote === isUpButton) {
		return null;
	} else {
		return isUpButton;
	}
}

export default function VoteButton({ isUpButton = false, castVote, review }) {
	const onClick = event => {
		event.preventDefault();

		castVote({
			variables: {
				input: {
					isUpvote: voteToCast(review.currentUserVote, isUpButton),
					subjectId: review.id,
				},
			},
		});
	};

	return (
		<button
			type="button"
			className={isUpButton ? style.upButton : style.downButton}
			onClick={onClick}
		>
			{isUpButton ? (
				<FontAwesomeIcon icon="thumbs-up" />
			) : (
				<FontAwesomeIcon icon="thumbs-down" flip="horizontal" />
			)}
		</button>
	);
}
