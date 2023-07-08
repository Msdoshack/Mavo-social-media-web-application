import "./chat.scss";
import "../../components/navbar/navbar.scss";
import Conversation from "../../components/conversation/Conversation";
import Messages from "../../components/messages/Messages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SendMessage, getChat, getInbox } from "../../config/api";
import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
// import { io } from "socket.io-client";
import { AuthContext } from "../../context/AuthContext";

import { socket } from "../../config/socket";

const Chat = () => {
  const { currentUser } = useContext(AuthContext);
  const [socketUsers, setSocketUsers] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  const chatId = parseInt(useLocation().pathname.split("/")[2]);

  const { data: inbox } = useQuery({
    queryKey: ["inbox"],
    queryFn: () => getInbox(),
  });

  const receiver_id = inbox?.map((data) => data.receiver_id)[0];

  const { data, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getChat(chatId),
  });

  // const chat = data?.map((chat) => chat);

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

    socket.emit("sendMessage", {
      userId: currentUser.id,
      receiverId: receiver_id,
      text: newMessage,
    });

    messageMutation.mutate();

    setMessages([...messages, data]);
  };

  useEffect(() => {
    socket.emit("addUser", currentUser.id);
  }, []);

  useEffect(() => {
    // socket.current = io("ws://localhost:3700");

    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender_id: data.userId,
        content: data.text,
        created_at: Date.now(),
      });
    });

    return () => {
      socket.off("getMessage");
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      data.sender_id?.includes(arrivalMessage.userId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, data]);

  console.log(messages);

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
            {data?.map((chat) => (
              <div key={chat.id} ref={scrollRef}>
                <Messages
                  chat={chat}
                  arrivalMessage={arrivalMessage}
                  // own={userId === chat.sender_id ? true : false}
                />
              </div>
            ))}
          </div>
          <div className="chats-bottom">
            <textarea
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

// const slides = document.querySelectorAll(".slide")

// function slideShow () {
//   const current = document.querySelector(".active")
//   current.classList.remove("active")
//   if (current.nextElementSibling) {
//     current.nextElementSibling.classList.add("active")
//   } else {
//     slides[0].classList.add("active")
//   }
// }

export default Chat;
