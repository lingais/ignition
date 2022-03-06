import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

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
					initial={{ x: "-80%", opacity: 0 }}
					animate={{ x: "1%", opacity: 1 }}
					transition={{ duration: txt_duration }}
				>
					First Titano fork on Harmony.
				</motion.div>
				<motion.div className="second"
					initial={{ x: "-80%", opacity: 0 }}
					animate={{ x: "1%", opacity: 1 }}
					transition={{ duration: txt_duration, delay: txt2_delay }}
				>
					Automatic staking & compounding.
				</motion.div>
				<motion.div className="third"
					initial={{ x: "-80%", opacity: 0 }}
					animate={{ x: "1%", opacity: 1 }}
					transition={{ duration: txt_duration, delay: txt3_delay }}
				>
					1% daily passive income.
				</motion.div>
			</div>
			<div className="buy">
				<motion.div className="d-none d-lg-block d-xl-block"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: txt_duration, delay: buy_delay }}
				>
					<button className="btn-buy">buy $insig</button>
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
	const content1 = "Insignis is the first Titano fork on the Harmony blockchain. It is a rebase cryptocurrency which automatically grows by holding it alone.";
	const content2 = "Holders actually holds a share of Insignis's total supply. On each rebase, the total supply grows, thus increasing holders owned value.";

	return (
		<div className="explain">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-md-7">
						<div className="detail">
							<motion.div className="title"
								initial={{ x: "-80%", opacity: 0 }}
								whileInView={{ x: "1%", opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: duration }}
							>
								<span className="d-none d-md-block big">How it works</span>
								<span className="d-block d-md-none small">How it works</span>
							</motion.div>
							<motion.div className="content"
								initial={{ x: "-80%", opacity: 0 }}
								whileInView={{ x: "1%", opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: duration }}
							>
								<span className="d-none d-md-block big">{content1}</span>
								<span className="d-block d-md-none small">{content1}</span>
								<br />
								<br />
								<span className="d-none d-md-block big">{content2}</span>
								<span className="d-block d-md-none small">{content2}</span>
							</motion.div>
						</div>
					</div>
					<div className="col-12 col-md-5">
						<div className="image">
							<motion.img src="./img/infographic-explain.png" alt=""
								initial={{ x: "100%", opacity: 0 }}
								whileInView={{ x: "1%", opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: duration }}
							></motion.img>
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
	const content1 = "Thanks to a system of transaction taxes, those taxes are directly sent to Risk Free Value Wallet that is used for buyback & burn.";
	const content2 = "Those taxes are also used to fund marketing operations and active development on what is to come!";

	const content = () => (
		<div className="detail">
			<motion.div className="title"
				initial={{ x: "100%", opacity: 0 }}
				whileInView={{ x: "1%", opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: duration }}
			>
				<span className="d-none d-md-block big">Backed rewards</span>
				<span className="d-block d-md-none small">Backed rewards</span>
			</motion.div>
			<motion.div className="content"
				initial={{ x: "100%", opacity: 0 }}
				whileInView={{ x: "1%", opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: duration }}
			>
				<span className="d-none d-md-block big">{content1}</span>
				<span className="d-block d-md-none small">{content1}</span>
				<br />
				<br />
				<span className="d-none d-md-block big">{content2}</span>
				<span className="d-block d-md-none small">{content2}</span>
			</motion.div>
		</div>
	);

	return (
		<div className="backed">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 d-block d-md-none small">
						{content()}
					</div>

					<div className="col-12 col-md-4">
						<div className="image">
							<motion.img src="./img/infographic-backed.png" alt=""
								initial={{ x: "-80%", opacity: 0 }}
								whileInView={{ x: "1%", opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: duration }}
							></motion.img>
						</div>
					</div>

					<div className="col-8 d-none d-md-block">
						{content()}
					</div>
				</div>
			</div>
		</div>
	);
}
/** }}} */
/** component: Stats {{{ */
function Stats() {
	const duration = 0.75;

	return (
		<div className="stats">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-md-12">
						<div className="detail">
							<motion.div className="title"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: duration }}
							>
								<span className="d-none d-md-block big">State of the market</span>
								<span className="d-block d-md-none small">State of the market</span>
							</motion.div>
							<motion.div className="content"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: duration }}
							>
							</motion.div>
						</div>
					</div>
					<div className="col-12 col-md-12">
						<motion.div className="row"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: duration }}
						>
							<div className="col-md-2"></div>
							<div className="block-stats col-md-4">
								<div className="numbers">
									<div className="intit">420000 $INSIG</div>
									<div className="intit-sub">Total supply</div>
									<div className="intit">$0.00001</div>
									<div className="intit-sub">Current USD value for one INSIG</div>
									<div className="intit">$0.00001</div>
									<div className="intit-sub">Market capitalisation</div>
								</div>
							</div>
							<div className="block-links col-md-4">
								<div className="numbers">
									<a href="#" target="_blank"><button className="btn-dexscreener">dexscreener</button></a>
									<button className="btn-cmc" disabled>coinmarketcap</button>
									<button className="btn-coingecko" disabled>coingecko</button>
								</div>
							</div>
							<div className="col-md-2"></div>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
}
/** }}} */
/** component: Roadmap {{{ */
function Roadmap() {
	const duration = 0.75;

	return (
		<div className="roadmap">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-md-12">
						<div className="detail">
							<motion.div className="title"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: duration }}
							>
								Roadmap
							</motion.div>
						</div>
					</div>
					<div className="col-12 col-md-12">
						<motion.div className="row"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: duration }}
						>
							<div className="col-12 roadmap-img">
								image
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
}
/** }}} */
/** component: Howtobuy {{{ */
function Howtobuy() {
	const duration = 0.75;
	const contract = "0x0000000000";

	return (
		<div id="buynow" className="howtobuy">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-md-12">
						<div className="detail">
							<motion.div className="title"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: duration }}
							>
								<span className="d-none d-md-block big">How to buy</span>
								<span className="d-block d-md-none small">How to buy</span>
							</motion.div>
						</div>
					</div>
					<div className="col-12 col-md-12">
						<div className="row">
							<div className="col-12 col-md-6 howtobuy-img">
								<a href="https://viperswap.one/#/swap" target="_blank"><motion.img src="./img/infographic-howtobuy1.png" alt=""
									initial={{ x: "-80%", opacity: 0 }}
									whileInView={{ x: "1%", opacity: 1 }}
									viewport={{ once: true }}
									transition={{ duration: duration }}
								></motion.img></a>
							</div>

							<div className="col-12 col-md-6 howtobuy-img">
								<CopyToClipboard text={contract}><motion.img className="clickable" src="./img/infographic-howtobuy2.png" alt=""
									initial={{ x: "100%", opacity: 0 }}
									whileInView={{ x: "1%", opacity: 1 }}
									viewport={{ once: true }}
									transition={{ duration: duration }}
								></motion.img></CopyToClipboard>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
