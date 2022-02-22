import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import web3 from 'web3';

const Header: FC = () => (
	<header>
		<nav>
			<h1>
				<Link to="/" className="home-link" title="Home">0x574r finance</Link>
			</h1>
			<ul>
				<li><NavLink to="/stake" className="nav-item" activeClassName="nav-item active">Stake</NavLink></li>
				<li><NavLink to="/vault" className="nav-item" activeClassName="nav-item active">Vault</NavLink></li>
			</ul>
		</nav>
	</header>
);

export default Header;
