import { NavLink } from "react-router-dom";
import { useState } from "react";
import {  HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import { BsFillMortarboardFill } from "react-icons/bs";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import "../style/Navbar.css"


const Navbar = () => {

    const [click, setClick] = useState(false);
  const {logout} = useLogout();
  const {user} = useAuthContext();


    const handleClick = () => setClick(!click);

    const handleLogout = () =>{
      setClick(!click);
      logout();


    }

    return (


      <>
        <nav className="navbar">
          <div className="nav-container">
            <NavLink exact to="/" className="nav-logo">
              <span className="icon">
                <BsFillMortarboardFill className="edu-icon" />
              </span>
              <span>EduElite</span>
              {/* <i className="fas fa-code"></i> */}
            </NavLink>

            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/about"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/contact-us"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Contact Us
                </NavLink>
              </li>

              {!user && <><li className="nav-item">
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Login
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  exact
                  to="/signup"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Sign up
                </NavLink>
              </li>
              </>}

              
              {user && <li className="nav-item nav-item-logout">
                <NavLink
                  exact
                  to="/"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleLogout}
                >
                  Log Out
                </NavLink>
              </li>}



            </ul>
            <div className="nav-icon" onClick={handleClick}>
              {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

              {click ? (
                <span className="icon">
                  <HamburgetMenuClose />
                </span>
              ) : (
                <span className="icon">
                  <HamburgetMenuOpen />{" "}
                </span>
              )}
            </div>
          </div>
        </nav>
      </>
    );
};

export default Navbar;