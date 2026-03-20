"use client";
import { useState, useRef } from 'react';
import { TrevorEngine } from '@/lib/trevorEngine';

export default function Page() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const trevor = useRef(new TrevorEngine());

  const handleSend = () => {
    if (!input.trim()) return;
    trevor.current.learn(input);
    const response = trevor.current.getResponse(input);
    setMessages([...messages, { role: "user", text: input }, { role: "trevor", text: response }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 font-sans text-gray-900">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl flex flex-col h-[80vh] overflow-hidden border border-gray-100">
        <div className="p-4 bg-blue-600 text-white font-bold flex justify-between items-center">
          <span>Trevor AI</span>
          <span className="text-xs bg-blue-400 px-2 py-1 rounded-full">Learning Mode</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100 bg-white flex gap-2">
          <input 
            className="flex-1 bg-gray-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type for Trevor to learn..."
          />
          <button onClick={handleSend} className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold active:scale-95 transition-transform">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
