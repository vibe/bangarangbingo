/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import { StripeProvider } from 'react-stripe-elements';

import './index.css';
import App from './App';
import { Login, Register, Cards, Card, CardCreate } from './components';
import Billing from './components/billing/index';
import RequireAuth from './components/HOC/RequireAuth';
import reducers from './reducers';
import WithAuth from './components/auth/withAuth';
import Dash from './components/cards/dash';
import CreateCard from './components/cards/create';
import Settings from './components/user/settings';

// import registerServiceWorker from './registerServiceWorker';
const history = createHistory();

const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk, routerMiddleware(history)),
);


ReactDOM.render(
  <StripeProvider apiKey="pk_test_EoxU0C4XgqGg6fUznkatJQVc">
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/cards" component={WithAuth(Dash)} />
          <Route path="/card/create" component={WithAuth(CreateCard)} />
          <Route path="/card/:id" component={RequireAuth(Card)} />
          <Route path="/settings" component={WithAuth(Settings)} />
          <Route path="/billing" component={WithAuth(Billing)} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </StripeProvider>,
  document.getElementById('root'),
);
// registerServiceWorker();
