"use client";
import { useState, useRef, useEffect } from 'react';
import { TrevorEngine } from '@/lib/trevorEngine';

export default function Page() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const trevor = useRef(new TrevorEngine());
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setInput("");
    setMessages(m => [...m, { role: "user", text: userText }]);
    
    setIsTyping(true);
    setTimeout(() => {
      const reply = trevor.current.getResponse(userText);
      setMessages(m => [...m, { role: "trevor", text: reply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-lg bg-[#0f172a] border border-[#1e293b] rounded-[2rem] shadow-2xl flex flex-col h-[85vh] overflow-hidden">
        <div className="p-6 border-b border-[#1e293b] flex justify-between items-center bg-[#0f172a]/50">
          <h1 className="text-xl font-black tracking-tighter">TREVOR <span className="text-blue-500">AI</span></h1>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Smarter V2</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm ${
                m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-[#1e293b] text-slate-200 border border-[#334155]'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && <div className="text-slate-500 text-xs animate-pulse">Trevor is processing...</div>}
          <div ref={chatEnd} />
        </div>

        <div className="p-6 bg-[#0f172a] border-t border-[#1e293b]">
          <div className="flex gap-2 p-1 bg-[#1e293b] rounded-2xl border border-[#334155]">
            <input 
              className="flex-1 bg-transparent border-none px-4 py-3 text-white outline-none placeholder:text-slate-600"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type to train his brain..."
            />
            <button onClick={handleSend} className="bg-white text-black font-bold px-6 py-2 rounded-xl active:scale-95 transition-all">
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
