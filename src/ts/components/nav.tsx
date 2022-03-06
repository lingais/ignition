import React from 'react';
import { Link } from 'react-router-dom';
import Web3Modal from "web3modal";
import { motion } from 'framer-motion';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useSelector } from 'react-redux';
import store from '../redux/store';
import { update_web3 } from '../redux/slice_web3';
import { HARMONY_TESTNET, HARMONY_MAINNET } from '../constant';
import { update_selected, update_list, update_clickable } from '../redux/slice_menu';

export default function Header() {
	const selected = useSelector((state: any) => state.menu.selected);

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
		const network = useSelector((state: any) => state.web3.network);
		const is_network = network === HARMONY_TESTNET;

		if (!is_network) {
			return (<button className="btn btn-danger wallet-connect">Wrong network</button>);
		}

		else if (wallet) {
			return (<button className="btn btn-success wallet-connect">Connected</button>);
		}


		else {
			return (<button className="btn btn-warning wallet-connect" onClick={() => connect_wallet_click()}>Connect wallet</button>);
		}
	};
	/** }}} */

	/** function: menu_enter {{{ */
	const menu_enter = (item: string) => {
		//menu_leave(); // triggers menu_leave before entering a new menu

		store.dispatch(update_list(menu_sub_list(item)));
		store.dispatch(update_selected(item));
		store.dispatch(update_clickable(true));
	};
	/** }}} */
	/** function: menu_leave {{{ */
	const menu_leave = () => {
		store.dispatch(update_selected(null));

		setTimeout(() => {
			const state = store.getState();

			if (!state.menu.active) store.dispatch(update_clickable(false));
		}, 500);
	};
	/** }}} */
	/** function: menu_sub {{{ */
	const menu_sub = (): JSX.Element => {
		const active = useSelector((state: any) => state.menu.active);
		const clickable = useSelector((state: any) => state.menu.clickable);
		const items: Array<Menu_SubItems> = useSelector((state: any) => state.menu.list);
		const list: Array<JSX.Element> = [];

		for (const item of items) {
			list.push(
				<a key={item.name} href={item.url} target={item.blank ? "_blank" : ""}>
					<li key={item.name} className="sub-item">
						{item.name}
					</li>
				</a>
			);
		}

		const variants = {
			show: {
				opacity: 1.0,
				transition: {
					duration: 0.5
				}
			},
			hide: {
				opacity: 0.0,
				transition: {
					duration: 0.5
				}
			}
		};


		return (
			<motion.div className="sub-items"
				variants={variants}
				animate={active ? "show" : "hide"}
			>
				{clickable &&
					list
				}
			</motion.div>
		);
	};
	/** }}} */
	/** function: menu_sub_list {{{ */
	const menu_sub_list = (selected: string): Array<Menu_SubItems> => {
		let list: Array<Menu_SubItems> = [];

		switch (selected) {
			/** wallet {{{ */
			case "wallet": {
				list.push(
					{
						name: "Stake",
						url: "./#/stake",
						blank: false
					}
				);
				break;
			}
			/** }}} */
			/** token {{{ */
			case "token": {
				list.push(
					{
						name: "Chart",
						url: "./#/stake",
						blank: true
					},
					{
						name: "Documentation",
						url: "./#/doc",
						blank: true
					}
				);
				break;
			}
			/** }}} */
		}

		return list;
	};

	/** }}} */

	return (
		<header>
			<nav>
				<div className="banner">
					<Link to="/" className="home-link" title="Home"><img src="./img/banner.png" alt="banner" /></Link>
				</div>
				<div className="menu">
					<div className="items" onMouseLeave={() => menu_leave()}>
						<li className="nav-item" onMouseEnter={() => menu_enter("wallet")}>Wallet</li>
						<li className="nav-item" onMouseEnter={() => menu_enter("token")}>Token</li>

						{menu_sub()}
					</div>
				</div>
				<div className="connect">
					{connect_wallet_button()}
				</div>
			</nav>
		</header>
	);
}