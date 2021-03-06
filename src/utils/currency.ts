import { Languages } from '../i18n';

export enum Currencies {
  Rub = 'rub'
}

export function formatCurrency(local: Languages, num: number, currency: Currencies) {
  return new Intl.NumberFormat(local, { style: 'currency', currency }).format(num);
}
