import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as Scroll from 'react-scroll';
import { INSIGNIS_CONTRACT, INSIGNIS_DECIMALS, LINK_DISCORD, LINK_TWITTER } from '../../constant';

/** component: Front {{{ */
function Front() {
	const title_duration = 0.75;
	const txt_duration = 1.5;
	const txt2_delay = 1.0;
	const txt3_delay = txt2_delay * 1.5;
	const buy_delay = txt3_delay * 1.5;

	const content_title = "The fastest Titano fork ever.";
	const content1 = "First Titano fork on Harmony.";
	const content2 = "Automatic staking & compounding.";
	const content3 = "1% daily passive income.";

	const Link = Scroll.Link;

	return (
		<div className="front">
			<div className="txt2">
				<motion.div className="title"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: title_duration }}
				>
					<span className="d-none d-xl-block big">{content_title}</span>
					<span className="d-block d-xl-none small">{content_title}</span>
				</motion.div>
			</div>
			<div className="row">
				<div className="txt1 col-12 col-xl-8">
					<motion.div className="first"
						initial={{ x: "-80%", opacity: 0 }}
						animate={{ x: "5%", opacity: 1 }}
						transition={{ duration: txt_duration }}
					>
						<span className="d-none d-xl-block big">{content1}</span>
						<span className="d-block d-xl-none small">{content1}</span>
					</motion.div>
					<motion.div className="second"
						initial={{ x: "-80%", opacity: 0 }}
						animate={{ x: "5%", opacity: 1 }}
						transition={{ duration: txt_duration, delay: txt2_delay }}
					>
						<span className="d-none d-xl-block big">{content2}</span>
						<span className="d-block d-xl-none small">{content2}</span>
					</motion.div>
					<motion.div className="third"
						initial={{ x: "-80%", opacity: 0 }}
						animate={{ x: "5%", opacity: 1 }}
						transition={{ duration: txt_duration, delay: txt3_delay }}
					>
						<span className="d-none d-xl-block big">{content3}</span>
						<span className="d-block d-xl-none small">{content3}</span>
					</motion.div>
				</div>
				<div className="buy col-12 col-xl-4">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: txt_duration, delay: buy_delay }}
					>
						<Link to="howtobuy"
							smooth={true}
							duration={50}
							delay={0}
							isDynamic={true}
						><button className="btn-buy">buy $insig</button></Link>
						<div className="sub-btn-text">
							& join our social networks
						</div>
						<div className="sub-btn-links">
							<a href={LINK_DISCORD} target="_blank"><img src="/img/social/discord.svg"></img></a>
							<a href={LINK_TWITTER} target="_blank"><img src="/img/social/twitter.svg"></img></a>
						</div>
					</motion.div>
				</div>
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
					<div className="col-12 col-xxl-7">
						<div className="detail">
							<motion.div className="title"
								initial={{ x: "-80%", opacity: 0 }}
								whileInView={{ x: "1%", opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: duration }}
							>
								<span className="d-none d-xl-block big">How it works</span>
								<span className="d-block d-xl-none small">How it works</span>
							</motion.div>
							<motion.div className="content"
								initial={{ x: "-80%", opacity: 0 }}
								whileInView={{ x: "1%", opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: duration }}
							>
								<span className="d-none d-xl-block big">{content1}</span>
								<span className="d-block d-xl-none small">{content1}</span>
								<br />
								<br />
								<span className="d-none d-xl-block big">{content2}</span>
								<span className="d-block d-xl-none small">{content2}</span>
							</motion.div>
						</div>
					</div>
					<div className="col-12 col-xxl-5">
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
				<span className="d-none d-xl-block big">Backed rewards</span>
				<span className="d-block d-xl-none small">Backed rewards</span>
			</motion.div>
			<motion.div className="content"
				initial={{ x: "100%", opacity: 0 }}
				whileInView={{ x: "1%", opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: duration }}
			>
				<span className="d-none d-xl-block big">{content1}</span>
				<span className="d-block d-xl-none small">{content1}</span>
				<br />
				<br />
				<span className="d-none d-xl-block big">{content2}</span>
				<span className="d-block d-xl-none small">{content2}</span>
			</motion.div>
		</div>
	);

	return (
		<div className="backed">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 d-block d-xxl-none small">
						{content()}
					</div>

					<div className="col-12 col-xxl-4">
						<div className="image">
							<motion.img src="./img/infographic-backed.png" alt=""
								initial={{ x: "-80%", opacity: 0 }}
								whileInView={{ x: "1%", opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: duration }}
							></motion.img>
						</div>
					</div>

					<div className="col-8 d-none d-xxl-block">
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
	const supply = useSelector((state: any) => state.web3.supply) / Math.pow(10, INSIGNIS_DECIMALS);
	const usd = useSelector((state: any) => state.web3.usd);
	const mcap = useSelector((state: any) => state.web3.mcap);

	return (
		<div className="stats">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12">
						<div className="detail">
							<motion.div className="title"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: duration }}
							>
								<span className="d-none d-xl-block big">State of the market</span>
								<span className="d-block d-xl-none small">State of the market</span>
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
					<div className="col-12">
						<motion.div className="row"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: duration }}
						>
							<div className="d-none d-xl-block col-xxl-2"></div>
							<div className="block-stats col-md-12 col-xxl-4">
								<div className="numbers">
									<div className="intit">
										<span className="d-none d-xl-block big">{supply} $INSIG</span>
										<span className="d-block d-xl-none small">{supply} $INSIG</span>
									</div>
									<div className="intit-sub">Total supply</div>
									<div className="intit">
										<span className="d-none d-xl-block big">${usd}</span>
										<span className="d-block d-xl-none small">${usd}</span>
									</div>
									<div className="intit-sub">Current USD value for one INSIG</div>
									<div className="intit">
										<span className="d-none d-xl-block big">${mcap}</span>
										<span className="d-block d-xl-none small">${mcap}</span>
									</div>
									<div className="intit-sub">Market capitalisation</div>
								</div>
							</div>
							<div className="block-links col-md-12 col-xxl-5">
								<div className="links">
									<a href="#" target="_blank"><button className="btn-dexscreener">dexscreener</button></a>
									<button className="btn-cmc" disabled>coinmarketcap</button>
									<button className="btn-coingecko" disabled>coingecko</button>
								</div>
							</div>
							<div className="d-none d-xl-block col-xxl-1"></div>
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
	const Element = Scroll.Element;

	return (
		<div id="buynow" className="howtobuy">
			<div className="container-fluid">
				<Element name="howtobuy">
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
								<div className="col-12 col-xxl-6 howtobuy-img">
									<a href="https://viperswap.one/#/swap" target="_blank"><motion.img src="./img/infographic-howtobuy1.png" alt=""
										initial={{ x: "-80%", opacity: 0 }}
										whileInView={{ x: "1%", opacity: 1 }}
										viewport={{ once: true }}
										transition={{ duration: duration }}
									></motion.img></a>
								</div>

								<div className="col-12 col-xxl-6 howtobuy-img">
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
				</Element>
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
					<div className="col-12 col-lg-6 banner">
						<img src="./img/banner.png" alt="banner" />
						<br />
						<div className="coin"><img src="./img/logo_coin_small.png" alt="coin" /> INSIG</div>
						<div className="address">{INSIGNIS_CONTRACT}</div>
					</div>
					<div className="col-12 col-lg-6">
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
		<motion.div className="home"
			exit={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
		>
			<Front />
			<Explain />
			<Backed />
			<Stats />
			<Howtobuy />
			<About />
		</motion.div>
	);
};;