import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { forSize } from "src/responsive";
import * as urlGenerators from "src/pages/url-generators";
import { useJobApplicationSubmittedQuery } from "generated/graphql-operations";
import ClipboardIcon from "@material-ui/icons/Assignment";
import ClipboardCopiedIcon from "@material-ui/icons/AssignmentTurnedIn";

import { useUser } from "src/hoc/user";
import PageWrapper from "src/components/page-wrapper";
import { translations } from "src/translations";

import { LinkButton } from "src/components/button";

import {
	FacebookShareButton,
	WhatsappShareButton,
	FacebookIcon,
	WhatsappIcon,
} from "react-share";

const T = translations.legacyTranslationsNeedsRefactor.jobApplicationSubmitted;
const TLogin = translations.loginRegister;

const PageContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;

	margin-top: 250px;
	margin-bottom: 250px;
	padding: 50px;
	margin-right: auto;
	margin-left: auto;

	background-color: #fefdfe;
	box-shadow: 0px 1px 3px 0px;
	border-radius: 8px;

	width: 80%;

	color: black;

	h2 {
		font-weight: bold;
	}

	${forSize.phoneOnly} {
		width: 100%;
		margin-top: 70px;
		margin-bottom: 0px;
		padding: 30px 10px;
		border-radius: 0px;
	}
`;

const ReferralLinkContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 10px 0;
`;

const ContactNumberLink = styled.a`
	font-weight: bold;
	color: #337ab7 !important;
	text-decoration: underline;
`;

const personalReferralMessage =
	"Hola! Si estas buscando empleos en una fabrica en Tijuana, te recomiendo este sito web que se llama Vize (Incentivando El Bien). Aqui puedes encontrar empleos y tambien puedes leer evaluaciones de otros empleados que han trabajado ahi para que puedas hacer una decision mejor informada sobre donde quieres trabajar.";

const publicReferralMessage =
	"Hola, si estan buscando empleos en una fabrica en Tijuana, les recomiendo este sito web que se llama Vize (Incentivando El Bien). Aqui pueden encontrar empleos y tambien pueden leer evaluaciones de otros empleados que han trabajado ahi para que puedan hacer una decision mejor informada sobre donde quieren trabajar.";

interface JobApplicationSubmittedProps {
	companyId?: string;
}

export default function JobApplicationSubmitted({companyId}: JobApplicationSubmittedProps) {
	const user = useUser();
	const { loading, data } = useJobApplicationSubmittedQuery({
		variables: { companyId },
	});
	const [copySuccess, setCopySuccess] = React.useState("");
	const textAreaRef = React.useRef(null);

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		setCopySuccess("Copiado!");
	}
	
	console.log("ccmp", data);

	function renderContent() {
		const referralLink: string =
			`www.vize.mx/${urlGenerators.queryRoutes.jobs}?ref=jobapp`;
		let ClipboardStatusIcon = <ClipboardIcon />;
		if (copySuccess === "Copiado!") {
			ClipboardStatusIcon = <ClipboardCopiedIcon />;
		}
		return (
			<>
				<h2>
					<T.jobApplicationSubmitted /> {data?.company?.name}
				</h2>
				
				<br />
				
				<p>
					{data?.company?.name} <T.companyWillReachOut />
				</p>
				<p>
					<T.contactUs /> 
					<ContactNumberLink
						href="https://wa.me/5216647480001"
						rel="noreferrer"
						target="_blank"
					>+52(664)748-0001
				</ContactNumberLink>
				</p>

				<br />

				<LinkButton to={`${urlGenerators.queryRoutes.companyProfile}/${companyId}`} style={{ width: "350px" }} $primary> <T.returnToCompany /> </LinkButton>
				<br />
				<LinkButton to={urlGenerators.queryRoutes.jobs} style={{ width: "350px" }} $primary> <T.viewMoreJobs /> </LinkButton>

				<br />

				<p>
					<T.referralMessage />
				</p>

				<ReferralLinkContainer>
					<button onClick={() => copyToClipboard(referralLink)}>
						{ClipboardStatusIcon}
					</button>
					<button onClick={() => copyToClipboard(referralLink)}>
						<a ref={textAreaRef} value={referralLink}>
							<strong>{referralLink}</strong>
						</a>
					</button>
					{copySuccess}
				</ReferralLinkContainer>

				<div>
					<WhatsappShareButton
						url={referralLink}
						title={personalReferralMessage}
						style={{ marginRight: "7px"}}
					>
						<WhatsappIcon size={48} round={true} />
					</WhatsappShareButton>
					
					<FacebookShareButton
						url={referralLink}
						quote={publicReferralMessage}
						hashtag="#incentivandoelbien"
					>
						<FacebookIcon size={48} round={true} />
					</FacebookShareButton>
				</div>
			</>
		);
	}

	let content = null; 
	if (user) {
		content = renderContent();
	} else {
		content = (
			<div
				style={{
					width: "80%",
					margin: "0 auto",
					backgroundColor: "white",
				}}
			>
				<br />
				<h3>
					<TLogin.mustBeLoggedIn />
				</h3>
				<br />
				<Link
					className="btn btn-primary"
					to={urlGenerators.vizeLogin("worker")}
				>
					Iniciar Sesión
				</Link>
				<br />
			</div>
		);
	}

	return (
		<PageWrapper title="Solicitud Enviada">
			<PageContentContainer>{content}</PageContentContainer>
		</PageWrapper>
	);
}
