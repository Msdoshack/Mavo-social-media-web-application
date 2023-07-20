import "./changeprofilepics.scss";

import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { baseUrl } from "../../config/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getSingleUser,
  updateCoverPicture,
  updateProfilePicture,
} from "../../config/api";

const ChangeProfilePics = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);

  const user_id = parseInt(useLocation().pathname.split("/")[2]);

  const { data } = useQuery({
    queryKey: ["user", user_id],
    queryFn: () => getSingleUser(user_id),
  });
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await baseUrl.post("/upload", formData);
      return res.data;
    } catch (error) {
      return error.message;
    }
  };
  const queryClient = useQueryClient();

  const profilePictureMutation = useMutation({
    mutationFn: (newInfo) => updateProfilePicture(newInfo),
    onSuccess: () => queryClient.invalidateQueries(["user", data.id]),
  });
  const coverPictureMutation = useMutation({
    mutationFn: (newInfo) => updateCoverPicture(newInfo),
    onSuccess: () => queryClient.invalidateQueries(["user", data.id]),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profilePicUrl;

    coverUrl = coverPicture ? await upload(coverPicture) : data.cover_picture;
    profilePicUrl = profilePicture
      ? await upload(profilePicture)
      : data.profile_picture;

    profilePictureMutation.mutate({
      profile_picture: profilePicUrl,
    });

    coverPictureMutation.mutate({
      cover_picture: coverUrl,
    });

    setProfilePicture(null);
    setCoverPicture(null);
  };

  return (
    <div className="change-profile-pics-wrapper">
      <>
        <div className="changeContainer">
          <label htmlFor="profilePicture" title="Change Profile picture">
            +
          </label>
          <form>
            <input
              type="file"
              id="profilePicture"
              style={{ display: "none" }}
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
          </form>
        </div>
        <div className="changeCover">
          <label htmlFor="coverPicture" title="Change cover picture">
            +
          </label>
          <form>
            <input
              type="file"
              id="coverPicture"
              style={{ display: "none" }}
              onChange={(e) => setCoverPicture(e.target.files[0])}
            />
          </form>
        </div>{" "}
      </>

      {profilePicture && (
        <div className="togglecontainer">
          <div className="close">
            <button onClick={() => setProfilePicture(null)}>Close</button>
          </div>

          <div className="previewImage">
            {profilePicture && (
              <img src={URL.createObjectURL(profilePicture)} alt="" />
            )}
          </div>
          <div className="button">
            <button type="submit" onClick={handleSubmit}>
              set as profile picture
            </button>
          </div>
        </div>
      )}
      {coverPicture && (
        <div className="togglecontainer">
          <div className="close">
            <button onClick={() => setCoverPicture(null)}>Close</button>
          </div>

          <div className="previewImage">
            {coverPicture && (
              <img src={URL.createObjectURL(coverPicture)} alt="" />
            )}
          </div>
          <div className="button">
            <button type="submit" onClick={handleSubmit}>
              Change Cover
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeProfilePics;
