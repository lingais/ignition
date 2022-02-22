import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Web3 from 'web3';

const Header: FC = () => {
	const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

	return (
		<header>
			<nav>
				<h1>
					<Link to="/" className="home-link" title="Home">0x574r finance - testnet</Link>
				</h1>
				<ul>
					<li><NavLink to="/stake" className="nav-item" activeClassName="nav-item active">Stake</NavLink></li>
					<li><NavLink to="/vault" className="nav-item" activeClassName="nav-item active">Vault</NavLink></li>
					<li><a className="nav-item" href="https://www.google.com" target="_blank">Documentation</a></li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
