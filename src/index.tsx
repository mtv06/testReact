import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <Switch>
              <Route path="/" component={App} exact />
              <Route path="/all" component={App} />
              <Route path="/active" component={App} />
              <Route path="/completed" component={App} />
          </Switch>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
