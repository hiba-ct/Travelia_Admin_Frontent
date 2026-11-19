import React from 'react';
import { Eye, Pencil, Trash2, MapPin, Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TravelTable({ travels, onDelete, compact = false }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All status');
  const navigate = useNavigate();
  const filtered = useMemo(() => travels.filter(t => {
    const matches = `${t.title} ${t.destination} ${t.country} ${t.category}`.toLowerCase().includes(query.toLowerCase());
    return matches && (status === 'All status' || t.status === status);
  }), [travels, query, status]);
  return <div className="table-card">
    {!compact && <div className="table-toolbar"><div><h3>All travel packages</h3><p>Manage and update your destinations</p></div><div className="table-filters"><label className="search-field"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search destinations..."/></label><label className="filter-field"><SlidersHorizontal size={15}/><select value={status} onChange={e=>setStatus(e.target.value)}><option>All status</option><option>Active</option><option>Inactive</option></select></label></div></div>}
    <div className="table-scroll"><table><thead><tr><th>DESTINATION</th><th>CATEGORY</th><th>DURATION</th><th>PRICE</th><th>STATUS</th><th className="action-heading">ACTIONS</th></tr></thead><tbody>
      {filtered.length ? filtered.slice(0, compact ? 5 : undefined).map(t => <tr key={t._id}><td><div className="destination-cell"><img src={t.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=120'} alt=""/><div><strong>{t.title}</strong><span><MapPin size={12}/>{t.destination}, {t.country}</span></div></div></td><td><span className="category-pill">{t.category}</span></td><td>{t.duration} days</td><td className="price-cell">{Number(t.price).toLocaleString('en-IN', {style:'currency',currency:t.currency || 'INR',maximumFractionDigits:0})}</td><td><span className={`status-pill ${t.status === 'Active' ? 'status-active' : 'status-inactive'}`}><i/>{t.status}</span></td><td><div className="row-actions"><button title="View" onClick={()=>navigate(`/travels`)}><Eye size={16}/></button><button title="Edit" onClick={()=>navigate(`/edit-travel/${t._id}`)}><Pencil size={16}/></button><button title="Delete" className="delete-action" onClick={()=>onDelete(t._id)}><Trash2 size={16}/></button></div></td></tr>) : <tr><td colSpan="6"><div className="empty-state"><MapPin size={25}/><strong>No travel packages found</strong><span>Try another search or add a new package.</span></div></td></tr>}
    </tbody></table></div>
    {!compact && <div className="table-footer">Showing <b>{filtered.length}</b> {filtered.length === 1 ? 'package' : 'packages'}</div>}
  </div>;
}
