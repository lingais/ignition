import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Web3 from 'web3';

class Header extends React.Component {
	constructor(props: any) {
		super(props);
	}

	render() { 
		return (
		<header>
			<nav>
				<h1>
					<Link to="/" className="home-link" title="Home">Insignis Finance - testnet</Link>
				</h1>
				<ul>
					<li><NavLink to="/stake" className="nav-item" activeClassName="nav-item active">Stake</NavLink></li>
					<li><NavLink to="/vault" className="nav-item" activeClassName="nav-item active">Vault</NavLink></li>
					<li><a className="nav-item" href="https://www.google.com" target="_blank">Documentation</a></li>
				</ul>
			</nav>
		</header>
	);
		}
};

export default Header;
