import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../../config/api";
import { useLocation } from "react-router-dom";
import SinglePostComponent from "./SinglePostComponent";

const SinglePost = () => {
  const postId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["singlePost", postId],
    queryFn: () => getSinglePost(postId),
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      {data?.map((post) => {
        return (
          <div key={post.id}>
            <SinglePostComponent key={post.id} post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default SinglePost;
