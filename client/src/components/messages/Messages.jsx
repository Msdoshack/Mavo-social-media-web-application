import "./messages.scss";

import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";

const Messages = ({ chat }) => {
  const { currentUser } = useContext(AuthContext);
  const [own] = useState(currentUser.id === chat.sender_id ? true : false);

  return (
    <div className="wrapper">
      <div className={own ? "messages-container own" : "messages-container"}>
        <div className="message-top">
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
