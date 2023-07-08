import "../posts/posts.scss";

/* MATERIAL U.I ICONS */
import {
  MoreHoriz,
  FavoriteOutlined,
  FavoriteBorderOutlined,
  Textsms,
  Share,
  Delete,
} from "../icons/icon";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import Comments from "../comments/Comments";
import moment from "moment";

/* API CALLS */
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  addLikes,
  deleteLikes,
  deletePost,
  getComments,
  getLikes,
} from "../../config/api";

import avatar from "../../assets/avatar2.PNG";

function Posts({ post }) {
  const navigate = useNavigate();
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () => getLikes(post.id),
  });

  const navigateTo = () => navigate("/post/" + post.id);
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
  const { data: commentData } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => getComments(post.id),
  });

  if (isLoading) return;
  if (isError) return <div>{error}</div>;

  return (
    <div className="posts">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={
                post.profile_picture
                  ? `/upload/${post.profile_picture}`
                  : avatar
              }
              alt=""
            />
            <div className="details">
              <Link
                to={`/profile/${post?.user_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="name">
                  <span>{post?.username}</span>
                </div>
              </Link>
              <span className="date">{moment(post?.created_at).fromNow()}</span>
            </div>
          </div>
          <MoreHoriz onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && (
            <>
              {currentUser.id === post?.user_id ? (
                <button onClick={handleDelete}>delete</button>
              ) : (
                <button>share</button>
              )}
            </>
          )}
        </div>

        <div onClick={navigateTo} style={{ cursor: "pointer" }}>
          <div className="content">
            <p>{post.description}</p>
            {post.image && <img src={"/upload/" + post.image} />}
          </div>
        </div>
        <div className="info">
          <div className="item">
            {data?.includes(currentUser.id) ? (
              <FavoriteOutlined style={{ color: "red" }} onClick={handleLike} />
            ) : (
              <FavoriteBorderOutlined onClick={handleLike} />
            )}
            {data?.length} likes
          </div>
          <div className="item">
            <Textsms onClick={() => setCommentOpen(!commentOpen)} />
            {commentData?.length}
          </div>

          <div className="item">
            <Share />
          </div>
          {post.user_id === currentUser.id && (
            <div className="item">
              <Delete onClick={handleDelete} />
            </div>
          )}
        </div>
        {commentOpen && <Comments post_id={post.id} />}
      </div>
    </div>
  );
}

export default Posts;
