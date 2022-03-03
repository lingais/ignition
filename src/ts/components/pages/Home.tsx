import React, { FC } from 'react';
import { motion } from 'framer-motion';

/** component: front {{{ */
function Front() {
	const title_duration = 0.75;
	const txt_duration = 1.5;
	const txt2_delay = 1.0;
	const txt3_delay = txt2_delay * 1.5;
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
/** component: Explain {{{ */
function Explain() {
	const duration = 0.75;

	return (
		<div className="explain">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-md-8">
						<div className="detail">
							<motion.div className="title"
								initial={{ x: "-40%", opacity: 0 }}
								whileInView={{ x: "1%", opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: duration }}
							>
								how insignis work
							</motion.div>
							<motion.div className="content"
								initial={{ x: "-40%", opacity: 0 }}
								whileInView={{ x: "1%", opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: duration }}
							>
								Insignis is the first Titano fork on the Harmony blockchain. It is a rebase cryptocurrency which automatically grows by holding it alone.
								<br />
								<br />
								Holders actually holds a share of Insignis's total supply. On each rebase, the total supply grows, thus increasing holders owned value.
							</motion.div>
						</div>
					</div>
					<div className="col-12 col-md-4">
						<div className="image">
							image
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
/** }}} */
/** component: Backed {{{ */
function Backed() {
	const duration = 0.75;

	return (
		<div className="backed">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-md-4">
						<div className="image">
							image
						</div>
					</div>

					<div className="col-12 col-md-8">
						<div className="detail">
							<motion.div className="title"
								initial={{ x: "-40%", opacity: 0 }}
								whileInView={{ x: "1%", opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: duration }}
							>
								properly backed rewards
							</motion.div>
							<motion.div className="content"
								initial={{ x: "-40%", opacity: 0 }}
								whileInView={{ x: "1%", opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: duration }}
							>
								Test
								<br />
								<br />
								Test
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
/** }}} */

export default function Home() {

	return (
		<div className="home">
			<Front />
			<Explain />
			<Backed />
		</div>
	);
}