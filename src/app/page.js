"use client";
import { useState, useRef, useEffect } from 'react';
import { TrevorEngine } from '../lib/trevorEngine';

export default function Page() {
  const [messages, setMessages] = useState([{ role: 'trevor', text: "Trevor 5.0 Online. I can now search the web, generate UI code, and write long analysis. 🧠✨" }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const trevor = useRef(new TrevorEngine());
  const chatEnd = useRef(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput("");
    setMessages(m => [...m, { role: "user", text: userText }]);
    
    setIsTyping(true);
    const response = await trevor.current.getResponse(userText);
    
    setTimeout(() => {
      setMessages(m => [...m, { role: "trevor", text: response.text, code: response.code }]);
      setIsTyping(false);
    }, 1000);
  };

  const s = {
    bg: { backgroundColor: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px', fontFamily: 'Inter, sans-serif' },
    card: { width: '100%', maxWidth: '700px', backgroundColor: '#0f172a', borderRadius: '24px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', height: '90vh', overflow: 'hidden', boxShadow: '0 0 40px rgba(0,0,0,0.7)' },
    msg: (r) => ({
      alignSelf: r === 'user' ? 'flex-end' : 'flex-start',
      backgroundColor: r === 'user' ? '#2563eb' : '#1e293b',
      padding: '16px 20px', borderRadius: '20px', color: 'white', fontSize: '14px', maxWidth: '90%',
      whiteSpace: 'pre-wrap', border: r === 'trevor' ? '1px solid #334155' : 'none', marginBottom: '10px'
    }),
    codeBox: { marginTop: '15px', padding: '15px', background: '#020617', borderRadius: '12px', border: '1px dashed #3b82f6' }
  };

  return (
    <div style={s.bg}>
      <div style={s.card}>
        <div style={{ padding: '20px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <b style={{color: 'white', fontSize: '18px'}}>TREVOR <span style={{color:'#3b82f6'}}>PRO</span></b>
          <div style={{fontSize:'10px', background:'#1e293b', padding:'5px 10px', borderRadius:'20px', color:'#3b82f6'}}>WEB & CODE ACTIVE</div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          {messages.map((m, i) => (
            <div key={i} style={s.msg(m.role)}>
              {m.text}
              {m.code && (
                <div style={s.codeBox}>
                  <div style={{fontSize:'10px', color:'#64748b', marginBottom:'10px'}}>GUI PREVIEW:</div>
                  <div dangerouslySetInnerHTML={{ __html: m.code }} />
                </div>
              )}
            </div>
          ))}
          {isTyping && <div style={{color: '#3b82f6', fontSize: '12px', paddingLeft: '10px'}} className="pulse">Neural Processing...</div>}
          <div ref={chatEnd} />
        </div>
        <div style={{ padding: '20px', display: 'flex', gap: '10px', background: '#0f172a' }}>
          <input style={{flex: 1, background: '#1e293b', border: '1px solid #334155', padding: '15px', borderRadius: '15px', color: 'white', outline: 'none'}} 
            value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask Trevor to code a button or search for weather..." />
          <button onClick={handleSend} style={{background: '#3b82f6', color:'white', border: 'none', padding: '0 25px', borderRadius: '15px', fontWeight: 'bold', cursor:'pointer'}}>SEND</button>
        </div>
      </div>
    </div>
  );
}
