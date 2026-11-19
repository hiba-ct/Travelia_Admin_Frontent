import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from './components/Toast';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import TravelTable from './components/TravelTable';
import TravelForm from './components/TravelForm';
import { createTravel, deleteTravel, getTravels, updateTravel } from './services';

function AddPage({ onCreate, saving }) { return <div className="page-content"><div className="page-intro"><div><h2>Create a travel package</h2><p>Share a new destination with your travellers.</p></div></div><TravelForm onSubmit={onCreate} saving={saving}/></div>; }
function EditPage({ travels, onUpdate, saving }) { const {id}=useParams(); const item=travels.find(t=>t._id===id); if (!item) return <div className="page-content"><div className="loading-card">{travels.length ? 'Package not found. It may have been deleted.' : 'Loading package...'}</div></div>; return <div className="page-content"><div className="page-intro"><div><h2>Update travel package</h2><p>Make changes to {item.title}.</p></div></div><TravelForm initialData={item} onSubmit={data=>onUpdate(id,data)} saving={saving}/></div>; }

export default function App() {
  const [travels,setTravels]=useState([]); const [loading,setLoading]=useState(true); const [saving,setSaving]=useState(false); const [menuOpen,setMenuOpen]=useState(false); const navigate=useNavigate();
  const load=useCallback(async()=>{ try { const data=await getTravels(); setTravels(data.travels || []); } catch(err) { toast(err.response?.data?.message || 'Could not connect to the API. Check that your backend is running.','error'); } finally { setLoading(false); } },[]);
  useEffect(()=>{load();},[load]);
  const create=async data=>{setSaving(true);try{await createTravel(data);await load();toast('Travel package created successfully.');navigate('/travels');}finally{setSaving(false);}};
  const update=async(id,data)=>{setSaving(true);try{await updateTravel(id,data);await load();toast('Travel package updated successfully.');navigate('/travels');}finally{setSaving(false);}};
  const remove=async id=>{if(!window.confirm('Delete this travel package? This action cannot be undone.'))return;try{await deleteTravel(id);setTravels(prev=>prev.filter(t=>t._id!==id));toast('Travel package deleted.');}catch{toast('Could not delete the package.','error');}};
  return <div className="app-shell"><Sidebar open={menuOpen} onClose={()=>setMenuOpen(false)}/><main className="main-area"><Topbar onMenu={()=>setMenuOpen(true)}/><Routes><Route path="/" element={<Dashboard travels={travels} onDelete={remove} loading={loading}/>}/><Route path="/travels" element={<div className="page-content"><div className="page-intro"><div><h2>All travel packages</h2><p>Keep your destinations, pricing and availability up to date.</p></div><button className="btn-primary" onClick={()=>navigate('/add-travel')}>＋ Add package</button></div>{loading?<div className="loading-card">Loading travel packages...</div>:<TravelTable travels={travels} onDelete={remove}/>}</div>}/><Route path="/add-travel" element={<AddPage onCreate={create} saving={saving}/>}/><Route path="/edit-travel/:id" element={<EditPage travels={travels} onUpdate={update} saving={saving}/>}/><Route path="*" element={<div className="page-content"><div className="loading-card">Page not found.</div></div>}/></Routes><footer className="app-footer">© {new Date().getFullYear()} Travelia Admin <span>Made for better journeys</span></footer></main><ToastContainer/></div>;
}
