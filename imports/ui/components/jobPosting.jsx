import React from "react";

export default class JobPosting extends React.Component {

  render() {
      return(
        <div className="col-md-12 section_rview_back_color05 ">
              <div  className="sect_re11 ">
             <div >
                <h4><strong>{this.props.item.jobTitle}</strong></h4>
             </div>
             <div>
                <p> <i className="fa fa-map-marker" ></i>&nbsp;&nbsp;&nbsp;{this.props.item.locations[0]}</p>
                <p> <i className="fa fa-money" ></i>&nbsp;&nbsp;{this.props.item.pesosPerHour}/Hour</p>
                <p> <i className="fa fa-calendar" ></i>&nbsp;&nbsp;{this.props.item.contractType}</p>
             </div>
               <div  className="fl-ri-app">
                        <button>Apply Now</button>
                      </div>

           <hr />
             <h4 className="h4-font-sz-job">{this.props.item.jobDescription}</h4>
             <div  className="h4-font-sz">
              <article>
                   <p>{this.props.item.jobDescription}</p>
                  <input id="read-more-toggle-01" className="read-more-toggle" type="checkbox" />
                   <div className="read-more-content">
                      <br />
                      <h4>Qualifications</h4>
                      <p>{this.props.item.qualifications} </p>
                      <br />
                      <div>
                         <h4>Responsibilities</h4>
                         <p>{this.props.item.responsibilities}</p>
                      </div>
                        </div>

                   <label className="read-more-toggle-label" htmlFor="read-more-toggle-01">  </label>
                  <div   className="fl-ri">

                        {/* there is no date field in the Schema */}
                         <p>posted on {this.props.item.jobTitle}</p>
                      </div>
                </article>

                    </div>
                  </div>
                     </div>

      )
    }
    }
