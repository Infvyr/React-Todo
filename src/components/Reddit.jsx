import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

import RedditArticle from "./RedditArticle";
import RedditFilter from "./RedditFilter";

const Reddit = () => {
  const [visible, setVisible] = useState(9);
  const [search, setSearch] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await axios.get("https://www.reddit.com/r/aww.json");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const {
    data: posts,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery("posts", fetchPosts, {
    refetchOnWindowFocus: false,
  });

  const loadMore = () => {
    setVisible(visible + 9);
  };

  const handleSearch = e => {
    let searchedValue = e.target.value;
    searchedValue = searchedValue.trim().replace(/\s/g, "");

    setSearch(searchedValue);
  };

  const filteredData = posts?.data?.children.filter(({ data: { title } }) =>
    title.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <>
      {isLoading && <div className="loading">Fetching Reddit API data...</div>}
      {isError && (
        <div className="error">{error.message || "Something went wrong!"}</div>
      )}

      {isSuccess && (
        <>
          <div className="reddit-blog-panel">
            <div className="search-form">
              <p>Search</p>
              <input
                type="search"
                className="todo-input"
                placeholder="search reddit articles..."
                value={search}
                onChange={handleSearch}
              />
            </div>

            <RedditFilter posts={filteredData} />
          </div>

          <div className="reddit-articles">
            {filteredData
              .slice(0, visible)
              .map(
                ({
                  data: {
                    id,
                    author,
                    created,
                    permalink,
                    title,
                    num_comments,
                    score,
                    total_awards_received,
                  },
                }) => (
                  <RedditArticle
                    key={id}
                    id={id}
                    author={author}
                    created={created}
                    permalink={permalink}
                    title={title}
                    num_comments={num_comments}
                    score={score}
                    total_awards_received={total_awards_received}
                  />
                )
              )}
          </div>
          {visible < filteredData.length && (
            <div className="text-center">
              <button className="button" onClick={loadMore}>
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Reddit;
