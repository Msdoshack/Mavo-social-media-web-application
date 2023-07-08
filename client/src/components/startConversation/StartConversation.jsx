import "./startconversation.scss";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { startNewConversation } from "../../config/api";

const StartConversation = ({ closeConvo, reciever_id, user_id }) => {
  const [message, setMessage] = useState("");

  const startConversationMutation = useMutation({
    mutationFn: () =>
      startNewConversation({
        conversation_name: `private${String(user_id) + reciever_id}`,
        participants: [user_id, reciever_id],
        message: message,
      }),
  });

  const handleInput = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    startConversationMutation.mutate();
    closeConvo(false);
  };

  return (
    <div className="start-conversation">
      <button onClick={() => closeConvo(false)} id="close">
        X
      </button>
      <h1>Start A Conversation</h1>
      <div className="input-wrapper">
        <textarea
          placeholder="write your message"
          name="message"
          onChange={handleInput}
        />
        <div>
          <button className="send-button" onClick={handleSubmit}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartConversation;
