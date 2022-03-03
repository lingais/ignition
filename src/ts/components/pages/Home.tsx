import React, { FC } from 'react';
import { motion } from 'framer-motion';

/** component: front {{{ */
function Front() {
	const title_duration = 0.75;
	const txt_duration = 1.5;
	const txt2_delay = 1.50;
	const txt3_delay = txt2_delay * 2;
	const buy_delay = txt3_delay * 1.5;

	return (
		<div className="front">
			<div className="txt2">
				<motion.div className="title"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: title_duration }}
				>
					The fastest Titano fork ever.
				</motion.div>
			</div>
			<div className="txt1">
				<motion.div className="first"
					initial={{ x: "-40%", opacity: 0 }}
					animate={{ x: "1%", opacity: 1 }}
					transition={{ duration: txt_duration }}
				>
					Lightspeed transactions.
				</motion.div>
				<motion.div className="second"
					initial={{ x: "-40%", opacity: 0 }}
					animate={{ x: "1%", opacity: 1 }}
					transition={{ duration: txt_duration, delay: txt2_delay }}
				>
					Autonomous staking.
				</motion.div>
				<motion.div className="third"
					initial={{ x: "-40%", opacity: 0 }}
					animate={{ x: "1%", opacity: 1 }}
					transition={{ duration: txt_duration, delay: txt3_delay }}
				>
					15123123% annual income.
				</motion.div>
			</div>
			<div className="buy">
				<motion.div className="d-none d-lg-block d-xl-block"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: txt_duration, delay: buy_delay }}
				>
					<button className="btn-buy">buy insig</button>
					<div className="sub-btn-text">
						& join our social networks
					</div>
					<div className="sub-btn-links">
						<a href="#" target="_blank"><img src="/img/social/discord.svg"></img></a>
						<a href="#" target="_blank"><img src="/img/social/twitter.svg"></img></a>
					</div>
				</motion.div>
			</div>
		</div>
	);
};
/** }}} */

export default function Home() {

	return (
		<div className="home">
			<Front />
		</div>
	);
}