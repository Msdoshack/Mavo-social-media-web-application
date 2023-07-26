import { useQuery } from "@tanstack/react-query";
import SingleStoryComponent from "../../components/stories/singleStory/SingleStory";
import { getStory } from "../../config/api";
import { useLocation } from "react-router-dom";

const SingleStory = () => {
  const user_id = parseInt(useLocation().pathname.split("/")[2]);
  const { isLoading, data, error } = useQuery({
    queryKey: ["single story"],
    queryFn: () => getStory(user_id),
  });

  if (isLoading) return "Loading..";

  return <SingleStoryComponent story={data} />;
};

export default SingleStory;
