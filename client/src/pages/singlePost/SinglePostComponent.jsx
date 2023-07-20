import "./singlePostComponent.scss";

import {
  MoreHoriz,
  FavoriteOutlined,
  FavoriteBorderOutlined,
  Delete,
  Textsms,
  Share,
} from "../../components/icons/icon";

import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import Comments from "../../components/comments/Comments";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  addLikes,
  deleteLikes,
  deletePost,
  getComments,
  getLikes,
} from "../../config/api";

import avatar2 from "../../assets/avatar2.PNG";

function SinglePostComponent({ post }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () => getLikes(post.id),
  });

  const mutation = useMutation({
    queryKey: ["addLikes", post.id],
    mutationFn: (liked) => {
      if (liked) return deleteLikes(post.id);
      addLikes({ post_id: post.id });
    },
    onSuccess: () => queryClient.invalidateQueries(["likes"]),
  });

  const handleLike = () => {
    mutation.mutate(data?.includes(currentUser.id));
  };

  const deletePostMutation = useMutation({
    mutationFn: () => deletePost(post.id),
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  const handleDelete = () => {
    const confirm = window.confirm("Are you sure you want to delete?");

    if (confirm) deletePostMutation.mutate();
  };
  const { data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(post.id),
  });

  if (isLoading) return;
  if (isError) return <div>{error}</div>;

  return (
    <div className="singlePosts">
      <div className="singlePostContainer">
        <div className="user">
          <div className="userInfo">
            <img
              src={
                post.profile_picture
                  ? `/upload/${post.profile_picture}`
                  : avatar2
              }
              alt="post"
            />
            <div className="details">
              <Link
                to={`/profile/${post.user_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="name">
                  <span>{post.username}</span>
                </div>
              </Link>
              <span className="date">{moment(post.created_at).fromNow()}</span>
            </div>
          </div>
          <MoreHoriz onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && (
            <>
              {currentUser.id === post.user_id ? (
                <button onClick={handleDelete}>delete</button>
              ) : (
                <button>share</button>
              )}
            </>
          )}
        </div>
        <div className="content">
          <p>{post.description}</p>
          {post.image && <img src={"/upload/" + post.image} alt="" />}

          <div className="info">
            <div className="item">
              {data?.includes(currentUser.id) ? (
                <FavoriteOutlined
                  style={{ color: "red" }}
                  onClick={handleLike}
                />
              ) : (
                <FavoriteBorderOutlined onClick={handleLike} />
              )}
              {data?.length} likes
            </div>
            <div className="item">
              <Textsms />
              <span>{comments?.length}</span>
            </div>
            <div className="item">
              <Share />
            </div>
            <div className="item">
              {post.user_id === currentUser.id && (
                <Delete onClick={handleDelete} />
              )}
            </div>
          </div>
        </div>
        <Comments post_id={post.id} />
      </div>
    </div>
  );
}

export default SinglePostComponent;
