import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './nav';
import HttpNotFound from './pages/404';
import Home from './pages/Home';
import Stake from './pages/Stake';
import Vault from './pages/Vault';
import store from '../redux/store';
import { format, addDays, startOfDay, formatDistance, fromUnixTime, differenceInSeconds } from 'date-fns';

import { AbiItem } from 'web3-utils';
import { HARMONY_TESTNET, INSIGNIS_ABI, INSIGNIS_CONTRACT, INSIGNIS_DECIMALS } from '../constant';
import { Web3ContextProvider } from "react-dapp-web3";
import { update_wallet, update_balance, update_balance_vault, RootState, update_rebase_timer, update_epoch, update_withdraw_timer, update_withdraw_possible, update_network } from '../redux/slice_web3';

export default function Routes() {
	/** function: listen {{{ */
	const listen = (): void => {
		listen_rebase_timer();

		setInterval(async () => {
			await listen_network();
			await listen_wallet();
			await listen_epoch();
			await listen_balance();
			await listen_balance_vault();
			listen_rebase_timer();
			listen_withdraw_timer();
			listen_withdraw_possible();
		}, 1000);
	};
	/** }}} */
	/** function: listen_network {{{ */
	const listen_network = async (): Promise<void> => {
		try {
			const state = store.getState();
			const network = (await state.web3.web3.eth.net.getId());

			if (state.web3.network != network) store.dispatch(update_network(network));
		} catch (error) {
			console.error(error);
		}
	};
	/** }}} */
	/** function: listen_wallet {{{ */
	const listen_wallet = async (): Promise<void> => {
		if (is_network_correct()) {
			const state = store.getState();
			const selected = (await state.web3.web3.eth.getAccounts())[0];

			if (state.web3.wallet != selected) store.dispatch(update_wallet(selected));
		}

		else {
			store.dispatch(update_wallet(null));
		}
	};
	/** }}} */
	/** function: listen_balance {{{ */
	const listen_balance = async (): Promise<void> => {
		if (is_wallet_correct()) {
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
		}

		else {
			store.dispatch(update_balance(0));
		}
	};
	/** }}} */
	/** function: listen_balance_vault {{{ */
	const listen_balance_vault = async (): Promise<void> => {
		if (is_wallet_correct()) {
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
		}

		else {
			store.dispatch(update_balance_vault(0));
		}
	};
	/** }}} */
	/** function: listen_epoch {{{ */
	const listen_epoch = async (): Promise<void> => {
		// TODO: smart contract does not have a public getter for epoch index yet
		if (is_wallet_correct()) {
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
		}

		else {
			// TODO: set epoch back to 0
		}
	};
	/** }}} */
	/** function: listen_rebase_timer {{{ */
	const listen_rebase_timer = async (): Promise<void> => {
		if (is_wallet_correct()) {
			const rebase = startOfDay(addDays(new Date(), 1));
			const distance = formatDistance(rebase, new Date(), { addSuffix: true });

			store.dispatch(update_rebase_timer(distance));
		}

		else {
			store.dispatch(update_rebase_timer(0));
		}
	};
	/** }}} */
	/** function: listen_withdraw_possible {{{ */
	const listen_withdraw_possible = async (): Promise<void> => {
		if (is_wallet_correct()) {
			const state = store.getState();
			const contract = new state.web3.web3.eth.Contract(INSIGNIS_ABI as AbiItem[], INSIGNIS_CONTRACT);
			const timer = fromUnixTime(await contract.methods.balanceStakeExpireOf(state.web3.wallet, INSIGNIS_CONTRACT).call());
			const difference = differenceInSeconds(timer, new Date());
			const possible = difference < 0;

			store.dispatch(update_withdraw_possible(possible));
		}

		else {
			store.dispatch(update_withdraw_possible(false));
		}
	};
	/** }}} */
	/** function: listen_withdraw_timer {{{ */
	const listen_withdraw_timer = async (): Promise<void> => {
		if (is_wallet_correct()) {
			const state = store.getState();
			const contract = new state.web3.web3.eth.Contract(INSIGNIS_ABI as AbiItem[], INSIGNIS_CONTRACT);
			const timer = fromUnixTime(await contract.methods.balanceStakeExpireOf(state.web3.wallet, INSIGNIS_CONTRACT).call());
			const distance = formatDistance(timer, new Date(), { addSuffix: true });

			store.dispatch(update_withdraw_timer(distance));
		}

		else {
			store.dispatch(update_withdraw_timer(0));
		}
	};
	/** }}} */

	/** function: is_network_correct {{{ */
	const is_network_correct = (): boolean => {
		const state = store.getState();

		//return state.web3.network === HARMONY_MAINNET;
		return state.web3.network === HARMONY_TESTNET;
	};
	/** }}} */
	/** function: is_wallet_correct {{{ */
	const is_wallet_correct = (): boolean => {
		const state = store.getState();

		if (state.web3.wallet && is_network_correct()) return true;
		else return false;
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