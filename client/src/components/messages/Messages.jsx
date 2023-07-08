import "./messages.scss";

import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import avatar2 from "../../assets/avatar2.PNG";

const Messages = ({ chat }) => {
  const { currentUser } = useContext(AuthContext);
  const [own] = useState(currentUser.id === chat.sender_id ? true : false);
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className={own ? "messages-container own" : "messages-container"}>
        <div className="message-top">
          <div
            className="sender-info"
            onClick={() => navigate(`/profile/${chat.sender_id}`)}
          >
            <img
              src={
                chat.profile_picture
                  ? `/upload/${chat.profile_picture}`
                  : avatar2
              }
              alt="chat"
            />
            <p>{chat.sender_username}</p>
          </div>

          <div className="text-wrapper">
            <p className="text">{chat.content}</p>
            <div className="post-time">{moment(chat.created_at).fromNow()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
