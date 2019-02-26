import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.scss';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="secondary-text">
        {t('Copyright')}
      </div>
    </footer>
  );
}
