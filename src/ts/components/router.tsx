import React, { FC } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './nav';
import HttpNotFound from './pages/404';
import Home from './pages/Home';
import Stake from './pages/Stake';
import Vault from './pages/Vault';
import { HARMONY_MAINNET, HARMONY_TESTNET } from '../constant';

class Routes extends React.Component<{}, {}> {
	/** constructor {{{ */
	constructor(props: any) {
		super(props);
	}
	/** }}} */

	/** function: componentDidMount {{{ */
	componentDidMount = () => {
	};
	/** }}} */

	/** function: render {{{ */
	render() {
		return (
			<Router>
				<Nav />
					<main>
						<Switch>
							<Route exact path="/" ><Home /></Route>
							<Route path="/stake" ><Stake /></Route>
							<Route path="/vault" ><Vault /></Route>
							<Route><HttpNotFound /></Route>
						</Switch>
					</main>
			</Router>
		);
	}
	/** }}} */
};

export default Routes;
