import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState } from "react";
import { HARMONY_TESTNET } from '../constant';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from 'web3';

export default function Header() {
	/** function: connect_wallet_click {{{ */
	const connect_wallet_click = async (): Promise<void> => {
		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider,
				options: {
					infuraId: "INFURA_ID"
				}
			}
		};
		const web3Modal = new Web3Modal({
			cacheProvider: true,
			providerOptions,
			theme: "dark"
		});

		const provider = await web3Modal.connect();
	};
	/** }}} */
	/** function: connect_wallet_button {{{ */
	const connect_wallet_button = (): JSX.Element => {
		// TODO: need to verify if a wallet is connected	
		if (true) {
			return (<button className="btn btn-success wallet-connect">Connected</button>);
		}

		return (<button className="btn btn-warning wallet-connect" onClick={connect_wallet_click}>Connect wallet</button>);
	};
	/** }}} */

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
					{connect_wallet_button()}
				</div>
			</nav>
		</header>
	);
}