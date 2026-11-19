import React from 'react';
import { ArrowUpRight, MapPinned, CalendarCheck, Users, Wallet, Plus, ArrowRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import TravelTable from '../components/TravelTable';

export default function Dashboard({ travels, onDelete, loading }) {
  const active = travels.filter(t=>t.status==='Active').length;
  const stats = [{label:'Total packages',value:travels.length,icon:MapPinned,tone:'blue',note:'Travel experiences'},{label:'Active packages',value:active,icon:Compass,tone:'green',note:'Currently available'},{label:'Total travellers',value:travels.reduce((n,t)=>n+(Number(t.travellers)||0),0),icon:Users,tone:'purple',note:'Package capacity'},{label:'Average package price',value:travels.length ? Math.round(travels.reduce((n,t)=>n+Number(t.price||0),0)/travels.length).toLocaleString('en-IN') : '0',icon:Wallet,tone:'orange',note:'Across all packages'}];
  return <div className="page-content"><div className="welcome-banner"><div className="welcome-copy"><span className="eyebrow">YOUR TRAVEL BUSINESS, AT A GLANCE</span><h2>Make every journey<br/> <em>worth remembering.</em></h2><p>Here’s what’s happening with your travel packages today.</p><Link to="/add-travel" className="banner-button">Add a new package <ArrowUpRight size={16}/></Link></div><div className="banner-art"><div className="sun"/><div className="mountain mountain-back"/><div className="mountain mountain-front"/><div className="banner-plane"><Compass size={48}/></div></div></div>
    <div className="section-heading"><div><h2>Overview</h2><p>A quick look at your travel catalogue</p></div><span className="live-label"><i/> LIVE DATA</span></div>
    <div className="stats-grid">{stats.map(({label,value,icon:Icon,tone,note})=><div className="stat-card" key={label}><div className={`stat-icon ${tone}`}><Icon size={20}/></div><div className="stat-label">{label}</div><div className="stat-value">{loading ? '—' : value}{label==='Average package price' && <small> avg.</small>}</div><div className="stat-note">{note}</div></div>)}</div>
    <div className="section-heading recent-heading"><div><h2>Recently added packages</h2><p>Your latest travel experiences</p></div><Link to="/travels" className="text-link">View all packages <ArrowRight size={16}/></Link></div>
    {loading ? <div className="loading-card">Loading travel packages...</div> : <TravelTable travels={travels} onDelete={onDelete} compact/>}
    {!travels.length && !loading && <div className="first-package"><div className="first-package-icon"><Plus size={22}/></div><div><strong>Your travel catalogue is ready</strong><p>Add your first destination to get started.</p></div><Link to="/add-travel" className="btn-primary">Add travel package</Link></div>}
    <div className="dashboard-footnote"><CalendarCheck size={15}/> Booking and customer analytics can be connected when you add those modules.</div>
  </div>;
}
