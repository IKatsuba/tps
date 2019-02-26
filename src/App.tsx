import React, { Component } from 'react';
import { Sidebar } from './components/sidebar';
import { store, StoreContext } from "./store";
import { Header } from "./components/header";
import { BonusesPage } from "./components/bonuses-page";
import './i18n';
import './App.scss';

class App extends Component {
  render() {
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
