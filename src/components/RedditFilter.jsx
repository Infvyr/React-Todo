const RedditFilter = () => {
  return (
    <div className="reddit-filter">
      <div className="reddit-filter__by-title reddit-filter-wrapper">
        <p>Filter by Title:</p>
        <button
          type="button"
          className="button reddit-btn--az reddit-btn--filter"
        >
          A-Z
        </button>
        <button
          type="button"
          className="button reddit-btn--za reddit-btn--filter"
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

export default RedditFilter;
