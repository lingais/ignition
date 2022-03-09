import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '../scss/index.scss';
import 'animate.css';
import 'regenerator-runtime/runtime';
import { AbiItem } from 'web3-utils';

import { update_wallet, update_balance, update_epoch, update_network, update_supply, update_usd, update_mcap } from './redux/slice_web3';
import { HARMONY_TESTNET, INSIGNIS_ABI, INSIGNIS_CONTRACT } from './constant';
import { trigger_heartbeat, timer_rebase_update } from './redux/slice_countdown';

import store from './redux/store';
import Router from './components/router';

/** function: listen {{{ */
const listen = (): void => {
	setInterval(async () => {
		listen_network();
		listen_wallet();
		listen_epoch();
		listen_balance();
		listen_stats();
		listen_rebase_timer();
	}, 500);
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
			let balance: number = 0;

			if (state.web3.wallet) {
				const contract = new state.web3.web3.eth.Contract(INSIGNIS_ABI as AbiItem[], INSIGNIS_CONTRACT);

				balance = parseFloat(await contract.methods.balanceOf(state.web3.wallet).call());
			}

			store.dispatch(update_balance(balance));
		} catch (error) {
			console.error("an error occured while probing for wallet's balance - are you using the correct network?");
		}
	}

	else {
		//store.dispatch(update_balance(0));
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
				epoch = await contract.methods.getEpoch().call();
			}

			// epoch has been updated - trigger heartbeat
			if (state.web3.epoch != epoch) {
				store.dispatch(update_epoch(epoch));
				listen_epoch_trigger();
			}
		} catch (error) {
			console.error("an error occured while probing for Insignis's rebase epoch - are you using the correct network?");
			console.error(error);
		}
	}

	else {
		store.dispatch(update_epoch(0));
	}
};
/** }}} */
/** function: listen_epoch_trigger {{{ */
const listen_epoch_trigger = (): void => {
	store.dispatch(trigger_heartbeat());

	// required to turn off the heartbeat clock
	setTimeout(() => store.dispatch(trigger_heartbeat()), 2000);
};
/** }}} */
/** function: listen_rebase_timer {{{ */
const listen_rebase_timer = async (): Promise<void> => {
	if (is_wallet_correct()) {
		store.dispatch(timer_rebase_update());
	}

	else {
		store.dispatch(timer_rebase_update());
	}
};
/** }}} */
/** function: listen_stats {{{ */
const listen_stats = async (): Promise<void> => {
	// TODO: use external tools to gather these numbers not the contract

	//store.dispatch(update_supply(supply));
	//store.dispatch(update_usd(usd));
	//store.dispatch(update_mcap(mcap));
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

(() => {
	listen();

	const htmlElementName: string = 'app';
	const jsxElement: JSX.Element = (
		<Provider store={store}>
			<HashRouter>
				<Router />
			</HashRouter>
		</Provider>
	);
	const htmlElement: HTMLElement | null = document.getElementById(htmlElementName);
	if (htmlElement) {
		ReactDom.render(jsxElement, htmlElement);
	} else {
		throw new Error(`Can\'t find HTML element: ${htmlElementName}`);
	}
})();
