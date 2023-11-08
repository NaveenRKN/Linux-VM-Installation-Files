import React from 'react'

const RiskSummary = (props) => {
    const { totalRisk, openRisk, closedRisk, awaitingApproval, inProgress } = props.riskDetails;

    const percentCalculat = (totalRisk, newRisk) => {
        let calculated = (newRisk / totalRisk) * 100
        return calculated
    }

    return (
        <>
            <div className="row">
                <div className="col-md-6  mb-2 col-md-offset-1 stretch-card transparent" onClick={() => props.riskSummaryChild('total')}>
                    <div className="card card-tale">
                        <div className="card-body">
                            <p className="mb-4">Total Risk</p>
                            <p className="fs-30 mb-2">{totalRisk}</p>
                            <p>10.00%  </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6  mb-2  stretch-card transparent" onClick={() => props.riskSummaryChild('open')}>
                    <div className="card card-dark-blue">
                        <div className="card-body">
                            <p className="mb-4">Open Risks</p>
                            <p className="fs-30 mb-2">{openRisk}</p>
                            <p>{(percentCalculat(totalRisk, openRisk)).toFixed(2)} %</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6  mb-2  stretch-card transparent" onClick={() => props.riskSummaryChild('await')}>
                    <div className="card card-light-blue">
                        <div className="card-body">
                            <p className="mb-4">Awaiting Approval</p>
                            <p className="fs-30 mb-2">{awaitingApproval}</p>
                            <p>{(percentCalculat(totalRisk, awaitingApproval)).toFixed(2)} %  </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6  mb-2 stretch-card transparent" onClick={() => props.riskSummaryChild('inprogress')}>
                    <div className="card card-light-danger">
                        <div className="card-body">
                            <p className="mb-4">Work In Progress</p>
                            <p className="fs-30 mb-2">{inProgress}</p>
                            <p>{(percentCalculat(totalRisk, inProgress)).toFixed(2)} % </p>
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-6 mb-2 stretch-card transparent">
                    <div className="card card-tale">
                        <div className="card-body">
                            <p className="mb-4">Work In Progress</p>
                            <p className="fs-30 mb-2">{inProgress}</p>
                            <p>{(percentCalculat(totalRisk, inProgress)).toFixed(2)} % </p>
                        </div>
                    </div>
                </div> */}
            </div >
        </>
    )
}

export default RiskSummary