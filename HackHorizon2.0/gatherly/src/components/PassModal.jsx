import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Calendar, PartyPopper } from 'lucide-react';

export default function PassModal({ event, name, onClose }) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="relative bg-white text-slate-950 w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl flex flex-col">
        <button onClick={onClose} className="absolute top-6 right-6 z-10 bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition-all"><X size={18} className="text-slate-500" /></button>
        <div className="bg-indigo-600 p-10 text-white text-center">
          <PartyPopper size={40} className="mx-auto mb-4" />
          <div className="uppercase tracking-widest text-[10px] font-black text-indigo-200 mb-2">Confirmed Entry Pass</div>
          <h2 className="text-3xl font-black leading-tight mb-1">{event.title}</h2>
        </div>
        <div className="p-10 space-y-8 bg-white border-b-2 border-dashed border-slate-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-slate-400">Date</p>
              <div className="flex items-center gap-2 font-bold text-sm"><Calendar size={14} className="text-indigo-600" /> {event.date}</div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-slate-400">Location</p>
              <div className="flex items-center gap-2 font-bold text-sm"><MapPin size={14} className="text-indigo-600" /> {event.location}</div>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-slate-400">Attendee Name</p>
            <p className="text-2xl font-black text-indigo-600 uppercase tracking-tight">{name}</p>
          </div>
        </div>
        <div className="p-10 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-lg text-white flex items-center justify-center text-[8px] font-bold p-1 text-center">VALID TICKET</div>
            <div>
              <p className="text-[10px] font-bold text-slate-400">TICKET ID</p>
              <p className="text-sm font-black uppercase">GT-{event._id?.slice(-6).toUpperCase()}</p>
            </div>
          </div>
          <button onClick={() => window.print()} className="text-indigo-600 font-black text-xs border-b-2 border-indigo-600">PRINT PASS</button>
        </div>
      </motion.div>
    </div>
  );
}