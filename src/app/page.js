"use client";
import { useState, useRef, useEffect } from 'react';
import { TrevorEngine } from '../lib/trevorEngine';

export default function Page() {
  const [messages, setMessages] = useState([{ role: 'trevor', text: "Trevor 7.0 Powered by Llama-3 is ONLINE. 🧠🚀" }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const trevor = useRef(new TrevorEngine());
  const chatEnd = useRef(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userText = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setIsTyping(true);

    // This "await" is the secret to stopping the "This page couldn't load" error
    const response = await trevor.current.getResponse(userText);
    
    setMessages(prev => [...prev, { role: "trevor", text: response.text, code: response.code }]);
    setIsTyping(false);
  };

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '10px' }}>
      <div style={{ width: '100%', maxWidth: '750px', backgroundColor: '#0f172a', borderRadius: '24px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', height: '90vh' }}>
        <div style={{ padding: '15px', borderBottom: '1px solid #1e293b', color: 'white', fontWeight: 'bold' }}>TREVOR AI <span style={{color:'#3b82f6'}}>LLAMA-3 MODE</span></div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: m.role === 'user' ? '#2563eb' : '#1e293b',
              padding: '15px', borderRadius: '20px', color: 'white', maxWidth: '90%', whiteSpace: 'pre-wrap', fontSize: '13px'
            }}>
              {m.text}
              {m.code && (
                <div style={{ marginTop: '15px', padding: '20px', background: '#020617', borderRadius: '15px', border: '1px solid #3b82f6', overflow: 'hidden' }}>
                  <div style={{fontSize:'10px', color:'#64748b', marginBottom:'10px'}}>LIVE GUI RENDER:</div>
                  <div dangerouslySetInnerHTML={{ __html: m.code }} />
                </div>
              )}
            </div>
          ))}
          {isTyping && <div style={{ color: '#3b82f6', fontSize: '12px' }}>Brain thinking...</div>}
          <div ref={chatEnd} />
        </div>
        <div style={{ padding: '20px', display: 'flex', gap: '10px' }}>
          <input style={{ flex: 1, background: '#1e293b', border: '1px solid #334155', padding: '15px', borderRadius: '15px', color: 'white', outline: 'none' }}
            value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Code a 3D flipping table..." />
          <button onClick={handleSend} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0 25px', borderRadius: '15px', fontWeight: 'bold' }}>SEND</button>
        </div>
      </div>
    </div>
  );
}
