/**
 * This is the entry point to the app
 */
import './styles/main.less';

import React from 'react';
import {render} from 'react-dom';
import WelcomePage from './welcome/welcome';
import GalaxyPage from './galaxy/galaxyPage.jsx';
import ComparePage from './compare/comparePage.jsx';
import { Router, Route, browserHistory } from 'react-router';

render(
  <Router history={browserHistory}>
    <Route path='/' component={WelcomePage}/>
    <Route path='/galaxy/:name' component={GalaxyPage} />
    <Route path='/compare/:name' component={ComparePage} />
  </Router>,
  document.getElementById('app')
);
