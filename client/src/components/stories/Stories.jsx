import "../stories/stories.scss";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { baseUrl } from "../../config/axios";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { addStory, getStories } from "../../config/api";

import avatar2 from "../../assets/avatar2.PNG";

const Stories = () => {
  const [story, setStory] = useState(null);
  const { isLoading, error, data } = useQuery({
    queryKey: ["stories"],
    queryFn: () => getStories(),
  });

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", story);
      const response = await baseUrl.post("/upload", formData);
      return response.data;
    } catch (error) {
      return error.message;
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (story) => addStory(story),
    onSuccess: () => queryClient.invalidateQueries(["stories"]),
  });

  const handleStories = async (e) => {
    e.preventDefault();
    let storyUrl;
    if (story) storyUrl = await upload();
    mutation.mutate({ image: storyUrl });
    setStory("");
  };

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  if (isLoading) return "Loading...";
  if (error) return <div>{error.message}</div>;

  return (
    <div className="stories">
      <div className={data?.length ? "story" : "userStory"}>
        <img
          src={
            currentUser.profile_picture
              ? `/upload/${currentUser.profile_picture}`
              : avatar2
          }
        />
        <span>{currentUser.username}</span>
        <input
          type="file"
          id="story"
          onChange={(e) => setStory(e.target.files[0])}
          style={{ display: "none" }}
        />
        <label htmlFor="story">
          <span className="addStoryIcon" title="Add Story">
            +
          </span>
        </label>
      </div>
      {story && (
        <div className="uploadStory">
          <span onClick={() => setStory(null)}>X</span>

          {story && (
            <img
              className="file"
              alt=""
              src={URL.createObjectURL(story)}
              width="200"
              height="200"
            />
          )}
          <button onClick={handleStories}>Share</button>
        </div>
      )}

      {data?.map((story) => (
        <div className="story" key={story.id}>
          <img
            src={`/upload/${story.image}`}
            alt=""
            onClick={() => navigate(`/story/${story.user_id}`)}
            key={story.id}
          />
          <div className="footerEl">
            <Link to={"/profile/" + story.user_id}>
              <div className="username">
                <span>{story.username}</span>
              </div>
            </Link>
          </div>
        </div>
      ))}
      {data?.length === 0 && <div className="noStory">NO STORY </div>}
    </div>
  );
};

export default Stories;
