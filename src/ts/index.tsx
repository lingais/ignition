import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '../scss/index.scss';
import 'animate.css';
import 'regenerator-runtime/runtime';

import store from './redux/store';
import Router from './components/router';

(() => {
	const htmlElementName: string = 'app';
	const jsxElement: JSX.Element = (
		<Provider store={store}>
			<HashRouter>
				<Router />
			</HashRouter>
		</Provider>
	);
	const htmlElement: HTMLElement | null = document.getElementById(htmlElementName);
	if (htmlElement) {
		ReactDom.render(jsxElement, htmlElement);
	} else {
		throw new Error(`Can\'t find HTML element: ${htmlElementName}`);
	}
})();
