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
} from "../icons/icon";

import { Link, useNavigate } from "react-router-dom";
import { darkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import avatar2 from "../../assets/avatar2.PNG";

function Navbar() {
  const { toggle, darkMode } = useContext(darkModeContext);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear("user");
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

        {darkMode ? (
          <DarkModeIcon onClick={toggle} />
        ) : (
          <WbSunny onClick={toggle} />
        )}
        <GridView className="grid-outline" />
        <div className="search">
          <SearchIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <ProfileIcon onClick={() => navigate(`/profile/${currentUser.id}`)} />
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
        <div title="logout">
          <PowerIcon className="power-icon" onClick={logout} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