/** }}} */
/** component: About {{{ */
function About() {
	const duration = 0.50;

	return (
		<div className="about">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-md-6 banner">
						<img src="./img/banner.png" alt="banner" />
						<br />
						<div className="coin"><img src="./img/logo_coin_small.png" alt="coin" /> INSIG</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="row">
							<div className="col-4">
								<div className="title">Contact us</div>
								<ol>
									<a href="mailto: contact@primitivealgorithm.com"><li className="about-link">Contact</li></a>
									<a href="mailto: business@primitivealgorithm.com"><li className="about-link">Business</li></a>
								</ol>
							</div>
							<div className="col-4">
								<div className="title">Our community</div>
								<ol>
									<a href="#" target="_blank"><li className="about-link">Discord</li></a>
									<a href="#" target="_blank"><li className="about-link">Twitter</li></a>
								</ol>
							</div>
							<div className="col-4">
								<div className="title">Links</div>
								<ol>
									<a href="#" target="_blank"><li className="about-link">Whitepaper</li></a>
									<a href="https://www.harmony.one" target="_blank"><li className="about-link">Contract</li></a>
									<a href="https://www.harmony.one" target="_blank"><li className="about-link">Harmony</li></a>
									<a href="https://viperswap.one" target="_blank"><li className="about-link">ViperSwap</li></a>
								</ol>
							</div>
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
			<Stats />
			<Howtobuy />
			<About />
		</div>
	);
};;