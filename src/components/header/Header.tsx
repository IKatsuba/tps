import React, { Component, Fragment, ReactNode } from 'react';
import { Translation } from 'react-i18next';
import { Languages } from '../../i18n';
import russiaFlag from '../../icons/flag_of_russia.svg';
import ukFlag from '../../icons/flag_of_the_united_kingdom.svg';
import { HeaderData, StoreContext } from '../../store';
import { Currencies, formatCurrency } from '../../utils';
import { LanguageItem } from '../language-item';
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
      <h3>
        <Translation>{(t, { i18n }) => formatCurrency(i18n.language as Languages, price, currency)}</Translation>
      </h3>
    </div>
  );
}

export class Header extends Component {
  public static contextType = StoreContext;
  public context!: React.ContextType<typeof StoreContext>;

  public render(): React.ReactNode {
    return (
      <header className="header">
        <div className="header--currencies">
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
        </div>
        <div className="header--language-switcher">
          <LanguageItem language={Languages.En}>
            <Translation>
              {t => <img src={ukFlag} alt={t('Flag of United Kingdom')}/>}
            </Translation>
          </LanguageItem>
          <LanguageItem language={Languages.Ru}>
            <Translation>
              {t => <img src={russiaFlag} alt={t('Flag of Russia')}/>}
            </Translation>
          </LanguageItem>
        </div>
      </header>
    );
  }
}
