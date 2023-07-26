import { baseUrl, baseUrlPrivate } from "./axios";

export const getLikes = async (postId) => {
  return await baseUrlPrivate
    .get("/likes?post_id=" + postId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const addLikes = async (postId) => {
  return await baseUrlPrivate
    .post("/likes", postId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const deleteLikes = async (postId) => {
  return await baseUrlPrivate
    .delete("/likes?post_id=" + postId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getPosts = async (userId) => {
  return await baseUrlPrivate
    .get("/post?user_id=" + userId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getSinglePost = async (postId) => {
  return await baseUrlPrivate
    .get(`/post/${postId}`)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const deletePost = async (postId) => {
  return await baseUrlPrivate
    .delete("/post/" + postId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getSingleUser = async (userId) => {
  return await baseUrlPrivate
    .get("/users/find/" + userId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getSuggestedUsers = async () => {
  return await baseUrlPrivate
    .get("/users/suggestedUsers")
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getRelationship = async (followedUserId) => {
  return await baseUrlPrivate
    .get("/relationships?followed_user_id=" + followedUserId)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const unfollow = async (userId) => {
  return await baseUrlPrivate
    .delete("/relationships?user_id=" + userId)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const follow = async (userId) => {
  return await baseUrlPrivate
    .post("/relationships", userId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getComments = async (postId) => {
  return await baseUrlPrivate
    .get("/comments?post_id=" + postId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const addComments = async (newComment) => {
  return await baseUrlPrivate
    .post("/comments", newComment)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const delComment = async (commendId) => {
  return await baseUrlPrivate
    .delete(`/comments?comment_id=${commendId}`)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getStories = async () => {
  return await baseUrlPrivate
    .get("/stories")
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const getStory = async (user_id) => {
  return await baseUrlPrivate
    .get(`/story/${user_id}`)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const addStory = async (newStory) => {
  return await baseUrlPrivate
    .post("/stories", newStory)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const delStory = async (storyId) => {
  return await baseUrlPrivate
    .delete(`/stories?story_id=${storyId}`)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getCommentLikes = async (commentid) => {
  return await baseUrlPrivate
    .get(`/commentlikes?comment_id=${commentid}`)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const addCommentLikes = async (userId) => {
  return await baseUrlPrivate
    .post("/commentlikes", userId)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const delCommentLikes = async (commentId) => {
  return await baseUrlPrivate
    .delete("/commentlikes?comment_id=" + commentId)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const updateUserInfor = async (updatedInfo) => {
  return await baseUrlPrivate
    .patch("/users", updatedInfo)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const updateCoverPicture = async (updatedInfo) => {
  return await baseUrlPrivate
    .patch("/users/coverPicture", updatedInfo)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const updateProfilePicture = async (updatedInfo) => {
  return await baseUrlPrivate
    .patch("/users/profilePicture", updatedInfo)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getMyFollowers = async (id) => {
  return await baseUrlPrivate
    .get("/users/followers?id=" + id)
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const getIamFollowing = async (id) => {
  return await baseUrlPrivate
    .get("/users/following?id=" + id)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getInbox = async () => {
  return await baseUrlPrivate
    .get("/inbox/")
    .then((res) => res.data)
    .catch((err) => err.message);
};
export const startNewConversation = async (convoInfo) => {
  return await baseUrlPrivate
    .post("/conversation/", convoInfo)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getChat = async (user_id) => {
  return await baseUrlPrivate
    .get("/message/" + user_id)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const SendMessage = async (conversation_id, message) => {
  return await baseUrlPrivate
    .post("/message/" + conversation_id, message)
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const getUserConversation = async () => {
  return await baseUrlPrivate
    .get("/conversation")
    .then((res) => res.data)
    .catch((err) => err.message);
};

export const logout = async () => {
  return await baseUrl
    .get("/auth/logout")
    .then((res) => res.data)
    .catch((err) => err.message);
};
