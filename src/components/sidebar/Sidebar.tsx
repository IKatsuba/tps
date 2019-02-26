import React from 'react';
import { useTranslation } from 'react-i18next';
import menuIconActive from '../../icons/menu-icon-active.svg';
import menuIcon from '../../icons/menu-icon.svg';
import appIcon from '../../icons/t40x40.svg';
import './Sidebar.scss';

interface SidebarItemProps {
  selected?: boolean;
}

export const sidebarItems: SidebarItemProps[] = [
  {}, {}, {}, {}, {}, { selected: true }, {}, {}
];

export function SidebarItem({ selected = false }: SidebarItemProps) {
  const { t } = useTranslation();

  return (
    <div className="sidebar-item">
      <img className="sidebar-item-img" src={selected ? menuIconActive : menuIcon} alt={t('Navigation item')}/>
    </div>
  );
}

export function Sidebar() {
  const { t } = useTranslation();

  return (
    <div className="sidebar">
      <div className="sidebar-body">
        <img src={appIcon} className="sidebar-logo" alt={t('App icon')}/>

        <div className="sidebar-navigation">
          {sidebarItems.map(({ selected }, i: number) =>
            <SidebarItem key={i} selected={selected}/>
          )}
        </div>
      </div>
    </div>
  );
}
