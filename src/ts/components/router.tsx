import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './nav';
import HttpNotFound from './pages/404';
import Home from './pages/Home';
import Stake from './pages/Stake';
import Vault from './pages/Vault';
import store from '../redux/store';

import moment from 'moment';
import { AbiItem } from 'web3-utils';
import { HARMONY_TESTNET, INSIGNIS_ABI, INSIGNIS_CONTRACT, INSIGNIS_DECIMALS } from '../constant';
import { Web3ContextProvider } from "react-dapp-web3";
import { update_wallet, update_balance, update_balance_vault, RootState, update_rebase_timer, update_epoch, update_withdraw_timer } from '../redux/slice_web3';

export default function Routes() {
	/** function: listen {{{ */
	const listen = (): void => {
		listen_rebase_timer();

		setInterval(async () => {
			await listen_wallet();
			await listen_epoch();
			await listen_balance();
			await listen_balance_vault();
			listen_rebase_timer();
			listen_withdraw_timer();
		}, 1000);
	};
	/** }}} */
	/** function: listen_wallet {{{ */
	const listen_wallet = async (): Promise<void> => {
		const state = store.getState();
		const selected = (await state.web3.web3.eth.getAccounts())[0];

		if (state.web3.wallet != selected) store.dispatch(update_wallet(selected));
	};
	/** }}} */
	/** function: listen_balance {{{ */
	const listen_balance = async (): Promise<void> => {
		try {
			const state = store.getState();
			let balance = 0;

			if (state.web3.wallet) {
				const contract = new state.web3.web3.eth.Contract(INSIGNIS_ABI as AbiItem[], INSIGNIS_CONTRACT);

				balance = await contract.methods.balanceOf(state.web3.wallet).call() / Math.pow(10, INSIGNIS_DECIMALS);
			}

			if (state.web3.balance != balance) store.dispatch(update_balance(balance));
		} catch (error) {
			console.error("an error occured while probing for wallet's balance - are you using the correct network?");
		}
	};
	/** }}} */
	/** function: listen_balance_vault {{{ */
	const listen_balance_vault = async (): Promise<void> => {
		try {
			const state = store.getState();
			let balance_vault = 0;

			if (state.web3.wallet) {
				const contract = new state.web3.web3.eth.Contract(INSIGNIS_ABI as AbiItem[], INSIGNIS_CONTRACT);

				balance_vault = await contract.methods.balanceStakeAmountOf(state.web3.wallet, INSIGNIS_CONTRACT).call();
			}

			if (state.web3.balance_vault != balance_vault) store.dispatch(update_balance_vault(balance_vault));
		} catch (error) {
			console.error("an error occured while probing for wallet's balance - are you using the correct network?");
			console.error(error);
		}
	};
	/** }}} */

	/** function: listen_epoch {{{ */
	const listen_epoch = async (): Promise<void> => {
		try {
			const state = store.getState();
			let epoch = 0;

			if (state.web3.wallet) {
				const contract = new state.web3.web3.eth.Contract(INSIGNIS_ABI as AbiItem[], INSIGNIS_CONTRACT);
				// TODO: smart contract needs a getEpoch method
				epoch = await contract.methods.epoch.call();
			}

			//if (state.web3.epoch != epoch) store.dispatch(update_epoch(epoch));
		} catch (error) {
			console.error("an error occured while probing for Insignis's rebase epoch - are you using the correct network?");
			console.error(error);
		}
	};
	/** }}} */
	/** function: listen_rebase_timer {{{ */
	const listen_rebase_timer = async (): Promise<void> => {
		const rebase = moment().add(1, 'days').startOf('day');
		const duration = moment.duration(rebase.diff(moment()));

		store.dispatch(update_rebase_timer(duration));
	};
	/** }}} */
	/** function: listen_withdraw_timer {{{ */
	const listen_withdraw_timer = async (): Promise<void> => {
		const state = store.getState();
		const contract = new state.web3.web3.eth.Contract(INSIGNIS_ABI as AbiItem[], INSIGNIS_CONTRACT);
		const timer = await contract.methods.balanceStakeExpireOf(state.web3.wallet, INSIGNIS_CONTRACT).call();

		store.dispatch(update_withdraw_timer(timer));
	};
	/** }}} */

	/** function: useEffect {{{ */
	useEffect(() => {
		listen();
	});
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