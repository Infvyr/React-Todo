import { useContext } from "react";
import { RedditPostsAPIContext } from "../context/RedditPostsAPIContext";

const BlogFilter = () => {
  const { filter, setFilter, filterPosts } = useContext(RedditPostsAPIContext);

  return (
    <div className="reddit-filter">
      <div className="reddit-filter__by-title reddit-filter-wrapper">
        <p>Filter by Title:</p>
        <button
          type="button"
          className={`button reddit-btn--az reddit-btn--filter ${
            filter === "asc" ? "active" : ""
          }`}
          onClick={() => {
            setFilter("asc");
            filterPosts();
            console.log(filter);
          }}
        >
          A-Z
        </button>
        <button
          type="button"
          className={`button reddit-btn--za reddit-btn--filter ${
            filter === "desc" ? "active" : ""
          }`}
          onClick={() => {
            setFilter("desc");

            filterPosts();
            console.log(filter);
          }}
        >
          Z-A
        </button>
      </div>

      <div className="reddit-filter__by-date reddit-filter-wrapper">
        <p>Filter by Published Date:</p>
        <button
          type="button"
          className="button reddit-btn--newer reddit-btn--filter"
        >
          Newer
        </button>
        <button
          type="button"
          className="button reddit-btn--older reddit-btn--filter"
        >
          Older
        </button>
      </div>
    </div>
  );
};

export default BlogFilter;
