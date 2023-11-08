import bellIcon from "../assets/icons8-bell-50.png";
import userIcon from "../assets/user.svg";
import waitingIcon from "../assets/time-limit.png";
import riskIcon from "../assets/totalRisk.png";
import closedRiskIcon from "../assets/closed.png";
import inProgressIcon from "../assets/in-progress.png";
import openRiskIcon from "../assets/openRisk.png";
import Chart from "react-google-charts";
import VerticalBar from "../chart/VerticalBar";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { getRiskAction } from "../store/redux/actions/risk"
import PieChart from "../chart/PieChart";
import { connect } from "react-redux";
import { Heatmap } from "../chart/Heatmap";
import { Barchart } from "../chart/Barchart";
import { StackedBarChart } from "../chart/StackedBarChart";
import { Columnchart } from "../chart/Columnchart";
import { Circularchart } from "../chart/Circularchart";
import SideNavBar from "./SideNavBar";
import ListGrid from "./ListGrid";
import { YearRangePicker } from "react-year-range-picker";
import Upload from "./Upload"
const Home = (props) => {

  const dispatch = useDispatch();
  // const [list, setList] = useState(null);
  const [selectPoint, setSelectPoint] = useState(null),
    [listData, setListData] = useState([]),
    [filterRiskData, setFilterRiskData] = useState([]),
    { riskData } = useSelector((state) => state.RiskStore),
    [CircularchartData, setCircularChartData] = useState([]),
    [pieChartData, setPieChartData] = useState([]),
    [barChartData, setBarChartData] = useState([]),
    [stackedChartData, setStackedChartData] = useState({
      highRiskData: [],
      mediumRiskData: [],
      lowRiskData: []
    }),
    [riskList, setRiskList] = useState({
      ismsRisk: [],
      qmsRisk: [],
      privacyRisk: []
    }),
    [activeTab, setActiveTab] = useState("dashBoard"),
    [yearRange, setYearRange] = useState({ startYear: "", endYear: "" }),
    [riskDetails, setRiskDetails] = useState({
      totalRisk: 0,
      openRisk: 0,
      closedRisk: 0,
      awaitingApproval: 0,
      inProgress: 0
    });

  const navTabs = ["dashBoard", "isms", "privacy", "qms"];

  useEffect(() => {
    console.log(riskData, "id1")
    if (riskData != null) {
      console.log(riskData, "risk")
      setChart(riskData);
      setListData(riskData);
      setFilterRiskData(riskData);
      setRiskInformation(riskData);
      setFilterType();
    } else if (riskData == []) {
      console.log(riskData, "risk123")
      setChart(riskData);
      setFilterType();
    }
  }, [riskData]);
  useEffect(() => {
    const d = new Date();
    let year = d.getFullYear();
    setYearRange({
      ...yearRange,
      startYear: year,
      endYear: year
    })
    getRiskList(year, year, null);
  }, []);
  const getRiskList = (startYear, endYear, riskType) => {
    let data = {
      startYear: startYear,
      endYear: endYear,
      riskType: riskType
    }
    dispatch(getRiskAction(data));
  },
    setRiskInformation = (data) => {
      let openRisk = filterData(data, "status", "Open", null);
      let closedRisk = filterData(data, "status", "Open", null);
      // let awaitingApproval, inProgress;
      setRiskDetails({
        ...riskDetails,
        totalRisk: data.length,
        openRisk: openRisk.length,
        closedRisk: closedRisk.length
      })
    },
    setFilterType = () => {
      let qms = ["Operational",
        "Compliance",
        "Business",
        "External",
        "Management Risk",
        "Resource",
        "Technical"];
      let privacy = ["Privacy",
        "Privact HIPAA"];
      let qmsRisk, ismsRisk, privacyRisk;
      qmsRisk = riskData.filter((risk) => {
        return qms.includes(risk.type);
      });
      ismsRisk = riskData.filter((risk) => {
        return risk.type == "Information Security"
      });
      privacyRisk = riskData.filter((risk) => {
        return privacy.includes(risk.type);
      })
      setRiskList({
        ...riskList,
        qmsRisk: qmsRisk,
        ismsRisk: ismsRisk,
        privacyRisk: privacyRisk
      });
    },
    setChart = (listData) => {
      setCircularChart(listData);
      setPieChart(listData);
      setBarChart(listData);
    },
    filterData = (listData, filterType, filterFlag, filterData) => {
      let filteredData;
      // console.log(listData, "risk")
      if (filterData == null) {
        filteredData = listData && listData.filter(obj => {
          return obj[filterType] === filterFlag;
        })
      } else {
        filteredData = filterData.filter(obj => {
          return obj[filterType] === filterFlag;
        })
      }
      return filteredData;
    },
    setCircularChart = (data) => {
      let circularRiskArray = [];
      const HighRisk = filterData(data, "riskRating", "High", null)
      circularRiskArray.push(HighRisk.length);
      const mediumRisk = filterData(data, "riskRating", "Medium", null)
      circularRiskArray.push(mediumRisk.length)
      const lowRisk = filterData(data, "riskRating", "Low", null)
      circularRiskArray.push(lowRisk.length);
      setCircularChartData(circularRiskArray);
    },
    setPieChart = (data) => {
      let pieRiskArray = [];
      const wipRisk = filterData(data, "status", "WIP", null);
      pieRiskArray.push(wipRisk.length);
      const openRisk = filterData(data, "status", "Open", null);
      pieRiskArray.push(openRisk.length);
      const occuredRisk = filterData(data, "status", "Occurred", null);
      pieRiskArray.push(occuredRisk.length);
      const closedRisk = filterData(data, "status", "Closed", null);
      pieRiskArray.push(closedRisk.length);
      setPieChartData(pieRiskArray);
    },
    setBarChart = (data) => {
      let barRiskArray = [];
      let highRiskArray = [];
      let mediumRiskArray = [];
      let lowRiskArray = [];
      let category = ["Operational",
        "Compliance",
        "Business",
        "External",
        "Information Security",
        "Management Risk",
        "Privacy",
        "Privact HIPAA",
        "Resource",
        "Technical"
      ]
      category.map((type) => {
        let filterValue = filterData(data, "type", type, null);
        // console.log(filterValue,"filter")
        let highRiskValue = filterData(data, "riskRating", "High", filterValue);
        let mediumRiskValue = filterData(data, "riskRating", "Medium", filterValue);
        let lowRiskValue = filterData(data, "riskRating", "Low", filterValue);
        // console.log(highRiskValue,mediumRiskValue,lowRiskValue,"val")
        highRiskArray.push(highRiskValue.length);
        mediumRiskArray.push(mediumRiskValue.length);
        lowRiskArray.push(lowRiskValue.length);
        barRiskArray.push(filterValue.length);
      });
      setStackedChartData({
        ...stackedChartData,
        highRiskData: highRiskArray,
        mediumRiskData: mediumRiskArray,
        lowRiskData: lowRiskArray
      });
      setBarChartData(barRiskArray);
    },
    handleSideNavBarChange = (name) => {
      console.log(name)
      setActiveTab(name);
      switch (name) {
        case "dashBoard":
          getRiskList(yearRange.startYear, yearRange.endYear, null)
          break;
        case "qms":
          getRiskList(yearRange.startYear, yearRange.endYear, 3)
          // setListData(riskList.qmsRisk);
          // setChart(riskList.qmsRisk);
          // setChart([]);

          break;
        case "isms":
          getRiskList(yearRange.startYear, yearRange.endYear, 1)
          // setListData(riskList.ismsRisk);
          // setChart(riskList.ismsRisk);
          // setChart([]);
          break;
        case "privacy":
          getRiskList(yearRange.startYear, yearRange.endYear, 2)
          // setListData(riskList.privacyRisk);
          // setChart(riskList.privacyRisk);
          // setChart([]);
          break;
        default:
          break;
      }
    },
    setFilterRiskDataFunction = (data) => {
      setSelectPoint(data)
      window.scrollTo(0, 9999);

      console.log(data, "data")
    };
  useEffect(() => {
    if (selectPoint) {
      let chartName = ["WIP", "Open", "Occurred", "Closed"];
      console.log(selectPoint)
      let filterList = filterData(riskData, "status", chartName[selectPoint], null);
      setListData(filterList)
      // console.log("selectPointer", selectPoint)
      // console.log(riskData)
    }
  }, [selectPoint])
  return (
    <div>
      <div className="g-main-wrapper">
        <SideNavBar handleSideNavBarChange={handleSideNavBarChange} activeTab={activeTab} />
        <nav className="navbar navbar-expand-lg navbar-light">
          <h3 className="screen-title">Dashboard</h3>
          {/* <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search for anything... "
              aria-label="Search"
            />
            <img className="search-icon" src={searchIcon} alt="search icon" />
          </form> */}


          <div className="g-navbar-right">
            <div className="g-user-content">
              <div className="media">
                {/* <div className="notification-wrapper">
                  <img src={bellIcon} width="27" height="27" />
                </div> */}
                <div class="notification">
                  <Upload />
                </div>
                <img
                  src={userIcon}
                  className="align-self-start mr-3"
                  alt="user icon"
                />
                <div className="media-body">
                  <div className="user-name">John </div>
                  <div className="user-role">Admin</div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="g-main-content">
          <div className="mb-4">
            {/* <h2>Custom Style</h2> */}
            <YearRangePicker
              minYear={new Date().getFullYear() - 2}
              maxYear={new Date().getFullYear()}
              onSelect={(startYear, endYear) => {
                setYearRange({ startYear, endYear });
                let riskType = activeTab == "dashBoard" ? null : activeTab == "isms" ? 1 : activeTab == "privacy" ? 2 : 3
                // console.log(riskType, navTabs["dashBoard"]);
                getRiskList(startYear, endYear, riskType)
              }}
              startYear={yearRange?.startYear}
              endYear={yearRange?.endYear}
              style={{ maxWidth: "200px", width: "100%" }}
              classNames="custom-year-range-picker"
              selectedColor="#0963b5"
            />
            <span style={{ marginLeft: "16px" }}>
              Selected Years : {yearRange?.startYear} - {yearRange?.endYear}
            </span>
          </div>
          <div className="g-card">
            <div className="row g-0 no-gutters mb-3">
              <div className="col-12 col-md-8 col-lg-9">
                <div className="card mr-0 mr-md-2 mb-md-0 h-100">
                  <div className="card-body">
                    <h5 className="card-title mb-2">Risk Summary</h5>
                    <div className="row justify-content-between">
                      <div className="custom-column">
                        <div className="sub-card total">
                          <div className="sub-card-status">
                            <div className="sub-card-status-icon">
                              <img src={riskIcon} width="22" height="22" />
                            </div>
                            <h5 className="my-3">{riskDetails.totalRisk}</h5>
                            <p>Total Risks</p>
                            {/* <p className="g-link">+8% from yesterday</p> */}
                          </div>
                        </div>
                      </div>
                      <div className="custom-column">
                        <div className="sub-card open">
                          <div className="sub-card-status">
                            <div className="sub-card-status-icon">
                              <img src={openRiskIcon} width="22" height="22" />
                            </div>
                            <h5 className="my-3">{riskDetails.openRisk}</h5>
                            <p>Open Risks</p>
                            {/* <p className="g-link">+8% from yesterday</p> */}
                          </div>
                        </div>
                      </div>
                      <div className="custom-column">
                        <div className="sub-card closed">
                          <div className="sub-card-status">
                            <div className="sub-card-status-icon">
                              <img src={closedRiskIcon} width="22" height="22" />
                            </div>
                            <h5 className="my-3">{riskDetails.closedRisk}</h5>
                            <p>Closed Risks</p>
                            {/* <p className="g-link">+8% from yesterday</p> */}
                          </div>
                        </div>
                      </div>
                      <div className="custom-column">
                        <div className="sub-card approval">
                          <div className="sub-card-status">
                            <div className="sub-card-status-icon">
                              <img src={waitingIcon} width="22" height="22" />
                            </div>
                            <h5 className="my-3">{riskDetails.awaitingApproval}</h5>
                            <p>Awaiting Approval</p>
                            {/* <p className="g-link">+8% from yesterday</p> */}
                          </div>
                        </div>
                      </div>
                      <div className="custom-column">
                        <div className="sub-card in-progress">
                          <div className="sub-card-status">
                            <div className="sub-card-status-icon">
                              <img src={inProgressIcon} width="22" height="22" />
                            </div>
                            <h5 className="my-3">{riskDetails.inProgress}</h5>
                            <p>Work In Progress</p>
                            {/* <p className="g-link">+8% from yesterday</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="card mr-0 mr-md-2 h-100">
                  <div className="card-body">
                    <h5 className="card-title">Risk Status</h5>
                    <PieChart data={pieChartData} riskList={listData} setFilterRiskDataFunction={setFilterRiskDataFunction} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-0 no-gutters">
              {activeTab == "dashBoard" && <>
                <div className="col-12 col-md-6 col-lg-7">
                  <div className="card mr-0 mr-md-2 mb-md-0 h-100">
                    <div className="card-body">
                      <StackedBarChart data={stackedChartData} />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-5">
                  <div className="row h-100 g-0 no-gutters ">
                    <div className="col-12">
                      <div className="card mr-0 mr-md-2 h-100">
                        <div className="card-body">
                          <Barchart data={barChartData} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              }
              <div className="col-12 col-md-6 col-lg-7 mt-3">
                <div className="card mb-3 mb-md-0 h-100">
                  <div className="card-body">
                    <Columnchart />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5 mt-3">
                <div className="card mb-3 mb-md-0 h-100">
                  <div className="card-body">
                    <Circularchart data={CircularchartData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <ListGrid data={listData} />
          </div>
        </div>

      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // count: state.counter.count,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
