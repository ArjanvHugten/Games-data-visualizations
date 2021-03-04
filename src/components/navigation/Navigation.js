import React from 'react';
import { NavLink } from "react-router-dom";

function Navigation() {
    return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" exact={true} activeClassName='active'>Map</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/genres" activeClassName='active'>Genre's</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/consoles" activeClassName='active'>Consoles</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/publishers" activeClassName='active'>Publishers</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/ratings" activeClassName='active'>Ratings</NavLink>
                    </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Regions</span>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/region/north-america" activeClassName='active'>North America</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/region/europe" activeClassName='active'>Europe</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/region/japan" activeClassName='active'>Japan</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/region/other" activeClassName='active'>Other</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
