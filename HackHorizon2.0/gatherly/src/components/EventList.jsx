import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Flame, Ticket } from 'lucide-react';

export default function EventList({ events, onLike, onGetPass }) {
  if (events.length === 0) return <div className="text-center py-20 text-slate-500">No events found. Be the first to host one!</div>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((e, i) => (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={e._id} className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] flex flex-col justify-between group">
          <div>
            <div className="flex justify-between mb-4">
              <span className="text-[10px] font-black uppercase py-1 px-3 bg-indigo-500/20 text-indigo-400 rounded-full border border-indigo-500/20">{e.category}</span>
              <button onClick={() => onLike(e._id)} className="flex items-center gap-1.5 text-orange-500 font-bold bg-orange-500/10 px-3 py-1 rounded-full text-sm">
                <Flame size={14} fill="currentColor" /> {e.likes}
              </button>
            </div>
            <h3 className="text-xl font-bold mb-2">{e.title}</h3>
            <p className="text-slate-400 text-sm mb-6 line-clamp-2">{e.description}</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase border-t border-white/5 pt-4">
              <span className="flex items-center gap-1"><Calendar size={12}/> {e.date}</span>
              <span className="flex items-center gap-1"><MapPin size={12}/> {e.location}</span>
            </div>
            <button onClick={() => onGetPass(e)} className="w-full flex items-center justify-center gap-2 bg-indigo-600 py-3 rounded-2xl text-sm font-black hover:bg-white hover:text-black transition-all">
              <Ticket size={18} /> GET PASS
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}