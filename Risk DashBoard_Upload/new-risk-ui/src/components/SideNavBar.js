import React from "react";
import glyphWhite from "../assets/icons8-glyph-48-white.png";
import glyph from "../assets/icons8-glyph-48.png";
import eyeWhiteIcon from "../assets/icons8-eye-48-white.png";
import eyeIcon from "../assets/icons8-eye-48.png";
import ismsWhiteIcon from "../assets/isms-white.png";
import ismsIcon from "../assets/isms.png";
import messageWhiteIcon from "../assets/messages-white.png";
import messageIcon from "../assets/messages.png";
import settingsWhiteIcon from "../assets/settings-white.png";
import settingsIcon from "../assets/settings.png";
import logoutWhiteIcon from "../assets/logout-white.png";
import logoutIcon from "../assets/logout.png";
import qualityControlWhiteIcon from "../assets/quality-control-white.png";
import qualityControlIcon from "../assets/quality-control.png";

const SideNavBar = (props) => {
    const { handleSideNavBarChange, activeTab } = props;
    return (
        <div>
            <div className="g-sideNav">
                <div className="g-sideNav-content">
                    <div className="g-logo">
                        <div className="media">
                            <div className="media-body">
                                <div>Risk Management</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ul>
                            <li className={`${activeTab == "dashBoard" ? "active" : ""}`} onClick={(e) => { handleSideNavBarChange("dashBoard") }}>
                                <span className="svg-active">
                                    <img src={glyphWhite} width="15" height="15" />
                                </span>
                                <span className="svg-inactive">
                                    <img src={glyph} width="15" height="15" />
                                </span>
                                <a href="#">Dashboard</a>
                            </li>
                            <li className={`${activeTab == "isms" ? "active" : ""}`} onClick={(e) => { handleSideNavBarChange("isms") }}>
                                <span className="svg-active">
                                    <img src={ismsWhiteIcon} width="15" height="15" />
                                </span>
                                <span className="svg-inactive">
                                    <img src={ismsIcon} width="15" height="15" />
                                </span>
                                <a href="#">ISMS</a>
                            </li>
                            <li className={`${activeTab == "privacy" ? "active" : ""}`} onClick={(e) => { handleSideNavBarChange("privacy") }}>
                                <span className="svg-active">
                                    <img src={eyeWhiteIcon} width="15" height="15" />
                                </span>
                                <span className="svg-inactive">
                                    <img src={eyeIcon} width="15" height="15" />
                                </span>
                                <a href="#">Privacy</a>
                            </li>
                            <li className={`${activeTab == "qms" ? "active" : ""}`} onClick={(e) => { handleSideNavBarChange("qms") }}>
                                <span className="svg-active">
                                    <img src={qualityControlWhiteIcon} width="15" height="15" />
                                </span>
                                <span className="svg-inactive">
                                    <img src={qualityControlIcon} width="15" height="15" />
                                </span>
                                <a href="#">QMS</a>
                            </li>
                            {/* <li className={`${activeTab == "message" ? "active" : ""}`} onClick={(e) => { handleSideNavBarChange("message") }}>
                                <span class="svg-active">
                                    <img src={messageWhiteIcon} width="15" height="15" />
                                </span>
                                <span class="svg-inactive">
                                    <img src={messageIcon} width="15" height="15" />
                                </span>
                                <a href="#">Messages</a>
                            </li> */}
                            <li className={`${activeTab == "settings" ? "active" : ""}`} onClick={(e) => { handleSideNavBarChange("settings") }}>
                                <span className="svg-active">
                                    <img src={settingsWhiteIcon} width="15" height="15" />
                                </span>
                                <span className="svg-inactive">
                                    <img src={settingsIcon} width="15" height="15" />
                                </span>
                                <a href="#">Settings</a>
                            </li>
                            <li>
                                <span className="svg-active">
                                    <img src={logoutWhiteIcon} width="15" height="15" />
                                </span>
                                <span className="svg-inactive">
                                    <img src={logoutIcon} width="15" height="15" />
                                </span>
                                <a href="#">Signout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SideNavBar;