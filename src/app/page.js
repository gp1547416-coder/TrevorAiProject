"use client";
import { useState, useRef, useEffect } from 'react';
import { TrevorEngine } from '../lib/trevorEngine';

export default function Page() {
  const [messages, setMessages] = useState([{ role: 'trevor', text: "Systems online. I can now 'search' topics like Weather, Time, or NextJS. Try me." }]);
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
    }, 900);
  };

  const s = {
    bg: { backgroundColor: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' },
    card: { width: '100%', maxWidth: '500px', backgroundColor: '#0f172a', borderRadius: '32px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', height: '88vh', overflow: 'hidden' },
    msg: (r, isWeb) => ({
      alignSelf: r === 'user' ? 'flex-end' : 'flex-start',
      backgroundColor: isWeb ? '#065f46' : (r === 'user' ? '#2563eb' : '#1e293b'),
      padding: '14px 20px', borderRadius: '20px', color: 'white', fontSize: '15px', maxWidth: '85%',
      border: isWeb ? '1px solid #10b981' : 'none'
    })
  };

  return (
    <div style={s.bg}>
      <div style={s.card}>
        <div style={{ padding: '20px', background: '#0f172a', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between' }}>
          <b style={{color: 'white'}}>TREVOR <span style={{color:'#3b82f6'}}>ULTRA</span></b>
          <div style={{fontSize:'10px', color:'#10b981'}}>WEB_SEARCH_ENABLED</div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((m, i) => (
            <div key={i} style={s.msg(m.role, m.text.includes('[WEB SEARCH]'))}>
              {m.text.replace('[WEB SEARCH] ', '')}
            </div>
          ))}
          {isTyping && <div style={{color: '#475569', fontSize: '12px'}}>Analyzing data...</div>}
          <div ref={chatEnd} />
        </div>
        <div style={{ padding: '20px', display: 'flex', gap: '10px' }}>
          <input style={{flex: 1, background: '#1e293b', border: 'none', padding: '15px', borderRadius: '15px', color: 'white', outline: 'none'}} 
            value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask something..." />
          <button onClick={handleSend} style={{background: '#3b82f6', color:'white', border: 'none', padding: '0 20px', borderRadius: '15px', fontWeight: 'bold'}}>SEND</button>
        </div>
      </div>
    </div>
  );
}
