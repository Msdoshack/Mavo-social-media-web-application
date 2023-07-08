import Post from "../../components/post/Post";
import Stories from "../../components/stories/Stories";
import Share from "../../components/share/Share";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Stories />
      <Share />
      <Post />
    </div>
  );
};

export default Home;
