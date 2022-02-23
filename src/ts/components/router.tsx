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

class Routes extends React.Component<{}, State_Global> {
	/** variables {{{ */
	/** }}} */

	/** constructor {{{ */
	constructor(props: any) {
		super(props);

		this.state = {
			account: {
				is_harmony: false
			}
		};
	}
	/** }}} */

	/** function: listen {{{ */
	private listen = async (): Promise<void> => {
		this.listen_wallet();
	};
	/** }}} */
	/** function: listen_wallet {{{ */
	private listen_wallet = (): void => {
	};
	/** }}} */

	/** function: get_wallet {{{ */
	private get_wallet = async (): Promise<void> => {
	};
	/** }}} */
	/** function: get_network {{{ */
	private get_network = async (): Promise<void> => {
	};
	/** }}} */

	/** function: set_provider {{{ */
	private set_provider = (provider: any): void => {
	};
	/** }}} */

	/** function: componentDidMount {{{ */
	componentDidMount = () => {
		this.listen();
	};
	/** }}} */

	/** function: render {{{ */
	render() {
		return (
			<Router>
				<Web3ContextProvider>
					<Nav account={this.state.account} set_provider={this.set_provider} />
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
	/** }}} */
};

export default Routes;
