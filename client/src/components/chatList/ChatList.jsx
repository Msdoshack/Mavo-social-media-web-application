import "./chatlist.scss";

import React from "react";
import moment from "moment";

import avatar from "../../assets/avatar2.PNG";

const ChatList = ({ inbox }) => {
  return (
    <div className="chat-list-container">
      <div className="wrapper">
        <img
          src={
            inbox.profile_picture ? `/upload/${inbox.profile_picture}` : avatar
          }
          alt=""
        />

        <div className="info-container">
          <span className="user-name">{inbox.other_participant}</span>
          <div className="last-message-container">
            <span className="last-message">
              {inbox.last_message_content.substring(0, 40)}...
            </span>
            <span className="last-message-timestamp">
              {moment(inbox.last_message_timestamp).fromNow()}
            </span>
            <img
              src={
                inbox.profile_picture
                  ? `/upload/${inbox.profile_picture}`
                  : avatar
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
