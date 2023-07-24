import { baseUrl, baseUrlPrivate } from "./axios";

export const getLikes = (postId) => {
  return baseUrlPrivate
    .get("/likes?post_id=" + postId)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const addLikes = (postId) => {
  return baseUrlPrivate
    .post("/likes", postId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const deleteLikes = (postId) => {
  return baseUrlPrivate
    .delete("/likes?post_id=" + postId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getPosts = (userId) => {
  return baseUrlPrivate
    .get("/post?user_id=" + userId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getSinglePost = (postId) => {
  return baseUrlPrivate
    .get(`/post/${postId}`)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const deletePost = (postId) => {
  return baseUrlPrivate
    .delete("/post/" + postId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getSingleUser = (userId) => {
  return baseUrlPrivate
    .get("/users/find/" + userId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getSuggestedUsers = () => {
  return baseUrlPrivate
    .get("/users/suggestedUsers")
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getRelationship = (followedUserId) => {
  return baseUrlPrivate
    .get("/relationships?followed_user_id=" + followedUserId)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const unfollow = (userId) => {
  return baseUrlPrivate
    .delete("/relationships?user_id=" + userId)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const follow = (userId) => {
  return baseUrlPrivate
    .post("/relationships", userId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getComments = (postId) => {
  return baseUrlPrivate
    .get("/comments?post_id=" + postId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const addComments = (newComment) => {
  return baseUrlPrivate
    .post("/comments", newComment)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const delComment = (commendId) => {
  return baseUrlPrivate
    .delete(`/comments?comment_id=${commendId}`)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getStories = () => {
  return baseUrlPrivate
    .get("/stories")
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const getStory = (user_id) => {
  return baseUrlPrivate
    .get(`/story/${user_id}`)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const addStory = (newStory) => {
  return baseUrlPrivate
    .post("/stories", newStory)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const delStory = (storyId) => {
  return baseUrlPrivate
    .delete(`/stories?story_id=${storyId}`)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getCommentLikes = (commentid) => {
  return baseUrlPrivate
    .get(`/commentlikes?comment_id=${commentid}`)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const addCommentLikes = (userId) => {
  return baseUrlPrivate
    .post("/commentlikes", userId)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const delCommentLikes = (commentId) => {
  return baseUrlPrivate
    .delete("/commentlikes?comment_id=" + commentId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const updateUserInfor = (updatedInfo) => {
  return baseUrlPrivate
    .patch("/users", updatedInfo)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const updateCoverPicture = (updatedInfo) => {
  return baseUrlPrivate
    .patch("/users/coverPicture", updatedInfo)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const updateProfilePicture = (updatedInfo) => {
  return baseUrlPrivate
    .patch("/users/profilePicture", updatedInfo)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getMyFollowers = (id) => {
  return baseUrlPrivate
    .get("/users/followers?id=" + id)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const getIamFollowing = (id) => {
  return baseUrlPrivate
    .get("/users/following?id=" + id)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getInbox = () => {
  return baseUrlPrivate
    .get("/inbox/")
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const startNewConversation = (convoInfo) => {
  return baseUrlPrivate
    .post("/conversation/", convoInfo)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getChat = (user_id) => {
  return baseUrlPrivate
    .get("/message/" + user_id)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const SendMessage = (conversation_id, message) => {
  return baseUrlPrivate
    .post("/message/" + conversation_id, message)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getUserConversation = () => {
  return baseUrlPrivate
    .get("/conversation")
    .then((res) => res.data)
    .catch((err) => err.message);
};
