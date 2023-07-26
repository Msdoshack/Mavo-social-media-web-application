import "./chat.scss";
import "../../components/navbar/navbar.scss";
import Conversation from "../../components/conversation/Conversation";
import Messages from "../../components/messages/Messages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SendMessage, getChat, getInbox } from "../../config/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { ArrowBackIos } from "../../components/icons/icon";

const Chat = () => {
  const { currentUser } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const scrollRef = useRef();

  const chatId = parseInt(useLocation().pathname.split("/")[2]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getChat(chatId),
  });

  const queryClient = useQueryClient();

  const messageMutation = useMutation({
    mutationFn: () => SendMessage(chatId, { message: newMessage }),
    onSuccess: () => {
      queryClient.invalidateQueries(["chats"]);
      setNewMessage("");
    },
  });

  const handleInput = (e) => {
    e.preventDefault();
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    messageMutation.mutate();
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  if (isLoading) return isLoading;
  return (
    <div className="chat-container">
      <div className="chat-menu">
        <div className="chat-menu-wrapper">
          <input type="text" placeholder="Search for friends" />
          <Conversation />
        </div>
      </div>
      <div className="chats">
        <div className="chats-wrapper">
          <div className="chats-top">
            <div className="chat-mate">
              <div className="chat-mate-details">
                <img src="" alt="bles" />
                <span>blessing</span>
              </div>

              <ArrowBackIos
                onClick={() => navigate(`/inbox/${currentUser.id}`)}
              />
            </div>
            {data?.map((chat) => (
              <div key={chat.id} ref={scrollRef}>
                <Messages chat={chat} />
              </div>
            ))}
          </div>
          <div className="chats-bottom">
            <textarea
              autoFocus={true}
              cols={40}
              rows={7}
              style={{ backgroundColor: "inherit", color: "inherit" }}
              className="chat-input"
              placeholder="Write Message"
              onChange={handleInput}
              value={newMessage}
              required
            />
            <button onClick={handleSubmit}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
