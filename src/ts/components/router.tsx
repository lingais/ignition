import React, { FC } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './nav';
import HttpNotFound from './pages/404';
import Home from './pages/Home';
import Stake from './pages/Stake';
import Vault from './pages/Vault';
import Web3 from 'web3';

class Routes extends React.Component<{}, State> {
	/** constructor {{{ */
	constructor(props: any) {
		super(props);
		this.state = {
			network: null,
			web3: null,
			wallet: ""
		};
	}
	/** }}} */

	/** function: get_web3 {{{ */
	private get_web3 = (): Web3 => {
		return new Web3(Web3.givenProvider || "ws://localhost:8545");
	};
	/** }}} */
	/** function: get_wallet {{{ */
	private get_wallet = async (): Promise<any> => {
		return null;
	};
	/** }}} */

	/** function: componentDidMount {{{ */
	componentDidMount = () => {
		this.setState({
			web3: this.get_web3(),
			wallet: this.get_wallet()
		}, () => {
			console.log("toast:");
			console.log(this.state.web3);
			console.log(this.state.wallet);

		});
	};
	/** }}} */

	/** function: render {{{ */
	render() {
		return (
			<Router>
				<Nav web3={this.state.web3} wallet={this.state.wallet} />
				<main>
					<Switch>
						<Route exact path="/" ><Home web3={this.state.web3} wallet={this.state.wallet} /></Route>
						<Route path="/stake" ><Stake web3={this.state.web3} wallet={this.state.wallet} /></Route>
						<Route path="/vault" ><Vault web3={this.state.web3} wallet={this.state.wallet} /></Route>
						<Route><HttpNotFound /></Route>
					</Switch>
				</main>
			</Router>
		);
	}
	/** }}} */
};

export default Routes;
