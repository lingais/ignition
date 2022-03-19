import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import store from '../redux/store';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { HARMONY_MAINNET } from '../constant';
import { update_web3 } from '../redux/slice_web3';
import { update_selected, update_list, update_clickable, update_mobile } from '../redux/slice_menu';

export default function Header() {
	const mobile = useSelector((state: any) => state.menu.mobile);

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
						name: "Whitepaper",
						url: "https://doc.insignis.finance",
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

	/** function: menu_mobile_list {{{ */
	const menu_mobile_list = (): JSX.Element => {
		const items_wallet = menu_sub_list("wallet");
		const items_token = menu_sub_list("token");
		const list: Array<JSX.Element> = [];

		for (const item of items_wallet) {
			list.push(
				<div key={item.name} className="btn-link">
					<a key={item.name} href={item.url} target={item.blank ? "_blank" : ""}>
						{item.name}
					</a>
				</div>
			);
		}

		for (const item of items_token) {
			list.push(
				<div key={item.name} className="btn-link">
					<a key={item.name} href={item.url} target={item.blank ? "_blank" : ""}>
						{item.name}
					</a>
				</div>
			);
		}

		if (!is_connected()) {
			list.push(
				<div key="connect" className="btn-link">
					<a key="connect" className="clickable" onClick={() => menu_wallet_click()}>Connect</a>
				</div>
			);
		}

		else {
			list.push(
				<div key="connect" className="btn-link">
					<a key="connect">Connected</a>
				</div>
			);
		}

		return (
			<>
				{list}
			</>
		);
	};
	/** }}} */
	/** function: menu_mobile_toggle {{{ */
	const menu_mobile_toggle = (): void => {
		store.dispatch(update_mobile());
	};
	/** }}} */
	/** function: menu_wallet {{{ */
	const menu_wallet = (): JSX.Element => {
		if (!is_connected()) {
			return (
				<li className="nav-item" onClick={() => menu_wallet_click()}>Connect</li>
			);
		}

		return (
			<li className="nav-item">Connected</li>
		);
	};
	/** }}} */
	/** function: menu_wallet_click {{{ */
	const menu_wallet_click = async (): Promise<void> => {
		const providerOptions = {
			/**walletconnect: {
				package: WalletConnectProvider,
				options: {
					infuraId: ""
				}
			}*/
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

	/** function: is_connected {{{ */
	const is_connected = (): boolean => {
		const wallet = useSelector((state: any) => state.web3.wallet);
		const network = useSelector((state: any) => state.web3.network);
		const is_network = network === HARMONY_MAINNET;

		return is_network && wallet;
	};
	/** }}} */

	return (
		<header>
			<motion.div className="d-block d-xl-none menu-mobile"
				variants={{
					show: {
						height: "auto",
						transition: {
							delay: 0,
						},
					},
					hide: {
						height: "0",
						transition: {
							delay: 0,
						},
					},
				}}
				initial={{ height: "0" }}
				animate={mobile ? "show" : "hide"}
				transition={{
					duration: 5,
					ease: "backIn",
				}}
			>
				{menu_mobile_list()}
			</motion.div>
			<nav>
				<div className="banner">
					<Link to="/" className="home-link" title="Home"><img src="./img/banner.png" alt="banner" /></Link>
				</div>
				<div className="menu">
					<div className="d-none d-xl-block items" onMouseLeave={() => menu_leave()}>
						{menu_wallet()}
						<li className="nav-item" onMouseEnter={() => menu_enter("wallet")}>Wallet</li>
						<li className="nav-item" onMouseEnter={() => menu_enter("token")}>Token</li>

						{menu_sub()}
					</div>
					<div className="d-block d-xl-none items">
						<li className="nav-item"
							onClick={() => menu_mobile_toggle()}
						><i className="bi bi-list button-xs"></i></li>
					</div>
				</div>
			</nav>
		</header>
	);
}