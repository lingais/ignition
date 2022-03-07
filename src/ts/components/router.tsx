import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from './nav';
import HttpNotFound from './pages/404';
import Home from './pages/Home';
import Stake from './pages/Stake';

import { Web3ContextProvider } from "react-dapp-web3";

export default function Routes() {
	const location = useLocation();

	return (
		<Web3ContextProvider>
			<Nav />
			<main>
				<AnimatePresence exitBeforeEnter>
					<Switch location={location} key={location.pathname}>
						<Route exact path="/" ><Home /></Route>
						<Route path="/stake" ><Stake /></Route>
						<Route><HttpNotFound /></Route>
					</Switch>
				</AnimatePresence>
			</main>
		</Web3ContextProvider>
	);
}