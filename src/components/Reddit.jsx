import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

import RedditArticle from './RedditArticle';
import RedditFilter from './RedditFilter';

const Reddit = () => {
	const [visible, setVisible] = useState(9);
	const [search, setSearch] = useState('');

	const fetchPosts = async () => {
		try {
			const response = await axios.get('https://www.reddit.com/r/aww.json');
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
	} = useQuery('posts', fetchPosts, {
		refetchOnWindowFocus: false,
	});

	const loadMore = () => {
		setVisible(visible + 9);
	};

	const handleSearch = e => {
		let searchedValue = e.target.value;
		searchedValue = searchedValue.trimStart();

		setSearch(searchedValue);
	};

	const filteredData = posts?.data?.children.filter(({ data: { title } }) =>
		title.toLowerCase().includes(search.toLocaleLowerCase())
	);

	return (
		<>
			{isLoading && <div className="loading">Fetching Reddit API data...</div>}
			{isError && (
				<div className="error">{error.message || 'Something went wrong!'}</div>
			)}

			{isSuccess && (
				<>
					<div className="reddit-blog-panel">
						<div className="search-form">
							<label htmlFor="search-input">
								Search
								<div className="search-input-wrapper">
									<input
										type="search"
										id="search-input"
										className="todo-input"
										placeholder="search reddit articles..."
										value={search}
										onChange={handleSearch}
									/>
									<svg className="svg-icon-search" viewBox="0 0 20 20">
										<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
									</svg>
								</div>
							</label>
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
