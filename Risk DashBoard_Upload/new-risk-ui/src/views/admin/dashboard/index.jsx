import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getRiskAction } from "../../../store/redux/actions/risk"
import { connect } from "react-redux";
import PieChart from "../../../components/chart/PieChart";
import RiskSummary from "../../../components/RiskSummary"
import ListGrid from "./ListGrid";
import RiskChart from "./riskChart";
import { Barchart } from "../../../components/chart/Barchart";
import { StackedBarChart } from "../../../components/chart/StackedBarChart";
import { Columnchart } from "../../../components/chart/Columnchart";
import { Circularchart } from "../../../components/chart/Circularchart";
import SideNavBar from "./SideNavBar"
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Upload from "./Upload";
import Images from "./Images"
const Home = (props) => {

  const dispatch = useDispatch();
  // const [list, setList] = useState(null);
  const [selectPoint, setSelectPoint] = useState(null),
    [selectChart, setSelectChart] = useState(null),
    [selectChartName, setSelectChartName] = useState(null),
    [selectLabel, setSelectLabel] = useState(null),
    [catageryLabel, setCatageryLabel] = useState(null),
    [selectKey, setSelectKey] = useState(null),
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
  const { ...rest } = props;
  const [open, setOpen] = useState(true);
  const [menuStatus, setMenuStatus] = useState(true);
  const [sliderSkins, setSliderSkins] = useState(true);
  const [peopleShow, setPeopleShow] = useState(false);
  const [headerSkins, setHeaderSkins] = useState("");
  const [navItemActive, setNavItemActive] = useState(true);
  const [menuSettings, setMenuSettings] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("Main Dashboard");

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };

  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  const getSetMenu = () => {
    setMenuStatus(!menuStatus);
    if (menuStatus) {
      document.body.classList.add("sidebar-icon-only");
    } else {
      document.body.classList.remove("sidebar-icon-only");
    }
  };
  const getSliderSkins = () => {
    setSliderSkins(!sliderSkins);
    if (sliderSkins) {
      document.body.classList.add("sidebar-dark");
    } else {
      document.body.classList.remove("sidebar-dark");
    }
  };

  const getSetMenuMobile = () => {
    setMenuStatus(!menuStatus);
  };

  const getSetSettingMenu = () => {
    setMenuSettings(!menuSettings);
  };
  const getDropDownUser = () => {
    setPeopleShow(!peopleShow)
  };

  const getHeadersSkins = (param) => {
    if (param) setHeaderSkins(param);
  };
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
      let closedRisk = filterData(data, "status", "Closed", null);
      let wipRisk = filterData(data, "status", "WIP", null);
      let OccurredRisk = filterData(data, "status", "Occurred", null);
      // let awaitingApproval, inProgress;
      setRiskDetails({
        ...riskDetails,
        totalRisk: data.length,
        openRisk: openRisk.length,
        closedRisk: closedRisk.length,
        inProgress: wipRisk.length,
        awaitingApproval: OccurredRisk.length,

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
    setFilterRiskDataFunction = (data, chart, key) => {
      console.log(data)
      console.log(chart)
      setSelectPoint(data)
      setSelectChart(chart)
      setSelectKey(key)
      // }
      // window.scrollTo(0, 9999);
    };
  const riskSummaryChild = (s) => {
    window.scrollTo(0, 9999);
  }
  useEffect(() => {
    if (selectPoint != null) {
      if (selectChart == "donut") {
        let chartName = ["WIP", "Open", "Occurred", "Closed"];
        console.log(selectPoint)
        let filterList = filterData(riskData, "status", chartName[selectPoint], null);
        setListData(filterList)
        setSelectLabel(chartName[selectPoint])
      } else if (selectChart == "pie") {
        let chartName = ["High", "Medium", "Low"];
        console.log(selectPoint)
        let filterList = filterData(riskData, "riskRating", chartName[selectPoint], null);
        setListData(filterList)
        setSelectLabel(chartName[selectPoint])
      } else if (selectChart == "barChart") {
        let chartName = ["Operational",
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
        setSelectLabel(chartName[selectPoint])
        let filterList = filterData(riskData, "type", chartName[selectPoint], null);
        setListData(filterList)
      } else if (selectChart == "bar") {
        let chartName = ["High", "Medium", "Low"];
        let catagery = ["Operational",
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
        console.log(selectPoint)
        let filterList = filterData(riskData, "type", catagery[selectPoint], null);
        console.log(filterList)
        let shorting = filterData(riskData, "riskRating", chartName[selectKey], filterList);
        console.log(shorting)
        setListData(shorting)
        setSelectLabel(chartName[selectKey])
        setCatageryLabel(catagery[selectPoint])
      }
    }
  }, [selectPoint, selectKey, selectChartName, selectLabel, selectChart])
  return (
    <>
      <div className="container-scroller">
        <nav
          className={`navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row ${headerSkins}`}
        >
          <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <a className="navbar-brand brand-logo mr-5">Risk Application</a>
            <a className="navbar-brand brand-logo-mini">Risk</a>
          </div>
          <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
            <button
              className="navbar-toggler navbar-toggler align-self-center"
              type="button"
              data-toggle="minimize"
              onClick={getSetMenu}
            >
              <span className="material-icons iconsize-sm ">menu</span>
            </button>
            <ul className="navbar-nav mr-lg-2">
              <li className="nav-item nav-search d-none d-lg-block">
                <div className="input-group">
                  <div
                    className="input-group-prepend hover-cursor"
                    id="navbar-search-icon"
                  >
                    <span className="input-group-text" id="search">
                      <i class="material-icons" style={{ fontSize: 25 }}>
                        search
                      </i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="navbar-search-input"
                    placeholder="Search now"
                    aria-label="search"
                    aria-describedby="search"
                  />
                </div>
              </li>
            </ul>
            <ul className="navbar-nav navbar-nav-right">

              <li className={`nav-item nav-profile dropdown `}>
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-toggle="dropdown"
                  id="profileDropdown"
                >
                  <Upload />
                </a>
              </li>
              <li className={`nav-item nav-profile dropdown ${peopleShow ? "show" : ""}`}
                onClick={getDropDownUser} >
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-toggle="dropdown"
                  id="profileDropdown"
                >
                  <i class="material-icons"
                    style={{ "font-size": "30px" }}>person</i>
                </a>
                <div
                  className={`dropdown-menu dropdown-menu-right navbar-dropdown ${peopleShow ? "show" : ""}`}
                  aria-labelledby="profileDropdown"
                >
                  <a className="dropdown-item">
                    <i
                      class="material-icons iconsize-sm "
                      style={{ paddingRight: 10 }}
                    >
                      power_settings_new
                    </i>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
            <button
              className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
              type="button"
              data-toggle="offcanvas"
              onClick={getSetMenuMobile}
            >
              <span className="material-icons iconsize-sm ">menu</span>
            </button>
          </div>
        </nav>
        <div className="container-fluid page-body-wrapper">
          <div className="theme-setting-wrapper">
            <div id="settings-trigger" onClick={getSetSettingMenu}>
              <i class="material-icons">settings</i>
            </div>
            <div
              id="theme-settings"
              className={
                menuSettings ? "settings-panel" : "settings-panel open"
              }
            >
              <i class="material-icons" onClick={getSetSettingMenu}>
                close
              </i>
              <p className="settings-heading">SIDEBAR SKINS</p>
              <div
                className={
                  sliderSkins == true
                    ? "sidebar-bg-options sidebar-bg-options selected"
                    : "sidebar-bg-options "
                }
                id="sidebar-light-theme"
                onClick={getSliderSkins}
              >
                <div className="img-ss rounded-circle bg-light border mr-3"></div>
                Light
              </div>
              <div
                className={
                  sliderSkins == false
                    ? "sidebar-bg-options sidebar-bg-options selected"
                    : "sidebar-bg-options "
                }
                id="sidebar-dark-theme"
                onClick={getSliderSkins}
              >
                <div className="img-ss rounded-circle bg-dark border mr-3"></div>
                Dark
              </div>
              <p className="settings-heading mt-2">HEADER SKINS</p>
              <div className="color-tiles mx-0 px-4">
                <div className="tiles success" onClick={() => getHeadersSkins("navbar-success")}></div>
                <div className="tiles warning" onClick={() => getHeadersSkins("navbar-warning")}></div>
                <div className="tiles danger" onClick={() => getHeadersSkins("navbar-danger")}></div>
                <div className="tiles info" onClick={() => getHeadersSkins("navbar-info")}></div>
                <div className="tiles dark" onClick={() => getHeadersSkins("navbar-dark")}></div>
                <div className="tiles default" onClick={() => getHeadersSkins("navbar-default")}></div>
              </div>
            </div>
          </div>
          <div id="right-sidebar" className="settings-panel">
            <i className="settings-close ti-close"></i>

            <ul
              className="nav nav-tabs border-top"
              id="setting-panel"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="todo-tab"
                  data-toggle="tab"
                  href="#todo-section"
                  role="tab"
                  aria-controls="todo-section"
                  aria-expanded="true"
                >
                  TO DO LIST
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="chats-tab"
                  data-toggle="tab"
                  href="#chats-section"
                  role="tab"
                  aria-controls="chats-section"
                >
                  CHATS
                </a>
              </li>
            </ul>
            <div className="tab-content" id="setting-content">
              <div
                className="tab-pane fade show active scroll-wrapper"
                id="todo-section"
                role="tabpanel"
                aria-labelledby="todo-section"
              >
                <div className="add-items d-flex px-3 mb-0">
                  <form className="form w-100">
                    <div className="form-group d-flex">
                      <input
                        type="text"
                        className="form-control todo-list-input"
                        placeholder="Add To-do"
                      />
                      <button
                        type="submit"
                        className="add btn btn-primary todo-list-add-btn"
                        id="add-task"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
                <div className="list-wrapper px-3">
                  <ul className="d-flex flex-column-reverse todo-list">
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Team review meeting at 3.00 PM
                        </label>
                      </div>
                      <i className="remove ti-close"></i>
                    </li>
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Prepare for presentation
                        </label>
                      </div>
                      <i className="remove ti-close"></i>
                    </li>
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Resolve all the low priority tickets due today
                        </label>
                      </div>
                      <i className="remove ti-close"></i>
                    </li>
                    <li className="completed">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" checked />
                          Schedule meeting for next week
                        </label>
                      </div>
                      <i className="remove ti-close"></i>
                    </li>
                    <li className="completed">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" checked />
                          Project review
                        </label>
                      </div>
                      <i className="remove ti-close"></i>
                    </li>
                  </ul>
                </div>
                <h4 className="px-3 text-muted mt-5 font-weight-light mb-0">
                  Events
                </h4>
                <div className="events pt-4 px-3">
                  <div className="wrapper d-flex mb-2">
                    <i className="ti-control-record text-primary mr-2"></i>
                    <span>Feb 11 2018</span>
                  </div>
                  <p className="mb-0 font-weight-thin text-gray">
                    Creating component page build a js
                  </p>
                  <p className="text-gray mb-0">The total number of sessions</p>
                </div>
                <div className="events pt-4 px-3">
                  <div className="wrapper d-flex mb-2">
                    <i className="ti-control-record text-primary mr-2"></i>
                    <span>Feb 7 2018</span>
                  </div>
                  <p className="mb-0 font-weight-thin text-gray">
                    Meeting with Alisa
                  </p>
                  <p className="text-gray mb-0 ">Call Sarah Graves</p>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="chats-section"
                role="tabpanel"
                aria-labelledby="chats-section"
              >
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">
                    Friends
                  </p>
                  <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">
                    See All
                  </small>
                </div>
                <ul className="chat-list">
                  <li className="list active">
                    <div className="profile">
                      <img src="images/faces/face1.jpg" alt="image" />
                      <span className="online"></span>
                    </div>
                    <div className="info">
                      <p>Thomas Douglas</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">19 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src="images/faces/face2.jpg" alt="image" />
                      <span className="offline"></span>
                    </div>
                    <div className="info">
                      <div className="wrapper d-flex">
                        <p>Catherine</p>
                      </div>
                      <p>Away</p>
                    </div>
                    <div className="badge badge-success badge-pill my-auto mx-2">
                      4
                    </div>
                    <small className="text-muted my-auto">23 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src="images/faces/face3.jpg" alt="image" />
                      <span className="online"></span>
                    </div>
                    <div className="info">
                      <p>Daniel Russell</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">14 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src="images/faces/face4.jpg" alt="image" />
                      <span className="offline"></span>
                    </div>
                    <div className="info">
                      <p>James Richardson</p>
                      <p>Away</p>
                    </div>
                    <small className="text-muted my-auto">2 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src="images/faces/face5.jpg" alt="image" />
                      <span className="online"></span>
                    </div>
                    <div className="info">
                      <p>Madeline Kennedy</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">5 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src="images/faces/face6.jpg" alt="image" />
                      <span className="online"></span>
                    </div>
                    <div className="info">
                      <p>Sarah Graves</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">47 min</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <nav
            className={
              menuStatus
                ? "sidebar sidebar-offcanvas active"
                : "sidebar sidebar-offcanvas"
            }
            id="sidebar"
          >
            <SideNavBar handleSideNavBarChange={handleSideNavBarChange} activeTab={activeTab} />
          </nav>

          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-md-12 grid-margin">
                  <div className="row">
                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                      <h3 className="font-weight-bold">Welcome Admin</h3>
                      <h6 className="font-weight-normal mb-0">  <span className="text-primary"></span></h6>
                    </div>
                    <div className="col-12 col-xl-4">
                      <div className="justify-content-end d-flex">
                        <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                  <div class="card tale-bg">
                    <div class="card-people mt-auto">
                      <Images />
                      <div class="weather-info">
                        <div class="d-flex">
                          <div>
                            <h2 class="mb-0 font-weight-normal">{riskDetails.totalRisk}</h2>
                          </div>
                          <div class="ml-2">
                            <h4 class="location font-weight-normal">Total Risk</h4>
                            <h6 class="font-weight-normal"></h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <RiskSummary riskDetails={riskDetails} riskSummaryChild={riskSummaryChild} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card position-relative">
                    <div className="card-people ">
                      <h3 style={{ textAlign: "center" }}> Risk By Status </h3>
                      <div style={{ textAlign: "center" }}>
                        <PieChart data={pieChartData} riskList={listData} setFilterRiskDataFunction={setFilterRiskDataFunction} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card position-relative">
                    <div className="card-people ">
                      <h3 style={{ textAlign: "center" }}> Risk Status By Rating </h3>
                      <div style={{ textAlign: "center" }}>
                        <Circularchart data={CircularchartData} setFilterRiskDataFunction={setFilterRiskDataFunction} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card position-relative">
                    <div className="card-people ">
                      <h3 style={{ textAlign: "center" }}> Risk Rating Category Wise</h3>
                      <div style={{ textAlign: "center" }}>
                        <StackedBarChart data={stackedChartData} setFilterRiskDataFunction={setFilterRiskDataFunction} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card position-relative">
                    <div className="card-people ">
                      <h3 style={{ textAlign: "center" }}> No Of Risk In Category Wise </h3>
                      <div style={{ textAlign: "center" }}>
                        <Barchart data={barChartData} setFilterRiskDataFunction={setFilterRiskDataFunction} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card position-relative">
                    <div className="card-people ">
                      <h3 style={{ textAlign: "center" }}> Age of Open Risk from Creation Date </h3>
                      <div style={{ textAlign: "center" }}>
                        <Columnchart setFilterRiskDataFunction={setFilterRiskDataFunction} />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <div className="table-responsive">
                            <h3 style={{ textAlign: "center" }}> {selectChart == "donut" ? "Risk By Status" : selectChart == "pie" ? "Risk Status By Rating" : selectChart == "barChart" ? "No Of Risk In Category Wise" : selectChart == "bar" ? "Risk Rating Category Wise" : selectChart == "bar3" ? "Age of Open Risk from Creation Date" : ""} </h3>
                            {selectChart == "bar" && <h6 style={{ textAlign: "center" }} className="font-weight-normal mb-0"> Selected Catagery <span className="text-primary">{catageryLabel}</span></h6>}
                            {selectLabel && <h6 style={{ textAlign: "center" }} className="font-weight-normal mb-0"> Selected status <span className="text-primary">{selectLabel}</span></h6>}
                            <br></br>
                            <ListGrid data={listData} setFilterRiskDataFunction={setFilterRiskDataFunction} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="footer">
              <div className="d-sm-flex justify-content-center justify-content-sm-between">
                <span className="text-muted text-center text-sm-left d-block d-sm-inline-block"> </span>
                <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> </span>
              </div>
              <div className="d-sm-flex justify-content-center justify-content-sm-between">
                <span className="text-muted text-center text-sm-left d-block d-sm-inline-block"> </span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  // count: state.counter.count,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
