import "../share/share.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../../config/axios";

import avatar from "../../assets/avatar2.PNG";

const Share = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await baseUrl.post("/upload", formData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newPost) => {
      return baseUrl.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleShare = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();

    mutation.mutate({ description, image: imgUrl });

    setDescription("");
    setFile("");
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={
                currentUser.profile_picture
                  ? `/upload/${currentUser.profile_picture}`
                  : avatar
              }
              alt=""
            />
            <input
              type="text"
              placeholder={`what's on your mind ${currentUser.username}`}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={""} alt="" />
                <span> Add Image</span>
              </div>
            </label>
            <div className="item">
              <span> Add Place</span>
            </div>
            <div className="item">
              <span> Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
