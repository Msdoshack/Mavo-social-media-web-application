import { baseUrl } from "./axios";

export const getLikes = (postId) => {
  return baseUrl
    .get("/likes?post_id=" + postId)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const addLikes = (postId) => {
  return baseUrl
    .post("/likes", postId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const deleteLikes = (postId) => {
  return baseUrl
    .delete("/likes?post_id=" + postId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getPosts = (userId) => {
  return baseUrl
    .get("/post?user_id=" + userId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getSinglePost = (postId) => {
  return baseUrl
    .get(`/post/${postId}`)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const deletePost = (postId) => {
  return baseUrl
    .delete("/post/" + postId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getSingleUser = (userId) => {
  return baseUrl
    .get("/users/find/" + userId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getSuggestedUsers = () => {
  return baseUrl
    .get("/users/suggestedUsers")
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getRelationship = (followedUserId) => {
  return baseUrl
    .get("/relationships?followed_user_id=" + followedUserId)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const unfollow = (userId) => {
  return baseUrl
    .delete("/relationships?user_id=" + userId)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const follow = (userId) => {
  return baseUrl
    .post("/relationships", userId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getComments = (postId) => {
  return baseUrl
    .get("/comments?post_id=" + postId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const addComments = (newComment) => {
  return baseUrl
    .post("/comments", newComment)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const delComment = (commendId) => {
  return baseUrl
    .delete(`/comments?comment_id=${commendId}`)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getStories = () => {
  return baseUrl
    .get("/stories")
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const getStory = (user_id) => {
  return baseUrl
    .get(`/story/${user_id}`)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const addStory = (newStory) => {
  return baseUrl
    .post("/stories", newStory)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const delStory = (storyId) => {
  return baseUrl
    .delete(`/stories?story_id=${storyId}`)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getCommentLikes = (commentid) => {
  return baseUrl
    .get(`/commentlikes?comment_id=${commentid}`)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const addCommentLikes = (userId) => {
  return baseUrl
    .post("/commentlikes", userId)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const delCommentLikes = (commentId) => {
  return baseUrl
    .delete("/commentlikes?comment_id=" + commentId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const updateUserInfor = (updatedInfo) => {
  return baseUrl
    .patch("/users", updatedInfo)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const updateCoverPicture = (updatedInfo) => {
  return baseUrl
    .patch("/users/coverPicture", updatedInfo)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const updateProfilePicture = (updatedInfo) => {
  return baseUrl
    .patch("/users/profilePicture", updatedInfo)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getMyFollowers = (id) => {
  return baseUrl
    .get("/users/followers?id=" + id)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const getIamFollowing = (id) => {
  return baseUrl
    .get("/users/following?id=" + id)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getInbox = () => {
  return baseUrl
    .get("/inbox/")
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const startNewConversation = (convoInfo) => {
  return baseUrl
    .post("/conversation/", convoInfo)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getChat = (user_id) => {
  return baseUrl
    .get("/message/" + user_id)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const SendMessage = (conversation_id, message) => {
  return baseUrl
    .post("/message/" + conversation_id, message)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getUserConversation = () => {
  return baseUrl
    .get("/conversation")
    .then((res) => res.data)
    .catch((err) => err.message);
};
