import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";

/** The diameter of a vote button in px. */
const buttonDiameter = 70;

const Button = styled.button`
	height: ${buttonDiameter}px;
	width: ${buttonDiameter}px;
	border-radius: ${buttonDiameter / 2}px;
	border: 0.833333px solid grey;
	display: block;
	background-color: white;

	${props => {
		if (props.disabled) {
			return css`
				color: lightgrey;
				border-color: lightgrey;
			`;
		}

		if (props.isActive) {
			return css`
				color: white;
				background-color: ${props.isUpButton ? "green" : "red"};
				border: 0;
			`;
		}

		return css`
			color: dimgrey;
			border-color: dimgrey;
		`;
	}};

	/* Style the emoji thumbs in the buttons. */
	font-size: 29px;
	text-align: center;
	vertical-align: middle;

	/* Make the button's icon larger when it's hovered. */
	transition: font-size 0.1s;
	:hover {
		font-size: 35px;
	}

	@media (max-width: 768px) {
		display: inline-block;
		margin: 0 5px;
	}
`;

/**
 * A single vote button. Is either an upvote button or a downvote button.
 */
function VoteButton(props) {
	// Unpack props for easier access.
	// Things like props.review.currentUserVote.isUpvote are hard to read.
	const { isUpButton = false, castVote, review } = props;
	const { currentUserVote: vote } = review;

	// If this button was not given a vote, it is disabled.
	const disabled = vote === null;

	// If the user has already voted this way, then the button should show that
	// and allow them to undo/remove their vote.
	const isActive = disabled ? false : vote.isUpvote === isUpButton;

	/** The function that casts a vote when this button is clicked. */
	const onClick = event => {
		event.preventDefault();

		// A disabled button should not do anything.
		if (disabled) {
			return;
		}

		/** The vote we are casting.
		 * true: voting up
		 * false: voting down
		 * null: remove the vote
		 */
		const isCastingUpvote = isActive ? null : isUpButton;

		castVote({
			variables: {
				input: {
					isUpvote: isCastingUpvote,
					subjectId: review.id,
				},
			},
			optimisticResponse: {
				__typename: "Mutation",
				castVote: {
					__typename: "CastVotePayload",
					vote: {
						__typename: "Vote",
						id: vote.id,
						isUpvote: isCastingUpvote,
					},
				},
			},
		});
	};

	return (
		<Button
			type="button"
			isUpButton={isUpButton}
			disabled={disabled}
			isActive={isActive}
			onClick={onClick}
		>
			{isUpButton ? (
				<FontAwesomeIcon icon="thumbs-up" />
			) : (
				<FontAwesomeIcon icon="thumbs-down" flip="horizontal" />
			)}
		</Button>
	);
}

export default VoteButton;
