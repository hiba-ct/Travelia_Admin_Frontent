import React from 'react';
import { useEffect, useState } from 'react';
import { ArrowLeft, ImagePlus, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const empty = { title:'', destination:'', country:'', description:'', duration:'', price:'', currency:'INR', travellers:'', image:'', category:'Adventure', availableDate:'', status:'Active' };
export default function TravelForm({ initialData, onSubmit, saving }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => { if (initialData) setForm({...empty, ...initialData, availableDate: initialData.availableDate ? new Date(initialData.availableDate).toISOString().slice(0,10) : ''}); }, [initialData]);
  const change = e => setForm(prev => ({...prev, [e.target.name]: e.target.value}));
  const submit = async e => { e.preventDefault(); setError(''); if (!form.title.trim() || !form.destination.trim() || !form.country.trim() || !form.duration || !form.price) { setError('Please complete all required fields.'); return; } try { await onSubmit({...form, duration:Number(form.duration), price:Number(form.price), travellers:form.travellers ? Number(form.travellers) : 1}); } catch (err) { setError(err.response?.data?.message || 'Could not save the package. Please try again.'); } };
  return <form className="form-card" onSubmit={submit}>
    <div className="form-card-heading"><div><h3>Travel information</h3><p>Enter the details of your travel package below.</p></div><span className="required-note">* Required fields</span></div>
    <div className="form-section-title">BASIC DETAILS</div>
    <div className="form-grid"><label className="field full"><span>Package title <b>*</b></span><input name="title" value={form.title} onChange={change} placeholder="e.g. Magical Kerala Getaway" required/></label><label className="field"><span>Destination city <b>*</b></span><input name="destination" value={form.destination} onChange={change} placeholder="e.g. Munnar" required/></label><label className="field"><span>Country <b>*</b></span><input name="country" value={form.country} onChange={change} placeholder="e.g. India" required/></label><label className="field full"><span>Description</span><textarea name="description" value={form.description} onChange={change} rows="4" placeholder="Describe the experience, highlights and what is included..."/></label></div>
    <div className="form-section-title section-spaced">PACKAGE & PRICING</div>
    <div className="form-grid"><label className="field"><span>Category</span><select name="category" value={form.category} onChange={change}><option>Adventure</option><option>Beach</option><option>Culture</option><option>Family</option><option>Honeymoon</option><option>Nature</option><option>City break</option><option>Other</option></select></label><label className="field"><span>Duration (days) <b>*</b></span><input type="number" min="1" name="duration" value={form.duration} onChange={change} placeholder="e.g. 5" required/></label><div className="field"><span>Price <b>*</b></span><div className="input-combo"><select name="currency" value={form.currency} onChange={change}><option>INR</option><option>OMR</option><option>USD</option><option>AED</option></select><input type="number" min="0" name="price" value={form.price} onChange={change} placeholder="0.00" required/></div></div><label className="field"><span>Maximum travellers</span><input type="number" min="1" name="travellers" value={form.travellers} onChange={change} placeholder="e.g. 12"/></label><label className="field"><span>Available from</span><input type="date" name="availableDate" value={form.availableDate} onChange={change}/></label><label className="field"><span>Package status</span><select name="status" value={form.status} onChange={change}><option>Active</option><option>Inactive</option></select></label></div>
    <div className="form-section-title section-spaced">PACKAGE IMAGE</div>
    <label className="field full"><span>Image URL</span><div className="image-url-input"><ImagePlus size={18}/><input name="image" value={form.image} onChange={change} placeholder="https://example.com/destination.jpg"/></div><small>Paste a publicly accessible image URL. Use a landscape image for the best result.</small></label>
    {form.image && <div className="image-preview"><img src={form.image} alt="Travel preview" onError={e=>e.currentTarget.style.display='none'}/></div>}
    {error && <div className="form-error">{error}</div>}
    <div className="form-actions"><button type="button" className="btn-secondary" onClick={()=>navigate(-1)}>Cancel</button><button type="submit" className="btn-primary" disabled={saving}><Save size={16}/>{saving ? 'Saving...' : initialData ? 'Update package' : 'Save package'}</button></div>
  </form>;
}
