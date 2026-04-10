import React, { useState } from 'react';
import axios from 'axios';

export default function EventForm({ onAdd }) {
  const [f, setF] = useState({ title: '', category: 'Tech', date: '', location: '', description: '' });

  const submit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:5000/api/events', f);
        onAdd(res.data);
    } catch (err) {
        alert("Failed to publish event. Check if backend is connected.");
    }
  };

  const iStyle = "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-indigo-500 outline-none transition-all text-white mb-4";

  return (
    <form onSubmit={submit} className="bg-white/5 p-8 rounded-[2rem] border border-white/10 max-w-2xl mx-auto mb-10">
      <input required placeholder="Event Title" className={iStyle} onChange={e => setF({...f, title: e.target.value})} />
      <div className="grid md:grid-cols-2 gap-4">
        <select className={iStyle} onChange={e => setF({...f, category: e.target.value})}>
          <option className="bg-slate-900">Tech</option>
          <option className="bg-slate-900">Sports</option>
          <option className="bg-slate-900">Social</option>
        </select>
        <input type="date" required className={iStyle} onChange={e => setF({...f, date: e.target.value})} />
      </div>
      <input required placeholder="Location" className={iStyle} onChange={e => setF({...f, location: e.target.value})} />
      <textarea placeholder="Description" className={`${iStyle} h-32`} onChange={e => setF({...f, description: e.target.value})} />
      <button className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-500 transition-all">PUBLISH EVENT</button>
    </form>
  );
}