import React from "react";
import Stars from "./stars.jsx";

/* This component is for displaying a sumary of a company in a list.
 * See also CompaniesList.
 */
export default class CompanyListing extends React.Component {
    render() {
        return (
            <div>
                <a href={"/company?id=" + this.props.company._id}>
                    <h3>{this.props.company.name}</h3>
                    safety <Stars x={this.props.company.avgSafety} max={5} />
                    <br />
                    respect <Stars x={this.props.company.avgRespect} max={5} />
                </a>
            </div>
        );
    }
}
