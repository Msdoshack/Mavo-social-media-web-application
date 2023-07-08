import React from "react";
import IMG_8490 from "../../assets/images/IMG_8490.JPG";

const RecentActivity = () => {
  return (
    <div>
      <span>Latest Activities</span>
      <div className="user">
        <div className="userinfo">
          <img src={IMG_8490} alt="" />
          <p>
            <span>Msdos </span>
            changed their cover picture
          </p>
        </div>
        <span> 1 min ago</span>
      </div>
      <div className="user">
        <div className="userinfo">
          <img src={IMG_8490} alt="" />
          <p>
            <span>Msdos </span>
            posted victory
          </p>
        </div>
        <span> 2 min ago</span>
      </div>
      <div className="user">
        <div className="userinfo">
          <img src={IMG_8490} alt="" />
          <p>
            <span>Msdos </span>
            followed sucess
          </p>
        </div>
        <span> 3 min ago</span>
      </div>
      <div className="user">
        <div className="userinfo">
          <img src={IMG_8490} alt="" />
          <p>
            <span>Msdos </span>
            followed his dream
          </p>
        </div>
        <span>6 years ago </span>
      </div>
    </div>
  );
};

export default RecentActivity;
