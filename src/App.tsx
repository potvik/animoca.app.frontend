import * as React from 'react';
import { baseTheme } from 'themes';
import { GlobalStyle } from './GlobalStyle';
import { Providers } from './Providers';
import { Redirect, Route, Switch } from 'react-router';
import { PlayersMarketplace } from './pages/PlayersMarketplace';
import {Landing} from "./pages/Landing";
import { ActionModals } from './components/ActionModals';
import {BuyLootBox} from "./pages/BuyLootBox";

export const App: React.FC = () => (
  <Providers>
    <React.Suspense fallback={<div />}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/buy" component={BuyLootBox} />
        <Route exact path="/my-cards" component={PlayersMarketplace} />
        <Redirect to="/" />
      </Switch>
    </React.Suspense>
    <ActionModals />
    <GlobalStyle theme={...baseTheme as any} />
  </Providers>
);
