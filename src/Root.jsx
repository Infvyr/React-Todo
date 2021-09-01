import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import App from './App';
import { About as AboutPage } from './pages/About';
import { Contact as ContactPage } from './pages/Contact';

import './reset.css';
import './index.css';

const Root = () => {
	const routes = [
		{ path: '/', name: 'Home', component: App, exact: true },
		{ path: '/about', name: 'About', component: AboutPage, exact: true },
		{ path: '/contact', name: 'Contact', component: ContactPage, exact: true },
	];

	return (
		<Router>
			<>
				<NavigationBar />
				<div className="main-app">
					<Switch>
						{routes.map(({ path, component, exact }) => {
							return <Route path={path} component={component} exact={exact} />;
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
