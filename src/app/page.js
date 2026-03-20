"use client";
import { useState, useRef, useEffect } from 'react';
import { TrevorEngine } from '../lib/trevorEngine';

export default function Page() {
  const [messages, setMessages] = useState([{ role: 'trevor', text: "Trevor 6.0 Online. Tell me to 'Make a red button' or 'Code a purple card' and I will build it. 🚀" }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const trevor = useRef(new TrevorEngine());
  const chatEnd = useRef(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = trevor.current.getResponse(userText);
      setMessages(prev => [...prev, { role: "trevor", text: response.text, code: response.code }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '15px', fontFamily: 'sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '650px', backgroundColor: '#0f172a', borderRadius: '30px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', height: '90vh' }}>
        
        {/* Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between' }}>
          <b style={{ color: 'white' }}>TREVOR <span style={{color: '#3b82f6'}}>CODER</span></b>
          <span style={{ color: '#10b981', fontSize: '10px' }}>LIVE_COMPILER_ACTIVE</span>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: m.role === 'user' ? '#2563eb' : '#1e293b',
              padding: '16px', borderRadius: '20px', color: 'white', maxWidth: '85%', whiteSpace: 'pre-wrap'
            }}>
              {m.text}
              {m.code && (
                <div style={{ marginTop: '15px', padding: '15px', background: '#020617', borderRadius: '15px', border: '1px solid #334155' }}>
                  <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '10px' }}>PREVIEW:</div>
                  <div dangerouslySetInnerHTML={{ __html: m.code }} />
                </div>
              )}
            </div>
          ))}
          {isTyping && <div style={{ color: '#3b82f6', fontSize: '12px' }}>Coding...</div>}
          <div ref={chatEnd} />
        </div>

        {/* Input */}
        <div style={{ padding: '20px', display: 'flex', gap: '10px' }}>
          <input 
            style={{ flex: 1, background: '#1e293b', border: '1px solid #334155', padding: '15px', borderRadius: '15px', color: 'white', outline: 'none' }}
            value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="e.g. 'Make a red button'" 
          />
          <button onClick={handleSend} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0 25px', borderRadius: '15px', fontWeight: 'bold' }}>GO</button>
        </div>
      </div>
    </div>
  );
}
