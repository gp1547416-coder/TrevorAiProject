"use client";
import { useState, useRef, useEffect } from 'react';
import { TrevorEngine } from '@/lib/trevorEngine';

export default function Page() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const trevor = useRef(new TrevorEngine());
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setInput("");
    setMessages(m => [...m, { role: "user", text: userText }]);
    
    setTimeout(() => {
      const reply = trevor.current.getResponse(userText);
      setMessages(m => [...m, { role: "trevor", text: reply }]);
    }, 400);
  };

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '450px', backgroundColor: '#0f172a', borderRadius: '24px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', height: '85vh', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        
        {/* Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: '900' }}>TREVOR <span style={{ color: '#3b82f6' }}>AI</span></h1>
          <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Neural Learning</div>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ 
                maxWidth: '85%', 
                padding: '12px 16px', 
                borderRadius: '16px', 
                fontSize: '14px',
                backgroundColor: m.role === 'user' ? '#3b82f6' : '#1e293b',
                color: 'white',
                borderBottomRightRadius: m.role === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: m.role === 'trevor' ? '4px' : '16px'
              }}>
                {m.text}
              </div>
            </div>
          ))}
          <div ref={chatEnd} />
        </div>

        {/* Input */}
        <div style={{ padding: '20px', borderTop: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', gap: '8px', backgroundColor: '#1e293b', padding: '4px', borderRadius: '14px' }}>
            <input 
              style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px', color: 'white', outline: 'none' }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Teach Trevor..."
            />
            <button onClick={handleSend} style={{ backgroundColor: 'white', color: 'black', border: 'none', padding: '0 16px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
