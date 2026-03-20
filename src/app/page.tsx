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

  // UI STYLES - Hardcoded so they can't break
  const styles = {
    container: { backgroundColor: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif' },
    card: { width: '100%', maxWidth: '450px', backgroundColor: '#0f172a', borderRadius: '24px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', height: '85vh', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' },
    header: { padding: '20px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    chatArea: { flex: 1, overflowY: 'auto' as const, padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' },
    userBubble: { maxWidth: '85%', padding: '12px 16px', borderRadius: '16px', fontSize: '14px', backgroundColor: '#3b82f6', color: 'white', alignSelf: 'flex-end', borderBottomRightRadius: '4px' },
    trevorBubble: { maxWidth: '85%', padding: '12px 16px', borderRadius: '16px', fontSize: '14px', backgroundColor: '#1e293b', color: 'white', alignSelf: 'flex-start', borderBottomLeftRadius: '4px', border: '1px solid #334155' },
    inputArea: { padding: '20px', borderTop: '1px solid #1e293b' },
    inputWrapper: { display: 'flex', gap: '8px', backgroundColor: '#1e293b', padding: '4px', borderRadius: '14px' },
    inputField: { flex: 1, background: 'transparent', border: 'none', padding: '10px', color: 'white', outline: 'none' },
    sendBtn: { backgroundColor: 'white', color: 'black', border: 'none', padding: '0 16px', borderRadius: '10px', fontWeight: 'bold' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: '900' }}>TREVOR <span style={{ color: '#3b82f6' }}>AI</span></h1>
          <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>SMARTER V2</span>
        </div>
        <div style={styles.chatArea}>
          {messages.map((m, i) => (
            <div key={i} style={m.role === 'user' ? styles.userBubble : styles.trevorBubble}>
              {m.text}
            </div>
          ))}
          {isTyping && <div style={{ color: '#64748b', fontSize: '12px' }}>Trevor is thinking...</div>}
          <div ref={chatEnd} />
        </div>
        <div style={styles.inputArea}>
          <div style={styles.inputWrapper}>
            <input 
              style={styles.inputField}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Teach Trevor..."
            />
            <button onClick={handleSend} style={styles.sendBtn}>SEND</button>
          </div>
        </div>
      </div>
    </div>
  );
}
