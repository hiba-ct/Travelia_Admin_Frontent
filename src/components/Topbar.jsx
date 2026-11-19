import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const titles = {'/':'Overview','/travels':'Travel packages','/add-travel':'Add a travel package'};
export default function Topbar({ onMenu }) {
  const location = useLocation();
  const title = location.pathname.startsWith('/edit-travel') ? 'Edit travel package' : titles[location.pathname] || 'Travel management';
  return <header className="topbar"><div className="topbar-left"><button className="menu-button" onClick={onMenu} aria-label="Open menu"><Menu size={21}/></button><div><div className="breadcrumb">PAGES <span>/</span> <b>{title.toUpperCase()}</b></div><h1>{title}</h1></div></div><div className="topbar-actions"><div className="top-search"><Search size={17}/><span>Travel management</span></div><button className="icon-button" aria-label="Notifications"><Bell size={19}/><i/></button><div className="top-avatar">A</div></div></header>;
}
