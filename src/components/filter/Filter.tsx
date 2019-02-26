import React from 'react';
import { Translation, useTranslation } from 'react-i18next';
import { Button } from '../button';
import { TextField } from '../text-field';
import './Filter.scss';

export interface FilterProps {
  onChange: (filter: string) => void;
}

export function Filter({ onChange }: FilterProps) {
  const { t } = useTranslation();

  return (
    <form
      onSubmit={evt => evt.preventDefault()}
      className="filter"
      onReset={(event) => onChange(event.currentTarget.value)}>

      <TextField
        label={<Translation>{t => t('Filter')}</Translation>}
        id="filter"
        name="filter"
        onInput={(event) => onChange(event.currentTarget.value)}
        onChange={(event) => onChange(event.currentTarget.value)}
      />

      <Button className="filter-button" label={t('Reset')} type="reset"/>
    </form>
  );
}
