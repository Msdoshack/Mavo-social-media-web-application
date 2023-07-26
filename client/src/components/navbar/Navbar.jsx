import "./navbar.scss";

/* MATERIAL U.I ICONS */
import {
  HomeIcon,
  PowerIcon,
  WbSunny,
  GridView,
  NotificationIcon,
  DarkModeIcon,
  Email,
  ProfileIcon,
  SearchIcon,
  MoreVerticon,
} from "../icons/icon";

import { Link, useNavigate } from "react-router-dom";
import { darkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import avatar2 from "../../assets/avatar2.PNG";

import { logout } from "../../config/api";

function Navbar() {
  const { toggle, darkMode } = useContext(darkModeContext);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    setCurrentUser("");

    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Mavo</span>
        </Link>

        <HomeIcon onClick={() => navigate("/")} className="home-icon" />

        <ProfileIcon
          className="user-profile"
          onClick={() => navigate(`/profile/${currentUser.id}`)}
        />

        <GridView className="grid-outline" />

        <div className="search">
          <SearchIcon />
          <input type="text" placeholder="Search..." />
        </div>
        {darkMode ? (
          <DarkModeIcon onClick={toggle} />
        ) : (
          <WbSunny onClick={toggle} />
        )}
      </div>
      <div className="right">
        <div className="right-details">
          <Link to={"inbox/" + currentUser.id}>
            <Email />
          </Link>
          <NotificationIcon />
          <div className="user">
            <img
              src={
                currentUser.profile_picture
                  ? `/upload/${currentUser.profile_picture}`
                  : avatar2
              }
              alt="userimage"
            />
            <span>{currentUser.username}</span>
          </div>
        </div>

        <div title="logout">
          <PowerIcon className="power-icon" onClick={handleLogout} />
        </div>
      </div>
      <div className="left-mobile">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Mavo</span>
        </Link>

        <div className="search">
          <SearchIcon />
          <input type="text" placeholder="Search..." />
        </div>

        {/* <ProfileIcon
          className="user-profile"
          onClick={() => navigate(`/profile/${currentUser.id}`)}
        />

        */}
        {darkMode ? (
          <DarkModeIcon onClick={toggle} />
        ) : (
          <WbSunny onClick={toggle} />
        )}
      </div>
      <div className="right-mobile">
        <HomeIcon onClick={() => navigate("/")} className="home-icon" />

        <NotificationIcon />

        <ProfileIcon onClick={() => navigate(`/profile/${currentUser.id}`)} />

        <Link to={"inbox/" + currentUser.id}>
          <Email />
        </Link>
        <GridView onClick={() => setOpenMenu(!openMenu)} />

        {openMenu && (
          <div className="dropdown">
            <div
              className="user"
              onClick={() => navigate(`/profile/${currentUser.id}`)}
            >
              <div className="image">
                <img
                  src={
                    currentUser.profile_picture
                      ? `/upload/${currentUser.profile_picture}`
                      : avatar2
                  }
                  alt="userimage"
                />
              </div>

              <span>{currentUser.username}</span>
            </div>

            <div className="logout" onClick={logout}>
              <span>Logout</span>
              <PowerIcon
                className="power-icon"
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
