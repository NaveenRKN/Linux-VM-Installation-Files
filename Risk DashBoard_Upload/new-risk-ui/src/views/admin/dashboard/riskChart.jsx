
import React from "react";
import shape from "./../../../assets/images/shape-4.svg"
const RiskChart = (props) => {

    const { totalRisk, openRisk, closedRisk, awaitingApproval, inProgress } = props.riskDetails;
    const percentCalculat = (totalRisk, newRisk) => {
        let calculated = (newRisk / totalRisk) * 100
        return calculated
    }
    let openStatus = (percentCalculat(totalRisk, openRisk)).toFixed(2)
    let closedStatus = (percentCalculat(totalRisk, closedRisk)).toFixed(2)
    let awaitingApprovalStatus = (percentCalculat(totalRisk, awaitingApproval)).toFixed(2)
    let inProgressStatus = (percentCalculat(totalRisk, inProgress)).toFixed(2)
    return (
        <>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body" style={{ paddingTop: 30, paddingBottom: 40 }}>
                            <p className="card-title">Risk Count</p>
                            <div className="charts-data">
                                <div className="mt-3">
                                    <p className="mb-0">Total</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="progress progress-md flex-grow-1 mr-4">
                                            <div className="progress-bar bg-inf0" role="progressbar" style={{ "width": "100%" }}  ></div>
                                        </div>
                                        <p className="mb-0">{totalRisk}</p>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <p className="mb-0">Open</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="progress progress-md flex-grow-1 mr-4">
                                            <div className="progress-bar bg-info" role="progressbar" style={{ "width": `${openStatus}%` }}  ></div>
                                        </div>
                                        <p className="mb-0">{openRisk}</p>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <p className="mb-0">Closed</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="progress progress-md flex-grow-1 mr-4">
                                            <div className="progress-bar bg-info" role="progressbar" style={{ "width": `${closedStatus}%` }}></div>
                                        </div>
                                        <p className="mb-0">{closedRisk}</p>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <p className="mb-0">Awaiting Approval</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="progress progress-md flex-grow-1 mr-4">
                                            <div className="progress-bar bg-info" role="progressbar" style={{ "width": `${awaitingApprovalStatus}%` }}  ></div>
                                        </div>
                                        <p className="mb-0">{awaitingApproval}</p>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <p className="mb-0">Work In Progress</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="progress progress-md flex-grow-1 mr-4">
                                            <div className="progress-bar bg-info" role="progressbar" style={{ "width": `${inProgressStatus}%` }}  ></div>
                                        </div>
                                        <p className="mb-0">{inProgress}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 stretch-card grid-margin grid-margin-md-0">
                    <div className="card data-icon-card-primary">
                        <div className="card-body" style={{ paddingTop: 30, paddingBottom: 40 }}>
                            <p className="card-title text-white">Number of Risk</p>
                            <div className="row">
                                <div className="col-8 text-white">
                                    <h2>{totalRisk}</h2>
                                    <p className="text-white font-weight-500 mb-0">The total number of risk within the date range.</p>
                                </div>
                                <div className="col-4 background-icon">
                                    <i class="material-icons">cloud</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RiskChart;