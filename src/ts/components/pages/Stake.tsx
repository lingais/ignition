import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fromUnixTime } from 'date-fns';
import { INSIGNIS_DECIMALS, INSIGNIS_LAUNCH_EPOCH } from '../../constant';

// @ts-ignore
import AnimatedNumber from "animated-number-react";

export default function Stake() {
	const balance = useSelector((state: any) => state.web3.balance) / Math.pow(10, INSIGNIS_DECIMALS);
	const heartbeat = useSelector((state: any) => state.countdown.heartbeat);
	const rebase_timer = useSelector((state: any) => state.countdown.timer_rebase);
	const now = new Date().getTime();
	const whitelist_end = fromUnixTime(INSIGNIS_LAUNCH_EPOCH).getTime();
	const whitelist_remaining = whitelist_end - now;

	/** function: show_balance {{{ */
	const show_balance = (): JSX.Element => {
		const content: JSX.Element = (
			<>
				<div className="amount">
					<AnimatedNumber
						value={balance}
						formatValue={(balance: number) => balance.toFixed(2)}
						duration={1000}
					/>
				</div>
				<div className="sub"><img src="./img/logo_coin_small.png" alt="coin" /> INSIG balance</div>

				<div className="timer">{whitelist_remaining > 0 ? "disabled" : rebase_timer}</div>
				<div className="sub">Next rebase</div>

				<div className="roi">1%</div>
				<div className="sub">Daily ROI</div>
			</>
		);

		return (
			<>
				<div className="balance-xl">
					<div className="d-none d-xl-block">
						{content}
					</div>
				</div>

				<div className="balance">
					<div className="d-block d-xl-none">
						{content}
					</div>
				</div>
			</>
		);
	};
	/** }}} */
	/** function: show_blockchain {{{ */
	const show_blockchain = (big: boolean): JSX.Element => {
		const content: JSX.Element = (
			<div className={big ? "insignis-coin-xl" : "insignis-coin"}>
				<motion.img className="coin" src="./img/logo.png" alt="Insignis Coin"
					variants={{
						pulse: {
							scale: [1, 1.2, 1],
							transition: {
								delay: 0,
							},
						},
					}}
					animate={heartbeat ? "pulse" : ""}
					transition={{
						duration: 5,
						ease: "backIn",
					}}
				/>

				{show_balance()}
			</div>
		);

		return (
			<>
				<div className="balance-xl">
					<div className="d-none d-xl-block">
						{content}
					</div>
				</div>

				<div className="balance">
					<div className="d-block d-xl-none">
						{content}
					</div>
				</div>
			</>
		);
	};
	/** }}} */

	return (
		<motion.div className="stake"
			exit={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
		>
			<div className="row">
				<div className="col-md-3"></div>
				<div className="col-12 col-md-7">
					<div className="d-none d-xl-block">
						{show_blockchain(true)}
					</div>

					<div className="d-block d-xl-none">
						{show_blockchain(false)}
					</div>
				</div>
				<div className="col-md-3"></div>
			</div>
		</motion.div>
	);
}