"use client";
import { useState, useRef, useEffect } from 'react';
import { TrevorEngine } from '../lib/trevorEngine';

export default function Page() {
  // --- STATE MANAGEMENT ---
  const [messages, setMessages] = useState([
    { role: 'trevor', text: "SYSTEMS ONLINE. Trevor Pro 7.5 (Llama-3.2 Engine) is active. \n\nI can now code complex 3D animations and GUI components instantly. What shall we build? 🧠🚀" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  
  const trevor = useRef(new TrevorEngine());
  const chatEnd = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // --- CORE LOGIC ---
  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userText = input;
    setInput("");
    setErrorStatus(null);
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setIsTyping(true);

    try {
      // We await the engine which now hits the faster Llama-3.2-3B model
      const response = await trevor.current.getResponse(userText);
      
      if (response && response.text) {
        setMessages(prev => [...prev, { 
          role: "trevor", 
          text: response.text, 
          code: response.code 
        }]);
      } else {
        throw new Error("Empty Response from Neural Core");
      }
    } catch (err) {
      console.error("Link Error:", err);
      setErrorStatus("CONNECTION_TIMEOUT");
      setMessages(prev => [...prev, { 
        role: "trevor", 
        text: "⚠️ NEURAL LINK FAILURE: Vercel or the AI server timed out. This usually happens on mobile data. Tap the button below to retry the last command." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // --- UI STYLES ---
  const s = {
    main: { backgroundColor: '#020617', minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '10px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
    container: { width: '100%', maxWidth: '700px', backgroundColor: '#0f172a', borderRadius: '28px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', height: '92vh', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' },
    header: { padding: '15px 20px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a' },
    chatArea: { flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', scrollBehavior: 'smooth' },
    bubble: (role) => ({
      alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
      backgroundColor: role === 'user' ? '#2563eb' : '#1e293b',
      padding: '16px 20px', borderRadius: '22px', color: 'white', maxWidth: '88%', fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap',
      border: role === 'trevor' ? '1px solid #334155' : 'none',
      boxShadow: role === 'user' ? '0 4px 15px rgba(37, 99, 235, 0.3)' : 'none'
    }),
    codeBox: { marginTop: '15px', padding: '20px', background: '#020617', borderRadius: '18px', border: '1px solid #3b82f6', overflow: 'hidden', position: 'relative' },
    inputBar: { padding: '20px', background: '#0f172a', borderTop: '1px solid #1e293b', display: 'flex', gap: '10px' },
    input: { flex: 1, background: '#1e293b', border: '1px solid #334155', padding: '15px', borderRadius: '16px', color: 'white', fontSize: '16px', outline: 'none' },
    btn: { background: '#3b82f6', color: 'white', border: 'none', padding: '0 25px', borderRadius: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.2s' }
  };

  return (
    <div style={s.main}>
      <div style={s.container}>
        {/* HEADER */}
        <div style={s.header}>
          <div>
            <b style={{ color: 'white', fontSize: '18px', letterSpacing: '1px' }}>TREVOR <span style={{color:'#3b82f6'}}>ULTRA</span></b>
            <div style={{ fontSize: '9px', color: '#10b981', fontWeight: 'bold' }}>● LLAMA-3.2_CORE_ACTIVE</div>
          </div>
          {isTyping && <div style={{ fontSize: '10px', color: '#3b82f6', animation: 'pulse 1s infinite' }}>THINKING...</div>}
        </div>

        {/* CHAT AREA */}
        <div style={s.chatArea}>
          {messages.map((m, i) => (
            <div key={i} style={s.bubble(m.role)}>
              {m.text}
              {m.code && (
                <div style={s.codeBox}>
                  <div style={{ fontSize: '9px', color: '#64748b', marginBottom: '10px', textTransform: 'uppercase' }}>Live GUI Component</div>
                  <div dangerouslySetInnerHTML={{ __html: m.code }} />
                </div>
              )}
            </div>
          ))}
          <div ref={chatEnd} />
        </div>

        {/* INPUT AREA */}
        <div style={s.inputBar}>
          <input 
            style={s.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe any object or animation..."
          />
          <button 
            style={s.btn} 
            onClick={handleSend}
            disabled={isTyping}
          >
            {isTyping ? '...' : 'SEND'}
          </button>
        </div>
      </div>

      {/* Global CSS for Animations */}
      <style jsx global>{`
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}</style>
    </div>
  );
}
