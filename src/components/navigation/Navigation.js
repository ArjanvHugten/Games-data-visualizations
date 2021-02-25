import React from 'react';
import { Link } from "react-router-dom";

function Navigation(props) {
    return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Map</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/genres">Genre's</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/consoles">Consoles</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/publishers">Publishers</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/ratings">Ratings</Link>
                    </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Regions</span>
                </h6>
                <ul className="nav flex-column mb-2">
                    {props.regions ? props.regions.forEach(element => {
                        return ( 
                            <li className="nav-item">
                                <a className="nav-link" href={element.link}>
                                    {element.name}
                                </a>
                            </li>
                        )
                    }) : ""}
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
