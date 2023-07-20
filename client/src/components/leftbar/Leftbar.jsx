import "./leftbar.scss";
import {
  friends,
  groups,
  market,
  memories,
  watch,
  avatar,
} from "../avatar/avatar";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Leftbar() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="leftbar">
      <div className="container">
        <h4 className="heading">Your shortcuts</h4>
        <div className="menu">
          <Link
            to={`profile/${currentUser.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="user">
              <img
                src={
                  currentUser.profile_picture
                    ? `/upload/${currentUser.profile_picture}`
                    : avatar
                }
                alt="userimage"
              />
              <span>{currentUser.username}</span>
            </div>
          </Link>
          <div className="item" style={{ cursor: "pointer" }}>
            <img src={friends} alt="" />
            <span>friends</span>
          </div>
          <div className="item">
            <img src={groups} alt="" />
            <span>Chat room</span>
          </div>
          <div className="item">
            <img src={market} alt="" />
            <span>Market place</span>
          </div>
          <div className="item">
            <img src={watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        {/* <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={friends} alt="" />
            <span>friends</span>
          </div>
          <div className="item">
            <img src={groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={market} alt="" />
            <span>Market place</span>
          </div>
          <div className="item">
            <img src={watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={memories} alt="" />
            <span>Memories</span>
          </div>
        </div> */}
        {/* <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={friends} alt="" />
            <span>friends</span>
          </div>
          <div className="item">
            <img src={groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={market} alt="" />
            <span>Market place</span>
          </div>
          <div className="item">
            <img src={watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={memories} alt="" />
            <span>Memories</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Leftbar;
