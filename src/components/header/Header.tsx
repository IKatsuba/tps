import i18next from 'i18next';
import React, { Component, Fragment, ReactNode } from 'react';
import { Translation } from 'react-i18next';
import { Languages } from '../../i18n';
import { HeaderData, StoreContext } from '../../store';
import { Currencies, formatCurrency } from '../../utils';
import { ConnectionState, Snapshot, StreamBuilder } from '../stream-builder';
import './Header.scss';

export interface CurrencyCardProps {
  price: number;
  currency: Currencies;
  description: ReactNode;
}

export function CurrencyCard({ price, currency }: CurrencyCardProps) {
  return (
    <div className="currency-card">
      <span className="secondary-text">
        <Translation>{t => t('Balance')}</Translation>
      </span>
      <h3>{formatCurrency(i18next.language as Languages, price, currency)}</h3>
    </div>
  );
}

export class Header extends Component {
  public static contextType = StoreContext;
  public context!: React.ContextType<typeof StoreContext>;

  public render(): React.ReactNode {
    return (
      <header className="header">
        <StreamBuilder stream={this.context.header}>
          {(snapshot: Snapshot<HeaderData>) => {
            if (snapshot.state === ConnectionState.Waiting) {
              return <div/>;
            }

            if (snapshot.hasData) {
              return (
                <Fragment>
                  <CurrencyCard
                    currency={snapshot.data.currency}
                    price={snapshot.data.balance}
                    description={<Translation>{t => t('Balance')}</Translation>}
                  />
                  <CurrencyCard
                    currency={snapshot.data.currency}
                    price={snapshot.data.next_payout}
                    description={<Translation>{t => t('To payoff')}</Translation>}
                  />
                </Fragment>
              );
            }
          }}
        </StreamBuilder>
      </header>
    );
  }
}
