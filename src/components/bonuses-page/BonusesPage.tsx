import React, { Component } from "react";
import { StoreContext } from "../../store";
import { Translation } from "react-i18next";
import { Filter } from "../filter";
import { StreamBuilder } from "../stream-builder";
import { BonusList } from "../bonus-list";
import './BonusesPage.scss';


export class BonusesPage extends Component {
  static contextType = StoreContext;
  public context!: React.ContextType<typeof StoreContext>;

  private filterChangeHandle = (filter: string) =>
    this.context.applyFilter(filter || '');

  public render(): React.ReactNode {
    return (
      <div className="services-page">
        <h1><Translation>{t => t('Services')}</Translation></h1>

        <Filter onChange={this.filterChangeHandle}/>

        <StreamBuilder stream={this.context.bonuses}>
          {snapshot => snapshot.hasData
            ? <BonusList bonuses={snapshot.data}/>
            : null
          }
        </StreamBuilder>
      </div>
    );
  }
}
