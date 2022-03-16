import { Link } from 'react-router-dom';
import React from "react";

// The header component - will serve as the nav-bar
const Header = () => {
  return (
    <nav
      style={{
        borderBottom: 'solid 1px',
        paddingBottom: '1rem',
      }}
    >
      <Link to="/Feed">
        Home
      </Link>
    </nav>
  )  
};

export default Header;