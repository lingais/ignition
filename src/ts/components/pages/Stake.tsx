import React, { FC } from 'react';
import { useSelector } from 'react-redux';

export default function Stake() {
	const wallet = useSelector((state: any) => state.web3.wallet);
	const balance = useSelector((state: any) => state.web3.balance);
	const balance_next = balance * 1.01;

	return (
		<div>
			<h2>Stake</h2>
			<b>Wallet:</b> {wallet}
			<br />
			<b>Balance:</b> {balance}
			<br />
			<b>Balance at next rebase:</b> {balance_next}
			<br />
			<b>Next rebase in:</b> 00:00:00 (rebase is arbitrary and not on schedule on the testnet)
		</div>
	);
}