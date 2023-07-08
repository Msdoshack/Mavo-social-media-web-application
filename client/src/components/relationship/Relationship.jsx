import React, { useEffect, useRef, useState } from "react";
import "./relationship.scss";

import { useNavigate } from "react-router-dom";
import maleUser from "../../assets/male.jpg";
import femaleUser from "../../assets/female.jpg";

import avatar from "../../assets/avatar2.PNG";
const Relationship = ({
  openFollows,
  setOpenFollows,
  iamFollowing,
  myFollowers,
}) => {
  const [toggleFollowing, setToggleFollowing] = useState(false);
  const [toggleFollowers, setToggleFollowers] = useState(true);

  const navigate = useNavigate();

  const handleToggleFollowers = () => {
    setToggleFollowing(false);
    setToggleFollowers(true);
  };
  const handleToggleFollowing = () => {
    setToggleFollowers(false);
    setToggleFollowing(true);
  };

  const relationshipRef = useRef();
  useEffect(() => {
    function clickOutside(e) {
      if (
        relationshipRef.current &&
        !relationshipRef.current.contains(e.target)
      ) {
        setOpenFollows(false);
      }
    }
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [relationshipRef, openFollows]);

  return (
    <div className="relationship-container" ref={relationshipRef}>
      {openFollows && (
        <div className="friendsContainer">
          <div className="toggleRelationship">
            <div
              onClick={handleToggleFollowers}
              style={{
                backgroundColor: toggleFollowers && "gray",
              }}
              className="followers-wrapper"
            >
              <span>Followers</span>

              <span>{myFollowers.length}</span>
            </div>
            <div
              onClick={handleToggleFollowing}
              style={{ backgroundColor: toggleFollowing && "gray" }}
              className="followers-wrapper"
            >
              <span>Following</span>
              <span>{iamFollowing.length}</span>
            </div>
          </div>

          <div>
            {toggleFollowers &&
              myFollowers.map((myFollower) => (
                <div
                  className="info"
                  key={myFollower.id}
                  // onClick={() => setOpenToggle(false)}
                >
                  <img
                    src={
                      myFollower.profile_picture === null &&
                      myFollower.sex === "male"
                        ? maleUser
                        : myFollower.profile_picture === null &&
                          myFollower.sex === "female"
                        ? femaleUser
                        : `/upload/${myFollower.profile_picture}`
                    }
                  />
                  <span
                    onClick={() => {
                      navigate(`/profile/${myFollower.user_id}`);
                      setOpenFollows(false);
                    }}
                  >
                    {myFollower.username}
                  </span>
                  <span className="bio">{myFollower.bio}</span>
                </div>
              ))}

            {toggleFollowing &&
              iamFollowing.map((iamfollow) => (
                <div className="info" key={iamfollow.id}>
                  <img
                    src={
                      iamfollow.profile_picture
                        ? `/upload/${iamfollow.profile_picture}`
                        : avatar
                    }
                  />
                  <span
                    onClick={() => {
                      navigate(`/profile/${iamfollow.user_id}`);
                      setOpenFollows(false);
                    }}
                  >
                    {iamfollow.username}
                  </span>
                  <span className="bio">{iamfollow.bio}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Relationship;
