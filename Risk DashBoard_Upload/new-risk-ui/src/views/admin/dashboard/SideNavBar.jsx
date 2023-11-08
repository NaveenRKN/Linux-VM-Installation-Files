import React from "react";

const SideNavBar = (props) => {
    const { handleSideNavBarChange, activeTab } = props;
    return (
        <ul className="nav">
            <li className={`nav-item ${activeTab == "dashBoard" ? "active" : ""}`} onClick={(e) => { handleSideNavBarChange("dashBoard") }}>
                <a className="nav-link">
                    <i
                        class="material-icons iconsize-sm "
                        style={{ paddingRight: 10 }}
                    >
                        dashboard
                    </i>


                    <span className="menu-title"> Dashboard</span>
                </a>
            </li>
            <li className={`nav-item ${activeTab == "isms" ? "active" : ""}`} onClick={(e) => { handleSideNavBarChange("isms") }}>
                <a className="nav-link">
                    <i class="material-icons"
                        style={{ paddingRight: 10 }}>verified_user</i>
                    <span className="menu-title"> ISMS</span>
                </a>
            </li>
            <li className={`nav-item ${activeTab == "privacy" ? "active" : ""}`} onClick={(e) => { handleSideNavBarChange("privacy") }}>
                <a className="nav-link">
                    <i
                        class="material-icons iconsize-sm "
                        style={{ paddingRight: 10 }}
                    >
                        remove_red_eye
                    </i>

                    <span className="menu-title"> Privacy</span>
                </a>
            </li>
            <li className={`nav-item ${activeTab == "qms" ? "active" : ""}`} onClick={(e) => { handleSideNavBarChange("qms") }}>
                <a className="nav-link">
                    <i
                        class="material-icons iconsize-sm "
                        style={{ paddingRight: 10 }}
                    >
                        card_membership
                    </i>
                    <span className="menu-title"> QMS </span>
                </a>
            </li>
            <li className={`nav-item ${activeTab == "settings" ? "active" : ""}`} onClick={(e) => { handleSideNavBarChange("settings") }}>
                <a className="nav-link">
                    <i
                        class="material-icons iconsize-sm "
                        style={{ paddingRight: 10 }}
                    >
                        settings
                    </i>
                    <span className="menu-title"> Settings </span>
                </a>
            </li>
            <li className={`nav-item `}>
                <a className="nav-link">
                    <i
                        class="material-icons iconsize-sm "
                        style={{ paddingRight: 10 }}
                    >
                        power_settings_new
                    </i>
                    <span className="menu-title"> Signout </span>
                </a>
            </li>

        </ul>
    )
}

export default SideNavBar;