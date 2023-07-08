// import {
//   FavoriteOutlined,
//   FavoriteBorderOutlined,
//   Delete,
// } from "../icons/icon";

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import React, { useContext } from "react";
// import {
//   addCommentLikes,
//   delComment,
//   delCommentLikes,
//   getCommentLikes,
// } from "../../config/api";
// import { AuthContext } from "../../context/AuthContext";

// const CommentIcons = ({ commentId }) => {
//   const { currentUser } = useContext(AuthContext);

//   const { data } = useQuery({
//     queryKey: ["commentlikes", commentId],
//     queryFn: () => getCommentLikes(commentId),
//   });

//   console.log(data);

//   const commentLikesMutation = useMutation({
//     mutationFn: (liked) => {
//       if (liked) return delCommentLikes(commentId);
//       return addCommentLikes({ commentId });
//     },
//     onSuccess: () => queryClient.invalidateQueries(["commentlikes"]),
//   });

//   const queryClient = useQueryClient();

//   const deleteCommentMutation = useMutation({
//     mutationFn: () => {
//       const confirm = window.confirm("click ok to delete");
//       if (confirm) return delComment(commentId);
//     },
//     onSuccess: () => queryClient.invalidateQueries(["comments", commentId]),
//   });
//   const handleDeleteComment = () => {
//     deleteCommentMutation.mutate();
//   };

//   const handleCommentLikes = () => {
//     commentLikesMutation.mutate(data?.includes(currentUser.id));
//   };
//   return (
//     <div className="commentIcons">
//       {data?.includes(currentUser.id) ? (
//         <span title={"unlike"}>
//           <FavoriteOutlined
//             fontSize=""
//             style={{ color: "red" }}
//             onClick={() => handleCommentLikes()}
//           />
//           <span style={{ fontSize: "10px", color: "inherit" }}>
//             {data.length}
//           </span>
//         </span>
//       ) : (
//         <span title={"like"}>
//           <FavoriteBorderOutlined
//             fontSize=""
//             title={"unlike"}
//             onClick={() => handleCommentLikes()}
//           />
//           <span style={{ fontSize: "10px", color: "inherit" }}>
//             {data?.length}
//           </span>
//         </span>
//       )}

//       <span title={"delete"}>
//         <Delete
//           fontSize=""
//           title={"delete"}
//           onClick={() => handleDeleteComment()}
//         />
//       </span>
//     </div>
//   );
// };

// export default CommentIcons;
