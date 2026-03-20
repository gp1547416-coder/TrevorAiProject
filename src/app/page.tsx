"use client";
import { useState, useEffect, useRef } from 'react';
import { TrevorEngine } from '@/lib/trevorEngine';

export default function TrevorChat() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  // Use a ref to keep the same Trevor instance across renders
  const trevor = useRef(new TrevorEngine());

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: "User", text: input };
    const responseText = trevor.current.getResponse(input);
    const trevorMsg = { role: "Trevor", text: responseText };

    setMessages(prev => [...prev, userMsg, trevorMsg]);
    setInput("");
  };

  return (
    <main className="max-w-2xl mx-auto p-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Trevor AI</h1>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full border border-green-200">
          Learning Mode Active
        </span>
      </div>
      
      <div className="border border-gray-200 rounded-xl h-[500px] overflow-y-auto p-4 mb-4 bg-white shadow-inner">
        {messages.map((m, i) => (
          <div key={i} className={`mb-4 flex ${m.role === 'User' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${
              m.role === 'Trevor' 
                ? 'bg-blue-50 text-blue-900 rounded-tl-none' 
                : 'bg-gray-800 text-white rounded-tr-none'
            }`}>
              <div className="text-[10px] uppercase font-bold mb-1 opacity-50">{m.role}</div>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input 
          className="flex-1 border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type something for Trevor to learn..."
        />
        <button 
          onClick={handleSend} 
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 active:scale-95 transition-all font-medium"
        >
          Send
        </button>
      </div>
      <p className="text-center text-gray-400 text-xs mt-4">
        Trevor learns from the characters you type. No APIs, no tracking.
      </p>
    </main>
  );
}
