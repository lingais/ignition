import React, { FC } from 'react';
import { ConnectWallet } from "@3rdweb/react";
import { Link, NavLink } from 'react-router-dom';
import { useState } from "react"

class Header extends React.Component<Props, {}> {
	

	/** constructor {{{ */
	constructor(props: any) {
		super(props);
	}
	/** }}} */

	/** function: connect_wallet {{{ */
	private connect_wallet = async (): Promise<void> => {
	};
	/** }}} */

	/** function: render {{{ */
	render() {
		return (
			<header>
				<nav>
					<h1>
						<Link to="/" className="home-link" title="Home">Insignis Finance - testnet</Link>
					</h1>
					{/* <li><NavLink to="/stake" className="nav-item" activeClassName="nav-item active">Stake</NavLink></li> */}
					{/* <li><NavLink to="/vault" className="nav-item" activeClassName="nav-item active">Vault</NavLink></li> */}
					{/* <li><a className="nav-item" href="https://www.google.com" target="_blank">Documentation</a></li> */}
					{/* <li><a className="nav-item" href="https://dexscreener.com/harmony" target="_blank">Chart</a></li> */}
					<div className="connect">
					</div>
				</nav>
			</header>
		);
	}
	/** }}} */
};

export default Header;
