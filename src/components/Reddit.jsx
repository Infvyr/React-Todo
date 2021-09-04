import { useState } from 'react';
import { useQuery } from 'react-query';
// import useFetch from '../hooks/useFetch';
import RedditArticle from './RedditArticle';

const Reddit = () => {
	// const {
	// 	data: posts,
	// 	isPending,
	// 	error,
	// } = useFetch('https://www.reddit.com/r/aww.json');

	const {
		data: posts,
		isLoading,
		isError,
		error,
		isSuccess,
	} = useQuery('posts', fetchPosts, {
		refetchOnWindowFocus: false,
	});

	const [visible, setVisible] = useState(9);

	function fetchPosts() {
		return fetch('https://www.reddit.com/r/aww.json').then(response =>
			response.json()
		);
	}

	function loadMore() {
		setVisible(visible + 9);
	}

	return (
		<>
			{isLoading && <div className="loading">Fetching Reddit API data...</div>}
			{isError && (
				<div className="error">{error.message || 'Something went wrong!'}</div>
			)}

			{isSuccess && (
				<>
					<div className="reddit-articles">
						{posts.data.children
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
					{visible < posts.data.children.length && (
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
