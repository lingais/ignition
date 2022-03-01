import React, { FC } from 'react';
import { AbiItem } from 'web3-utils';
import { useSelector, useDispatch } from 'react-redux';
import { update_amount_to_stake, update_amount_to_withdraw } from '../../redux/slice_web3';
import { INSIGNIS_ABI, INSIGNIS_CONTRACT, INSIGNIS_DECIMALS } from '../../constant';

export default function Vault() {
	const dispatch = useDispatch();
	const web3 = useSelector((state: any) => state.web3.web3);
	const wallet = useSelector((state: any) => state.web3.wallet);
	const amount_to_stake = useSelector((state: any) => state.web3.amount_to_stake);
	const amount_to_withdraw = useSelector((state: any) => state.web3.amount_to_withdraw);
	const balance = useSelector((state: any) => state.web3.balance);
	const balance_vault = useSelector((state: any) => state.web3.balance_vault);
	const balance_vault_reward = balance_vault * 2.2;
	const is_withdraw_possible = useSelector((state: any) => state.web3.withdraw_possible);
	const wen_withdraw = useSelector((state: any) => state.web3.withdraw_timer);

	/** function: stake {{{ */
	const stake = (): void => {
		const contract = new web3.eth.Contract(INSIGNIS_ABI as AbiItem[], INSIGNIS_CONTRACT);
		const amount_to_stake_dec = amount_to_stake * Math.pow(10, INSIGNIS_DECIMALS);

		contract.methods.stake_deposit(INSIGNIS_CONTRACT, amount_to_stake_dec).send({ from: wallet });
	};
	/** }}} */
	/** function: withdraw {{{ */
	const withdraw = (): void => {
		const contract = new web3.eth.Contract(INSIGNIS_ABI as AbiItem[], INSIGNIS_CONTRACT);
		const amount_to_withdraw_dec = amount_to_withdraw * Math.pow(10, INSIGNIS_DECIMALS);

		contract.methods.stake_withdraw(amount_to_withdraw_dec, INSIGNIS_CONTRACT).send({ from: wallet });
	};
	/** }}} */

	/** function: show_vault_withdraw {{{ */
	const show_vault_withdraw = (): JSX.Element => {
		if (balance_vault > 0) {
			if (is_withdraw_possible) {
				return (
					<div className="row">
						<b>Withdraw:</b>
						<div className="form-group col-8">
							<input type="text"
								className="form-control"
								id="formGroup2"
								placeholder="Enter amount to withdraw from the vault"
								value={amount_to_withdraw}
								onChange={(event) => dispatch(update_amount_to_withdraw(event.target.value))}></input>
						</div>
						<div className="form-group col-2">
							<button className="btn btn-md btn-info" onClick={() => dispatch(update_amount_to_withdraw(balance_vault))}>Max</button>
						</div>
						<div className="form-group col-2">
							<button className="btn btn-md btn-danger" onClick={() => withdraw()}>Withdraw</button>
						</div>
					</div>
				);
			}
			else return (<button className="btn btn-md btn-danger">Locked</button>);
		} else {
			return (<></>);
		}
	};
	/** }}} */
	/** function: show_vault_withdraw_timer {{{ */
	const show_vault_withdraw_timer = (): JSX.Element => {
		if (!is_withdraw_possible && balance_vault > 0) return (<><b>Withdraw possible in:</b> {wen_withdraw}</>);
		else return (<></>);
	};
	/** }}} */
	/** function: show_vault_withdraw_reward {{{ */
	const show_vault_withdraw_reward = (): JSX.Element => {
		const reward = Math.floor(balance_vault_reward);

		if (balance_vault > 0) return (<><b>Estimated reward upon withdrawal:</b> {reward}</>);
		else return (<></>);
	};
	/** }}} */

	/** function: show_vault_stake {{{ */
	const show_vault_stake = (): JSX.Element => {
		return (
			<div className="row">
				<b>Stake:</b>
				<div className="form-group col-8">
					<input type="text"
						className="form-control"
						id="formGroup"
						placeholder="Enter amount to stake into the vault"
						value={amount_to_stake}
						onChange={(event) => dispatch(update_amount_to_stake(event.target.value))}></input>
				</div>
				<div className="form-group col-2">
					<button className="btn btn-md btn-info" onClick={() => dispatch(update_amount_to_stake(balance))}>Max</button>
				</div>
				<div className="form-group col-2">
					<button className="btn btn-md btn-danger" onClick={() => stake()}>Stake</button>
				</div>
			</div>
		);
	};
	/** }}} */
	/** function: show_approve_stake {{{ */
	/** }}} */
	/** function: show_approve_withdraw {{{ */
	/** }}} */

	return (
		<div>
			<h2>Vault</h2>
			<br />
			<b>Wallet:</b> {wallet}
			<br />
			<b>Balance:</b> {balance}
			<br />
			<b>Daily ROI:</b> 2%
			<br />
			<b>Staked in vault:</b> {balance_vault}
			<br />
			{show_vault_withdraw_reward()}
			<br />
			{show_vault_withdraw_timer()}
			<br />
			{show_vault_withdraw()}
			<br />
			<br />
			{show_vault_stake()}
		</div>
	);
}