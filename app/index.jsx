/**
 * 入口文件
 * @type {*|exports|module.exports}
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from './containers/App';

import About from './test/tpl/About';
import Users from './test/tpl/Users';
import User from './test/tpl/User';
import Home from './test/tpl/Home';
import NoMatch from './test/tpl/NoMatch';

import configureStore from './store/configureStore';

const store = configureStore();

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Home}>
				<Route path="about" component={About}/>
				<Route path="users" component={Users}>
					<Route path="/user/:userId" component={User}/>
				</Route>
				<Route path="*" component={NoMatch}/>
			</Route>
		</Router>
	</Provider>
	,document.getElementById('app')
);