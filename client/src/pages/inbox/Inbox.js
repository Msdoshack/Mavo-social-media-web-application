import React from "react";
import "./inbox.scss";
import Conversation from "../../components/conversation/Conversation";
import { Link, useNavigate } from "react-router-dom";
import ChatList from "../../components/chatList/ChatList";
import { useQuery } from "@tanstack/react-query";
import { getInbox } from "../../config/api";

const Inbox = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["inbox"],
    queryFn: () => getInbox(),
  });

  if (isLoading) return "loading";
  return (
    <div className="inbox-container">
      <div className="chat-menu">
        <div className="chat-menu-wrapper">
          <input type="text" placeholder="Search for chats" />
          <Conversation />
        </div>
      </div>
      <div className="chats">
        <div className="heading">
          <p>Inbox</p>
        </div>
        <div className="chats-wrapper">
          {data.length !== 0 ? (
            data?.map((inbox) => (
              <div key={inbox.conversation_id}>
                <Link to={`/chat/${inbox.conversation_id}`}>
                  <ChatList inbox={inbox} />
                </Link>
              </div>
            ))
          ) : (
            <div> your inbox is empty</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
