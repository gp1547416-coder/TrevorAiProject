"use client";
import { useState, useRef, useEffect } from 'react';
import { TrevorEngine } from '../lib/trevorEngine';

export default function Page() {
  const [messages, setMessages] = useState([{ role: 'trevor', text: "Trevor Ultra Online. I can code, search, and analyze data. 🧠✨" }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const trevor = useRef(new TrevorEngine());
  const chatEnd = useRef(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    
    const userText = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    
    setIsTyping(true);

    // Small delay to simulate "Thinking" so it doesn't crash the state
    setTimeout(() => {
      try {
        const reply = trevor.current.getResponse(userText);
        if (reply) {
          setMessages(prev => [...prev, { role: "trevor", text: reply.text, code: reply.code }]);
        }
      } catch (err) {
        console.error("Brain Glitch:", err);
      }
      setIsTyping(false);
    }, 800);
  };

  const s = {
    bg: { backgroundColor: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' },
    card: { width: '100%', maxWidth: '600px', backgroundColor: '#0f172a', borderRadius: '24px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', height: '90vh', overflow: 'hidden' },
    msg: (r) => ({
      alignSelf: r === 'user' ? 'flex-end' : 'flex-start',
      backgroundColor: r === 'user' ? '#2563eb' : '#1e293b',
      padding: '15px 20px', borderRadius: '18px', color: 'white', fontSize: '14px', maxWidth: '85%',
      whiteSpace: 'pre-wrap', marginBottom: '12px', border: r === 'trevor' ? '1px solid #334155' : 'none'
    }),
    codePreview: { marginTop: '10px', padding: '15px', background: '#020617', borderRadius: '12px', border: '1px solid #3b82f6' }
  };

  return (
    <div style={s.bg}>
      <div style={s.card}>
        <div style={{ padding: '20px', borderBottom: '1px solid #1e293b', color: 'white' }}>
          <b>TREVOR <span style={{color:'#3b82f6'}}>ULTRA</span></b>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          {messages.map((m, i) => (
            <div key={i} style={s.msg(m.role)}>
              {m.text}
              {m.code && (
                <div style={s.codePreview}>
                  <div style={{fontSize:'10px', color:'#64748b', marginBottom:'5px'}}>GENERATED GUI:</div>
                  <div dangerouslySetInnerHTML={{ __html: m.code }} />
                </div>
              )}
            </div>
          ))}
          {isTyping && <div style={{color: '#3b82f6', fontSize: '12px'}}>Neural link active...</div>}
          <div ref={chatEnd} />
        </div>
        <div style={{ padding: '20px', display: 'flex', gap: '10px' }}>
          <input 
            style={{flex: 1, background: '#1e293b', border: 'none', padding: '15px', borderRadius: '12px', color: 'white', outline: 'none'}} 
            value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
            placeholder="Try: 'Build a button' or 'Search for tech news'..." 
          />
          <button onClick={handleSend} style={{background: '#3b82f6', color:'white', border: 'none', padding: '0 20px', borderRadius: '12px', fontWeight: 'bold'}}>SEND</button>
        </div>
      </div>
    </div>
  );
}
