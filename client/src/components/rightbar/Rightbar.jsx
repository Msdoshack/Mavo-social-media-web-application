import "./rightbar.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  follow,
  getIamFollowing,
  getRelationship,
  getSuggestedUsers,
} from "../../config/api";
import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import OnlineFriends from "../onlineFriends/OnlineFriends";
import RecentActivity from "../recentactivities/RecentActivity";
import { socket } from "../../config/socket";

import avatar2 from "../../assets/avatar2.PNG";

function Rightbar() {
  const { currentUser } = useContext(AuthContext);
  const [onlineUsers, setOnlineUsers] = useState();

  const { isLoading: iamFollowingLoading, data: iamFollowing } = useQuery({
    queryKey: ["following"],
    queryFn: () => getIamFollowing(currentUser.id),
  });

  const { isLoading, data } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: getSuggestedUsers,
  });

  const user = data && data.map((singleuser) => singleuser);

  const { isLoading: relationshipisLoading, data: relationshipData } = useQuery(
    {
      queryKey: ["relationshipSuggested"],
      queryFn: () => getRelationship(user?.id),
    }
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (userId) => follow({ user_id: parseInt(userId) }),

    onSuccess: () => queryClient.invalidateQueries(["relationshipSuggested"]),
  });

  const handleFollow = (userId, username) => {
    mutation.mutate(userId);
    window.alert(`you are now following ${username}`);
  };
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("addUser", currentUser.id);

    socket.on("getUsers", (users) => {
      setOnlineUsers(
        iamFollowing?.filter((f) => users.some((u) => u.userId === f.user_id))
      );
    });

    return () => {
      socket.off("getUsers");
    };
  }, [iamFollowing, currentUser]);

  if (relationshipisLoading) return;
  if (isLoading) return;
  if (iamFollowingLoading) return;

  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestion For You</span>

          {data?.map((suggestion) => (
            <div className="user" key={suggestion.id}>
              <div className="userinfo">
                <img
                  src={
                    suggestion.profile_picture
                      ? `/upload/${suggestion.profile_picture}`
                      : avatar2
                  }
                  alt=""
                />
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/profile/" + suggestion.id)}
                >
                  {suggestion.username}
                </span>
              </div>
              <div className="buttons">
                <button
                  onClick={() =>
                    handleFollow(suggestion.id, suggestion.username)
                  }
                  disabled={mutation.isLoading}
                >
                  {relationshipData?.includes(currentUser.id)
                    ? "following"
                    : "follow"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {onlineUsers && (
          <div className="item">
            {onlineUsers?.map((onlineUser) => (
              <OnlineFriends onlineUsers={onlineUser} />
            ))}
          </div>
        )}

        <div className="item">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
