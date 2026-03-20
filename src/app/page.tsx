"use client";
import { useState } from 'react';
import { TrevorEngine } from '@/lib/trevorEngine';

export default function TrevorChat() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const trevor = new TrevorEngine();

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: "User", text: input };
    const trevorMsg = { role: "Trevor", text: trevor.getResponse(input) };

    setMessages([...messages, userMsg, trevorMsg]);
    setInput("");
  };

  return (
    <main className="max-w-2xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Trevor AI</h1>
      <div className="border rounded-lg h-96 overflow-y-auto p-4 mb-4 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.role === 'Trevor' ? 'text-green-700' : 'text-gray-800'}`}>
            <strong>{m.role}:</strong> {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input 
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Talk to Trevor..."
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Send
        </button>
      </div>
    </main>
  );
}
