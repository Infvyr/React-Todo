import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import App from './App';
import { Blog as BlogPage } from './pages/Blog';
import { Contact as ContactPage } from './pages/Contact';

import './reset.css';
import './index.css';

const Root = () => {
	const routes = [
		{ path: '/', name: 'Home', component: App, exact: true },
		{ path: '/blog', name: 'Blog', component: BlogPage, exact: true },
		{ path: '/contact', name: 'Contact', component: ContactPage, exact: true },
	];

	return (
		<Router>
			<React.Fragment>
				<NavigationBar />
				<div className="main-app">
					<Switch>
						{routes.map(({ path, component, exact }) => {
							return (
								<Route
									key={path}
									path={path}
									component={component}
									exact={exact}
								/>
							);
						})}
						<Route path="*">
							<Redirect to="/" />
						</Route>
					</Switch>
				</div>
			</React.Fragment>
		</Router>
	);
};

export default Root;
