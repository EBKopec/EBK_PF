import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './components/pages/main';
import Content from './components/pages/content';
import Extensions from './components/pages/reports/extensions/index';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/content/:id" component={Content} />
            <Route exact path="/extension" component={Extensions}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;