import React from 'react';
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">{props.title}</Link>
    </nav>
  );
}

export default Header;