"use client";
import { useState, useRef, useEffect } from 'react';
import { TrevorEngine } from '../lib/trevorEngine';

export default function Page() {
  const [messages, setMessages] = useState([{ role: 'trevor', text: "Hello! I am Trevor 4.0. I've been upgraded with conversational logic and emoji support. 🤖✨" }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const trevor = useRef(new TrevorEngine());
  const chatEnd = useRef(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

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
    }, 1200); // Slightly longer "thinking" time for realism
  };

  const s = {
    bg: { backgroundColor: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' },
    card: { width: '100%', maxWidth: '550px', backgroundColor: '#0f172a', borderRadius: '24px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', height: '90vh', overflow: 'hidden' },
    msg: (r) => ({
      alignSelf: r === 'user' ? 'flex-end' : 'flex-start',
      backgroundColor: r === 'user' ? '#2563eb' : '#1e293b',
      padding: '14px 20px', borderRadius: '18px', color: 'white', fontSize: '14px', maxWidth: '85%',
      whiteSpace: 'pre-wrap', // This allows the ChatGPT-style paragraphs
      lineHeight: '1.5'
    })
  };

  return (
    <div style={s.bg}>
      <div style={s.card}>
        <div style={{ padding: '20px', borderBottom: '1px solid #1e293b', textAlign: 'center' }}>
          <b style={{color: 'white', letterSpacing: '1px'}}>TREVOR GPT 🚀</b>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {messages.map((m, i) => <div key={i} style={s.msg(m.role)}>{m.text}</div>)}
          {isTyping && <div style={{color: '#475569', fontSize: '12px', paddingLeft: '10px'}}>Trevor is typing...</div>}
          <div ref={chatEnd} />
        </div>
        <div style={{ padding: '20px', display: 'flex', gap: '10px', background: '#0f172a' }}>
          <input style={{flex: 1, background: '#1e293b', border: 'none', padding: '15px', borderRadius: '12px', color: 'white', outline: 'none'}} 
            value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Message Trevor..." />
          <button onClick={handleSend} style={{background: '#3b82f6', color:'white', border: 'none', padding: '0 20px', borderRadius: '12px', fontWeight: 'bold'}}>SEND</button>
        </div>
      </div>
    </div>
  );
}
