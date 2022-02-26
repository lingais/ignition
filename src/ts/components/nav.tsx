import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HARMONY_TESTNET, INSIGNIS_ABI, INSIGNIS_CONTRACT } from '../constant';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { useSelector, useDispatch } from 'react-redux';
import store from '../redux/store';
import { update_web3, update_wallet, update_balance, update_balance_vault, RootState } from '../redux/slice_web3';

export default function Header() {
	/** function: connect_wallet_click {{{ */
	const connect_wallet_click = async (): Promise<void> => {
		const state = store.getState();
		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider,
				options: {
					infuraId: "INFURA_ID"
				}
			}
		};
		const web3Modal = new Web3Modal({
			cacheProvider: false,
			providerOptions,
			theme: "dark"
		});

		web3Modal.clearCachedProvider();

		const provider = await web3Modal.connect();

		store.dispatch(() => update_web3(provider)); // updates web3 state
	};
	/** }}} */
	/** function: connect_wallet_button {{{ */
	const connect_wallet_button = (): JSX.Element => {
		const wallet = useSelector((state: any) => state.web3.wallet);

		if (wallet) {
			return (<button className="btn btn-success wallet-connect">Connected</button>);
		}

		else {
			return (<button className="btn btn-warning wallet-connect" onClick={() => connect_wallet_click()}>Connect wallet</button>);
		}
	};
	/** }}} */

	/** function: listen {{{ */
	const listen = (): void => {
		setInterval(async () => {
			listen_wallet();
			listen_balance();
		}, 1500);
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
				balance = await contract.methods.balanceOf(state.web3.wallet).call();

			}

			if (state.web3.balance != balance) store.dispatch(update_balance(balance));
		} catch (error) {
			console.error("an error occured while probing for wallet's balance - are you using the correct network?");
		}
	};
	/** }}} */

	/** function: useEffect {{{ */
	useEffect(() => {
		listen();
	});
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