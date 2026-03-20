"use client";
import { useState, useRef, useEffect } from 'react';
import { TrevorEngine } from '../lib/trevorEngine';

export default function Page() {
  const [messages, setMessages] = useState([{ role: 'trevor', text: "I am empty. Teach me." }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const trevor = useRef(new TrevorEngine());
  const chatEnd = useRef(null);

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
    }, 600);
  };

  const s = {
    bg: { backgroundColor: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'system-ui' },
    card: { width: '100%', maxWidth: '450px', backgroundColor: '#0f172a', borderRadius: '30px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', height: '85vh', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' },
    chat: { flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' },
    inputArea: { padding: '20px', borderTop: '1px solid #1e293b', display: 'flex', gap: '10px' },
    msg: (role) => ({
      alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
      backgroundColor: role === 'user' ? '#2563eb' : '#1e293b',
      padding: '12px 18px', borderRadius: '18px', color: 'white', fontSize: '14px', maxWidth: '80%'
    })
  };

  return (
    <div style={s.bg}>
      <div style={s.card}>
        <div style={{ padding: '20px', borderBottom: '1px solid #1e293b', color: 'white', fontWeight: 'bold' }}>TREVOR AI <span style={{fontSize: '10px', color: '#3b82f6'}}>ULTRA</span></div>
        <div style={s.chat}>
          {messages.map((m, i) => <div key={i} style={s.msg(m.role)}>{m.text}</div>)}
          {isTyping && <div style={{color: '#475569', fontSize: '12px'}}>Thinking...</div>}
          <div ref={chatEnd} />
        </div>
        <div style={s.inputArea}>
          <input style={{flex: 1, background: '#1e293b', border: 'none', padding: '12px', borderRadius: '12px', color: 'white', outline: 'none'}} 
            value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Talk to me..." />
          <button onClick={handleSend} style={{background: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold'}}>SEND</button>
        </div>
      </div>
    </div>
  );
}
