import React, { FC } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './nav';
import HttpNotFound from './pages/404';
import Home from './pages/Home';
import Stake from './pages/Stake';
import Vault from './pages/Vault';
import Web3 from 'web3';
import { HARMONY_MAINNET, HARMONY_TESTNET } from '../constant';
import { Web3ContextProvider } from "react-dapp-web3";

export default function Routes() {
	/** function: listen {{{ */
	const listen = async (): Promise<void> => {
	};
	/** }}} */

	return (
		<Router>
			<Web3ContextProvider>
				<Nav />
				<main>
					<Switch>
						<Route exact path="/" ><Home /></Route>
						<Route path="/stake" ><Stake /></Route>
						<Route path="/vault" ><Vault /></Route>
						<Route><HttpNotFound /></Route>
					</Switch>
				</main>
			</Web3ContextProvider>
		</Router>
	);
}