import { useQuery } from "@tanstack/react-query";

import "../post/post.scss";
import Posts from "../posts/Posts";
import { getPosts } from "../../config/api";

const Post = ({ user_id }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(user_id),
  });

  return isLoading ? (
    "loading..."
  ) : (
    <div className="posts">
      {data?.map((post) => (
        <div className="post" key={post.id}>
          <Posts post={post} key={post.id} />
        </div>
      ))}
    </div>
  );
};

export default Post;
