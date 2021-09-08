import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import App from './App';
import { Contact as ContactPage } from './pages/Contact';
import Blog from './components/Blog';

import './reset.css';
import './index.css';

const Root = () => {
	const routes = [
		{ path: '/', name: 'Home', component: App, exact: true },
		{ path: '/blog', name: 'Blog', component: Blog, exact: true },
		{ path: '/contact', name: 'Contact', component: ContactPage, exact: true },
	];

	return (
		<Router>
			<>
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
			</>
		</Router>
	);
};

export default Root;
