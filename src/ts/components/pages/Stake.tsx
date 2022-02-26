import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

export default function Stake() {
	const wallet = useSelector((state: any) => state.web3.wallet);
	const epoch = useSelector((state: any) => state.web3.epoch);
	const balance = useSelector((state: any) => state.web3.balance);
	const rebase_timer = moment.duration(useSelector((state: any) => state.web3.rebase_timer));
	const rebase_date = moment.utc(rebase_timer.asMilliseconds()).format("HH:mm:ss");
	const balance_next = balance * 1.01;

	return (
		<div>
			<h2>Stake</h2>
			<b>Wallet:</b> {wallet}
			<br />
			<b>Balance:</b> {balance}
			<br />
			<b>Epoch:</b> {epoch}
			<br />
			<b>Balance at next rebase:</b> {balance_next}
			<br />
			<b>Next rebase in:</b> {rebase_date}  (not on schedule on the testnet)
		</div>
	);
}