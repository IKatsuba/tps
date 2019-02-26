import React, { SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import copyIcon from '../../icons/copy.svg';
import { Bonus } from '../../store';
import { Button, ButtonTypes } from '../button';
import { TextField } from '../text-field';

import './BonusCard.scss';

export interface BonusCardProps {
  bonus: Bonus;
}

function focusHandler(event: SyntheticEvent<HTMLInputElement>) {
  const element = event.currentTarget;
  element.select();
  document.execCommand('copy');
}

export function BonusCard({ bonus }: BonusCardProps) {
  const { t } = useTranslation();

  return (
    <div className="bonus-card">
      <div className="bonus-card--description">
        <h1>{bonus.title}</h1>
        <div className="secondary-text">{bonus.description}</div>
      </div>
      <div className="bonus-card--actions">
        <TextField
          onFocus={focusHandler}
          className="bonus-card--actions-field"
          label={<div>{t('Promocode')}</div>}
          readOnly={true}
          value={bonus.promocode}
          postfix={<img src={copyIcon}/>}
        />
        <Button
          className="bonus-card--actions-link"
          label={t('Get a bonus')}
          styleType={ButtonTypes.Primary}
          href={bonus.link}
          target="_blank"
        />
      </div>
    </div>
  );
}
