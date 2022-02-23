import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState } from "react";
import { HARMONY_TESTNET } from '../constant';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from 'web3';

class Header extends React.Component<Props_Nav, {}> {
	/** constructor {{{ */
	constructor(props: any) {
		super(props);
	}
	/** }}} */

	/** function: connect_wallet_click {{{ */
	private connect_wallet_click = async (): Promise<void> => {
		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider,
				options: {
					infuraId: "INFURA_ID"
				}
			}
		};
		const web3Modal = new Web3Modal({
			cacheProvider: false,
			providerOptions
		});

		web3Modal.clearCachedProvider();
		const provider = await web3Modal.connect();
		const web3 = new Web3(provider);
	};
	/** }}} */
	/** function: connect_wallet_button {{{ */
	private connect_wallet_button = (): JSX.Element => {
		if (this.props.account.is_harmony) {
			return (<button className="btn btn-success wallet-connect">Connected</button>);
		}

		return (<button className="btn btn-warning wallet-connect" onClick={ this.connect_wallet_click }>Connect wallet</button>);
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
						{this.connect_wallet_button()}
					</div>
				</nav>
			</header>
		);
	}
	/** }}} */
};

export default Header;
