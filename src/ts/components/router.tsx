import React, { FC } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './nav';
import HttpNotFound from './pages/404';
import Home from './pages/Home';
import Stake from './pages/Stake';
import Vault from './pages/Vault';

const App: FC = () => (
	<Router>
		<Nav />
		<main>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/stake" component={Stake} />
				<Route path="/vault" component={Vault} />
				<Route component={HttpNotFound} />
			</Switch>
		</main>
	</Router>
);

export default App;
