import "./comments.scss";

import {
  FavoriteOutlined,
  FavoriteBorderOutlined,
  Delete,
} from "../icons/icon";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import moment from "moment";
import {
  addCommentLikes,
  addComments,
  delComment,
  delCommentLikes,
  getCommentLikes,
  getComments,
} from "../../config/api";

import avatar from "../../assets/avatar2.PNG";

function Comments({ post_id }) {
  const { currentUser } = useContext(AuthContext);
  const [description, setDescription] = useState();

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(post_id),
  });

  const comment_id = parseInt(data?.map((comment) => comment.id));
  // console.log(commentData);

  const { data: commentlikes } = useQuery({
    queryKey: ["commentlikes", comment_id],
    queryFn: () => getCommentLikes(comment_id),
  });

  // console.log(commentlikes);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComment) => addComments(newComment),
    onSuccess: () => queryClient.invalidateQueries(["comments"]),
  });

  const commentLikesMutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return delCommentLikes(comment_id);
      return addCommentLikes({ comment_id });
    },
    onSuccess: () => queryClient.invalidateQueries(["commentlikes"]),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: () => {
      const confirm = window.confirm("click ok to delete");
      if (confirm) return delComment(comment_id);
    },
    onSuccess: () => queryClient.invalidateQueries(["comments", comment_id]),
  });

  const handleComment = async (e) => {
    e.preventDefault();

    mutation.mutate({ description, post_id });

    setDescription("");
  };

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate();
  };

  const handleCommentLikes = (commentId) => {
    commentLikesMutation.mutate(commentlikes?.includes(currentUser.id));
  };

  return isLoading ? (
    "loading...."
  ) : error ? (
    error.message
  ) : (
    <div className="comments">
      <div className="write">
        <img
          src={
            currentUser?.profile_picture
              ? `/upload/${currentUser.profile_picture}`
              : avatar
          }
          alt=""
        />
        <textarea
          type="text"
          placeholder="write a comment"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button onClick={handleComment}>Send</button>
      </div>

      {data.length < 1 ? (
        <span className="noComment">NO COMMENT YET</span>
      ) : (
        data?.map((comment) => (
          <div className="comment-container">
            <div className="comment-user-info">
              <img
                src={
                  comment.profile_picture
                    ? `/upload/${comment.profile_picture}`
                    : avatar
                }
                alt=""
              />
              <div className="comment_wrapper" key={comment.id}>
                <span>{comment.username}</span>

                <div className="text">
                  <p>{comment.description}</p>
                </div>
              </div>
            </div>
            <div className="commentIcons">
              <span className="date">
                {moment(comment.created_at).fromNow()}
              </span>
              {commentlikes?.includes(currentUser.id) ? (
                <span title={"unlike"}>
                  <FavoriteOutlined
                    fontSize=""
                    style={{ color: "red" }}
                    onClick={() => handleCommentLikes()}
                  />
                  <span style={{ fontSize: "10px", color: "inherit" }}>
                    {commentlikes.length}
                  </span>
                </span>
              ) : (
                <span title={"like"}>
                  <FavoriteBorderOutlined
                    fontSize=""
                    title={"unlike"}
                    onClick={() => handleCommentLikes()}
                  />
                  <span style={{ fontSize: "10px", color: "inherit" }}>
                    {commentlikes?.length}
                  </span>
                </span>
              )}

              <span title={"delete"}>
                <Delete
                  fontSize=""
                  title={"delete"}
                  onClick={() => handleDeleteComment()}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Comments;
