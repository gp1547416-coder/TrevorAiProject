"use client";
import { useState, useRef, useEffect } from 'react';
import { TrevorEngine } from '@/lib/trevorEngine';

export default function TrevorApp() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const trevor = useRef(new TrevorEngine());
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when Trevor speaks
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setInput("");
    
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    
    // Trevor takes a second to "think" and learn
    setTimeout(() => {
      const response = trevor.current.getResponse(userText);
      setMessages(prev => [...prev, { role: "trevor", text: response }]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-md bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh] border border-slate-700">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-600 to-cyan-500 flex justify-between items-center shadow-lg">
          <div>
            <h1 className="text-xl font-black tracking-tight">TREVOR AI</h1>
            <p className="text-[10px] uppercase tracking-widest opacity-80">Local Learning Active</p>
          </div>
          <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]"></div>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-slate-800">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center px-8">
              <div className="text-4xl mb-2">🧠</div>
              <p className="text-sm font-medium">Trevor is empty. Say something so he can learn your vocabulary.</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-medium shadow-md transition-all ${
                m.role === 'user' 
                  ? 'bg-blue-500 text-white rounded-tr-none border border-blue-400' 
                  : 'bg-slate-700 text-cyan-50 border border-slate-600 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-900/50 border-t border-slate-700">
          <div className="flex gap-2 items-center bg-slate-700 rounded-2xl p-1 shadow-inner">
            <input 
              className="flex-1 bg-transparent border-none p-3 text-sm outline-none placeholder:text-slate-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type to teach Trevor..."
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-500 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90"
            >
              ➔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
