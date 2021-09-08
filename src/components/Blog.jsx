import { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { RedditPostsAPIContext } from '../context/RedditPostsAPIContext';

import Search from './Search';
import RedditArticle from './RedditArticle';
import LoadMore from './LoadMore';
// import BlogFilter from './BlogFilter';

const Blog = () => {
	const [search, setSearch] = useState('');
	const [visible, setVisible] = useState(9);
	// const [filter, setFilter] = useState('default');

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

	const handleSearch = e => {
		let searchedValue = e.target.value;
		searchedValue = searchedValue.trimStart();

		setSearch(searchedValue);
	};

	const filteredData = posts?.data?.children.filter(
		({ data: { title } }) => title.toLowerCase().indexOf(search) > -1
	);

	// const postsFiltered = () => {
	// 	switch (filter) {
	// 		case 'ASC':
	// 			return filteredData.filter(({ data: { score } }) => score < 200);
	// 		case 'DESC':
	// 			return filteredData.filter(
	// 				({ data: { num_comments } }) => num_comments < 100
	// 			);
	// 		default:
	// 			return filteredData;
	// 	}
	// };

	return (
		<RedditPostsAPIContext.Provider
			value={{
				// posts,
				// search,
				setSearch,
				handleSearch,
				visible,
				setVisible,
				filteredData,
				// filter,
				// setFilter,
				// postsFiltered,
			}}>
			<>
				{isLoading && (
					<div className="loading">Fetching Reddit API data...</div>
				)}
				{isError && (
					<div className="error">
						{error.message || 'Something went wrong!'}
					</div>
				)}

				{isSuccess && (
					<>
						<div className="container">
							<div className="reddit-blog-panel">
								<Search />
								{/* <BlogFilter /> */}
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

							<LoadMore />
						</div>
					</>
				)}
			</>
		</RedditPostsAPIContext.Provider>
	);
};

export default Blog;
