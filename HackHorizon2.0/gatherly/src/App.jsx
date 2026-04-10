import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, PartyPopper } from 'lucide-react';

// Crucial: These must match your file names exactly
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import PassModal from './components/PassModal';

export default function App() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [attendeeName, setAttendeeName] = useState('');
  const [isAskingName, setIsAskingName] = useState(false);

  // Fetch events from backend
  const fetchEvents = () => {
    axios.get('http://localhost:5000/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error("Database connection error:", err));
  };

  useEffect(() => { fetchEvents(); }, []);

  const triggerPassProcess = (event) => {
    setSelectedEvent(event);
    setIsAskingName(true);
  };

  const finalizePass = () => {
    const val = document.getElementById('nameInputField').value;
    if (val.trim()) {
      setAttendeeName(val);
      setIsAskingName(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      <nav className="p-6 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#0f172a]/90 backdrop-blur-md z-40">
        <div className="flex items-center gap-2">
          <PartyPopper className="text-indigo-500" />
          <h1 className="font-black uppercase tracking-tighter text-xl">Gatherly</h1>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-indigo-500 transition-all">
          {showForm ? 'Close' : 'Host Event'}
        </button>
      </nav>

      <main className="max-w-7xl mx-auto p-6 pt-10">
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <EventForm onAdd={(ev) => { setEvents([ev, ...events]); setShowForm(false); }} />
            </motion.div>
          )}
        </AnimatePresence>

        <EventList 
          events={events} 
          onLike={async (id) => {
            const res = await axios.patch(`http://localhost:5000/api/events/${id}/like`);
            setEvents(events.map(e => e._id === id ? res.data : e));
          }} 
          onGetPass={triggerPassProcess} 
        />
      </main>

      {/* STEP 1: Name Input Modal */}
      <AnimatePresence>
        {isAskingName && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-slate-900 border border-white/10 p-8 rounded-[2rem] w-full max-w-sm shadow-2xl">
              <h2 className="text-xl font-bold mb-4 text-center">Enter Attendee Name</h2>
              <input id="nameInputField" type="text" placeholder="Your Full Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl mb-4 outline-none focus:border-indigo-500 text-white" autoFocus />
              <button onClick={finalizePass} className="w-full bg-indigo-600 py-4 rounded-xl font-bold hover:bg-indigo-500 transition-all">Generate My Ticket</button>
              <button onClick={() => setIsAskingName(false)} className="w-full mt-4 text-slate-500 text-sm">Cancel</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* STEP 2: The Ticket Pass Modal */}
      <AnimatePresence>
        {selectedEvent && !isAskingName && attendeeName && (
          <PassModal event={selectedEvent} name={attendeeName} onClose={() => { setSelectedEvent(null); setAttendeeName(''); }} />
        )}
      </AnimatePresence>
    </div>
  );
}