import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
	return (
		<nav className="navigation">
			<ul>
				<li>
					<NavLink to="/" activeClassName="active" exact={true}>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to="/about" activeClassName="active">
						About
					</NavLink>
				</li>
				<li>
					<NavLink to="/contact" activeClassName="active">
						Contact
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default NavigationBar;
