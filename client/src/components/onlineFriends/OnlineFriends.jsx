import { useNavigate } from "react-router-dom";

const OnlineFriends = ({ onlineUsers }) => {
  const navigate = useNavigate();

  return (
    <div>
      <span>online friends</span>
      {onlineUsers || onlineUsers === !undefined ? (
        <div className="user">
          <div
            className="userinfo"
            onClick={() => navigate(`/profile/${onlineUsers.user_id}`)}
          >
            <div className="online" />
            <img src={`/upload/${onlineUsers.profile_picture}`} alt="" />
            <span>{onlineUsers.username}</span>
          </div>
        </div>
      ) : (
        <h1>No friend online</h1>
      )}
    </div>
  );
};

export default OnlineFriends;
