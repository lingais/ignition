import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Wallet from '../sub/Wallet';

export default function Stake() {
	const wallet = useSelector((state: any) => state.web3.wallet);
	const epoch = useSelector((state: any) => state.web3.epoch);
	const balance = useSelector((state: any) => state.web3.balance);
	const rebase_timer = useSelector((state: any) => state.web3.rebase_timer);
	const balance_next = balance * 1.02;

	return (
		<motion.div className="stake"
			exit={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
		>
			<h2>Stake</h2>
			<b>Wallet:</b> {wallet}
			<br />
			<b>Balance:</b> {balance}
			<br />
			<b>Balance at next rebase:</b> {balance_next}
			<br />
			<b>Daily ROI:</b> 2%
			<br />
			<b>Epoch:</b> {epoch}
			<br />
			<b>Next rebase in:</b> {rebase_timer}  (not on schedule on the testnet)

			<Wallet />
		</motion.div>
	);
}