import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from '../../i18n';
import './LanguageItem.scss';

export interface LanguageItem {
  children: ReactNode;
  language: Languages;
}

export function LanguageItem({ children, language }: LanguageItem) {
  const { i18n } = useTranslation();

  return (
    <button
      className={`language-item ${i18n.language === language ? 'selected' : ''}`}
      onClick={() => i18n.changeLanguage(language)}>
      {children}
    </button>
  );
}
