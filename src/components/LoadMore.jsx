import { useContext } from "react";
import { RedditPostsAPIContext } from "../context/RedditPostsAPIContext";

const LoadMore = () => {
  const { visible, setVisible, filteredData } = useContext(
    RedditPostsAPIContext
  );

  const loadMore = () => {
    setVisible(visible + 9);
  };

  return (
    <>
      {visible < filteredData.length && (
        <div className="text-center">
          <button className="button" onClick={loadMore}>
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default LoadMore;
