import "./profile.scss";

/* Material UI ICONS */
import {
  Facebook,
  LinkedIn,
  Instagram,
  Pinterest,
  Place,
  Language,
  Email,
  MoreVerticon,
  Twitter,
} from "../../components/icons/icon";

/* REACT HOOKS AND CUSTOMS HOOKS */
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Post from "../../components/post/Post";
import Update from "../../components/update/Update";
import Share from "../../components/share/Share";
import StartConversation from "../../components/startConversation/StartConversation";
import ChangeProfilePics from "../../components/changeProfilePics/ChangeProfilePics";
import Relationship from "../../components/relationship/Relationship";

/* ///////////////////////////////////////////////////// */

import background from "../../assets/background.jpg";
import avatar2 from "../../assets/avatar2.PNG";

/* ALL API CALLS */
import {
  follow,
  getRelationship,
  getSingleUser,
  unfollow,
  getUserConversation,
  getMyFollowers,
  getIamFollowing,
} from "../../config/api";
/* //////////////////////////////////////////// */

function Profile() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [openStartCoversation, setOpenStartConversation] = useState(false);
  const [openFollows, setOpenFollows] = useState(false);

  const user_id = parseInt(useLocation().pathname.split("/")[2]);

  const {
    isLoading: myFollowersLoading,
    data: myFollowers,
    error: myFollowersError,
  } = useQuery({
    queryKey: ["followers"],
    queryFn: () => getMyFollowers(user_id),
  });

  const {
    isLoading: iamFollowingLoading,
    data: iamFollowing,
    error: iamFollowingError,
  } = useQuery({
    queryKey: ["following"],
    queryFn: () => getIamFollowing(user_id),
  });

  const {
    isLoading,
    data,
    error: userError,
  } = useQuery({
    queryKey: ["user", user_id],
    queryFn: () => getSingleUser(user_id),
  });

  const { data: userConversations, error: userConversationError } = useQuery({
    queryKey: ["userConversation"],
    queryFn: getUserConversation,
  });

  const possibleConversationName1 = `private${
    String(currentUser.id) + user_id
  }`;
  const possibleConversationName2 = `private${
    String(user_id) + currentUser.id
  }`;

  const filteredConvo = userConversations?.find(
    (convo) =>
      convo.name === (possibleConversationName1 || possibleConversationName2)
  );

  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (filteredConvo === undefined) {
      return setOpenStartConversation(true);
    }
    if (
      filteredConvo?.name === possibleConversationName1 ||
      possibleConversationName2
    ) {
      return navigate("/chat/" + filteredConvo.id);
    } else {
      setOpenStartConversation(true);
    }
  };

  const {
    isLoading: risLoading,
    data: relationshipData,
    error: relationshipDataErr,
  } = useQuery({
    queryKey: ["relationship"],
    queryFn: () => getRelationship(user_id),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) return unfollow(user_id);
      return follow({ user_id });
    },
    onSuccess: () => queryClient.invalidateQueries(["relationship"]),
  });

  const handleFollow = () => {
    mutation.mutate(relationshipData?.includes(currentUser.id));
  };

  const showRelationship = () => {
    setOpenFollows(true);
  };

  if (risLoading) return;
  return isLoading ? (
    "Loading..."
  ) : (
    <div className="profile">
      <div className="images">
        <a
          href={
            data.cover_picture === null
              ? background
              : `/upload/${data.cover_picture}`
          }
        >
          <img
            src={
              data.cover_picture === null
                ? background
                : `/upload/${data.cover_picture}`
            }
            alt=""
            className="cover"
          />
        </a>

        <a
          href={
            data.profile_picture ? `/upload/${data.profile_picture}` : avatar2
          }
        >
          <img
            src={
              data.profile_picture ? `/upload/${data.profile_picture}` : avatar2
            }
            alt="profile"
            className="profilePic"
          />
        </a>
        {currentUser.id === data.id && <ChangeProfilePics />}
      </div>
      <div className="profilecontainer">
        <div className="uinfo">
          <div className="left">
            <a href={currentUser.facebook}>
              <Facebook />
            </a>
            <a href={currentUser.instagram}>
              <Instagram />
            </a>
            <a href={currentUser.twitter}>
              <Twitter />
            </a>
            <a href={currentUser.linkedin}>
              <LinkedIn />
            </a>

            <a href={currentUser.pinterest}>
              <Pinterest />
            </a>
          </div>
          <div className="center">
            <div className="user-name">
              <h3>{data.username}</h3>
              <span>( {`${data.surname} ${data.first_name}`})</span>
              <span className="sex">{data.sex}</span>
            </div>
            <div className="bio">
              <p>{data.bio}</p>
            </div>
            <div className="follows-wrapper">
              <div className="followers" onClick={showRelationship}>
                <span> {myFollowers?.length} </span>
                <span>follower</span>
              </div>
              <div className="following" onClick={showRelationship}>
                <span> {iamFollowing?.length} </span>
                <span>following</span>
              </div>
            </div>
            <div className="info">
              <div className="item">
                <Place />
                <span> {data?.country}</span>
              </div>
              <div className="item">
                <Language />
                <span>{data?.state}</span>
              </div>
            </div>
            {currentUser?.id === user_id ? (
              <button onClick={() => setOpenUpdate(true)}>Edit Profile</button>
            ) : (
              <button
                onClick={handleFollow}
                disabled={mutation.isLoading ? true : false}
              >
                {relationshipData?.includes(currentUser?.id)
                  ? "following"
                  : "follow"}
              </button>
            )}
          </div>
          <div className="right">
            {currentUser.id !== user_id && (
              <span onClick={handleSendMessage}>
                <Email />
              </span>
            )}

            <MoreVerticon />
          </div>
        </div>
        {currentUser.id === data?.id && <Share />}
        <Post user_id={user_id} />
      </div>
      {openUpdate && (
        <Update
          setOpenUpdate={setOpenUpdate}
          user={data}
          key={data.id}
          sender_id={currentUser.id}
        />
      )}
      {openFollows && (
        <Relationship
          openFollows={openFollows}
          setOpenFollows={setOpenFollows}
          myFollowers={myFollowers}
          iamFollowing={iamFollowing}
        />
      )}
      {openStartCoversation && (
        <StartConversation
          closeConvo={setOpenStartConversation}
          reciever_id={user_id}
          user_id={currentUser.id}
        />
      )}
    </div>
  );
}

export default Profile;
