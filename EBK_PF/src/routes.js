import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Banner from './components/banner';
import Main from './components/pages/main';
import Content from './components/pages/content';
import Extensions from './components/pages/reports/extensions/index';
import Billing from './components/pages/reports/billing/summarized/index';

const Routes = () => (
    <BrowserRouter>
    <Banner/>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/content/:id" component={Content} />
            <Route exact path="/extension" component={Extensions}/>
            <Route exact path="/billing" component={Billing}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;