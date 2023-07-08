import "./singleStory.scss";

/* MATERIAL U.I ICONS */
import {
  MoreHoriz,
  ArrowBackIos,
  KeyboardArrowD,
  Maximize,
  Minimize,
  Delete,
} from "../../icons/icon";

/* REACT/ CUSTOM HOOKS AND THIRD PARTY LIBRARY */
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { delStory } from "../../../config/api";
import moment from "moment";
/* /////////////////////////////////////////////// */

import avatar2 from "../../../assets/avatar2.PNG";

const SingleStoryComponent = ({ story }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openViews, setOpenViews] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const stories = Array.from(
    story?.map((story) => {
      return story.image;
    })
  );

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const deleteStoryMutation = useMutation({
    mutationFn: () => delStory(story[currentIndex].id),
    onSuccess: () => queryClient.invalidateQueries(["single story"]),
  });

  const handleDeleteStory = () => {
    deleteStoryMutation.mutate();
    setOpenDelete(false);
  };

  const slideFn = () => {
    // setCurrentIndex((currentIndex + 1) % stories.length);

    if (currentIndex === stories.length - 1) {
      navigate("/");
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(slideFn, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, stories]);

  return (
    <div className="singleStoryContainer">
      <div className="slideContainer">
        {story.map((story, index) => (
          <div
            className="slide"
            key={story.id}
            onClick={() => setCurrentIndex(index)}
          >
            <div
              id={currentIndex === index ? "play-animation" : ""}
              className={currentIndex !== index ? "slider" : "slider active"}
            ></div>
          </div>
        ))}
      </div>

      <div className="infoContainer">
        <>
          <div className="userInfo">
            <span> {moment(story[currentIndex].created_at).fromNow()}</span>
            <div
              className="username"
              onClick={() =>
                navigate(`/profile/${story[currentIndex].user_id}`)
              }
            >
              {story[currentIndex].username}
            </div>
            <div className="profilePicture">
              <img
                src={
                  `/upload/${story[currentIndex].profile_picture}` || avatar2
                }
                alt="user"
                width="40px"
                height="40px"
              />
            </div>

            <div>
              <ArrowBackIos onClick={() => navigate("/")} />
            </div>
          </div>
          <div className="icon">
            {openDelete ? (
              <div onClick={() => setOpenDelete((prev) => !prev)}>
                <Minimize />
              </div>
            ) : (
              <MoreHoriz onClick={() => setOpenDelete((prev) => !prev)} />
            )}
            {openDelete && (
              <div>
                <Delete
                  style={{ fontSize: "20px", color: "red" }}
                  onClick={handleDeleteStory}
                />
              </div>
            )}
          </div>
        </>
      </div>
      <div onClick={slideFn} className="imageContainer">
        <img src={`/upload/${stories[currentIndex]}`} />
      </div>
      <div className="footer">
        {openViews && <div className="views">views 0</div>}

        {!openViews ? (
          <div className="arrow">
            <KeyboardArrowD onClick={() => setOpenViews((prev) => !prev)} />
          </div>
        ) : (
          <div className="maximize">
            <Maximize onClick={() => setOpenViews((prev) => !prev)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleStoryComponent;
