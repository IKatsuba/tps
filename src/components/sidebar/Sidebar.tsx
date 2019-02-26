import React from 'react';
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
  return (
    <div className="sidebar-item">
      <img className="sidebar-item-img" src={selected ? menuIconActive : menuIcon}/>
    </div>
  );
}

export function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-body">
        <img src={appIcon} className="sidebar-logo"/>

        <div className="sidebar-navigation">
          {sidebarItems.map(({ selected }, i: number) =>
            <SidebarItem key={i} selected={selected}/>
          )}
        </div>
      </div>
    </div>
  );
}
