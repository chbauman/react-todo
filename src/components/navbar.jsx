import React from "react";

const Navbar = ({ counters }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="navbar-brand">
        Navbar <span className="badge badge-pill">{counters}</span>
      </div>
    </nav>
  );
};

export default Navbar;
