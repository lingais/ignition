import React from 'react';
import store from '../../redux/store';
import { useSelector } from 'react-redux';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { HARMONY_TESTNET, HARMONY_MAINNET } from '../../constant';
import { update_web3 } from '../../redux/slice_web3';

export default function Wallet() {
  /** function: click {{{ */
  const click = async (): Promise<void> => {
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

  const wallet = useSelector((state: any) => state.web3.wallet);
  const network = useSelector((state: any) => state.web3.network);
  const is_network = network === HARMONY_TESTNET;
  let button: JSX.Element;

  if (!is_network) button = <button className="btn btn-danger wallet-connect">Wrong network</button>;
  else if (wallet) button = <button className="btn btn-success wallet-connect">Connected</button>;
  else button = <button className="btn btn-warning wallet-connect" onClick={() => click()}>Connect wallet</button>;

  return (
    <div className="connect">
      {button}
    </div>
  );
}