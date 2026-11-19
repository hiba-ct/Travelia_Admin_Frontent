import React from 'react';
import { LayoutDashboard, MapPinned, PlusCircle, CalendarCheck, Users, Settings, Plane, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/travels', label: 'Travel packages', icon: MapPinned },
  { to: '/add-travel', label: 'Add travel', icon: PlusCircle },
];

export default function Sidebar({ open, onClose }) {
  return <>
    {open && <button className="mobile-scrim" aria-label="Close menu" onClick={onClose} />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand"><span className="brand-icon"><Plane size={21}/></span><span>Travelia<span className="brand-sub">TRAVEL ADMIN</span></span><button className="sidebar-close" onClick={onClose}><X size={19}/></button></div>
      <div className="nav-label">WORKSPACE</div>
      <nav className="side-nav">{links.map(({to,label,icon:Icon,end}) => <NavLink key={to} to={to} end={end} onClick={onClose} className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}><Icon size={18}/><span>{label}</span></NavLink>)}</nav>
      <div className="nav-label other-label">MANAGE</div>
      <div className="side-placeholder"><CalendarCheck size={18}/><span>Bookings</span><span className="soon">SOON</span></div>
      <div className="side-placeholder"><Users size={18}/><span>Customers</span><span className="soon">SOON</span></div>
      <div className="side-bottom"><div className="help-card"><div className="help-icon"><Settings size={17}/></div><strong>Need a hand?</strong><p>Manage your travel packages from one place.</p></div><div className="profile"><div className="avatar">A</div><div><strong>Admin User</strong><small>Administrator</small></div><span className="online-dot"/></div></div>
    </aside>
  </>;
}
