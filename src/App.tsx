import React, { Component } from 'react';
import './App.scss';
import { BonusesPage } from './components/bonuses-page';
import { Header } from './components/header';
import { Sidebar } from './components/sidebar';
import './i18n';
import { store, StoreContext } from './store';

class App extends Component {
  public render() {
    return (
      <StoreContext.Provider value={store}>
        <Sidebar/>
        <div className="app-body">
          <Header/>

          <BonusesPage/>
        </div>
      </StoreContext.Provider>
    );
  }
}

export default App;
