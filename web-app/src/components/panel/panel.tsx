import styled from "styled-components";

import { forSize } from "src/responsive";
import colors from "src/colors";

const PannelPadding = "30px";

const Panel = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: 100%;
	margin-bottom: 10px;

	background-color: ${colors.surface};
	color: ${colors.onSurface};
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
	padding: ${PannelPadding};

	${forSize.phoneOnly} {
		padding: 20px;
	}
`;

export default Panel;
export { PannelPadding };
