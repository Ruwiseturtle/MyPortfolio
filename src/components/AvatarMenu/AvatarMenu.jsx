import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import './AvatarMenu.css';
import AuthStatus from "../../constants/userRolesEnum";
import { setAuthSwitchToShow } from "../../redux/auth/authReducer";
import { logOut } from "../../redux/auth/authReducer";
import { selectIsAuthenticated } from "../../redux/auth/authSelectors";

const AvatarMenu = ({isAvatarMenuOpen,setIsAvatarMenuOpen,setisMenuOpen}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {}, [isAuthenticated, dispatch]);

  const deleteTokenFromStorage = () => {
    localStorage.removeItem("token");
    navigate("/AuthorizationPage/SignIn");
  };

  return (
    <div className={`avatar-menu ${isAvatarMenuOpen ? "openAvatarMenu" : ""}`}>
      {!isAuthenticated ? (
        <div className="avatar-menu-list">
          <NavLink
            className={({ isActive }) => (isActive ? "text active" : "text")}
            to="/AuthorizationPage/SignIn"
            onClick={() => {
              setIsAvatarMenuOpen(false);
              setisMenuOpen(false);
              dispatch(setAuthSwitchToShow(AuthStatus.LogIn));
            }}
          >
            Sign In
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text active" : "text")}
            to="/AuthorizationPage/SignUp"
            onClick={() => {
              setIsAvatarMenuOpen(false);
              setisMenuOpen(false);
              dispatch(setAuthSwitchToShow(AuthStatus.LogUp));
            }}
          >
            Sign Up
          </NavLink>
        </div>
      ) : (
        <div className="avatar-menu-list">
          <NavLink
            className={({ isActive }) => (isActive ? "text active" : "text")}
            to="/UserPage"
            onClick={() => {
              setIsAvatarMenuOpen(false);
              setisMenuOpen(false);
              setIsAvatarMenuOpen(false);
            }}
          >
            Your page
          </NavLink>

            <NavLink className={({ isActive }) => isActive && window.location.pathname !== "/"
              ? "text active" : "text"}
            to="/"
            onClick={() => {
              setIsAvatarMenuOpen(false);
              setisMenuOpen(false);
              deleteTokenFromStorage();
              dispatch(logOut());
            }}
          >
            Log Out
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu
