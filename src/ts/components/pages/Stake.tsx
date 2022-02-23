import React, { FC } from 'react';

class Stake extends React.Component<Props, State_Stake> {
	constructor(props: Props) {
		super(props);

		this.state = {
			wallet: null
		};
	}
	/** function: get_wallet {{{ */
	public get_wallet = (): string => {
		return "";
	};
	/** }}} */

	/** function: componentDidMount {{{ */
	public componentDidMount = (): void => {
		//this.setState({
			//wallet: this.get_wallet()
		//});
	};
	/** }}} */

	/** function: render {{{ */
	render() {
		return (
			<div>
				<h2>Stake</h2>
				<b>Wallet:</b>
			</div>
		);
	}
	/** }}} */
}

export default Stake;