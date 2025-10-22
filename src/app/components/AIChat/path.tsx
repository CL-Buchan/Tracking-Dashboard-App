import { useState, useRef, useEffect } from "react";

type Message = {
  role: 'user' | 'system';
  content: string;
};

export default function Chat() {

  // Use state to to hold current messages and input set... to update those messages and input arrays
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Runs when messages is rendered
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  {/* Messages at the end is the dependency... onChange update useEffect()*/}

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]); // add user message
    setInput('');

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data: { text: string } = await res.json();

      if (data.text) {
        
        // prev is current state of messages in useState(). (...prev is all previous
        setMessages(prev => [...prev, { role: 'system', content: data.text }]);
      }

    } catch (err) {
      console.error(err);

      setMessages(prev => [...prev, { role: 'system', content: 'Error: failed to get response.' }]);
    }
  };

  return (
    <div>
      <span className="flex flex-row gap-5 items-center">
        <h2 className="pb-10">Chat</h2>
      </span>

      <div className="flex flex-col gap-8 bg-[#e9ecef] rounded-3xl overflow-y-scroll overflow-" style={{ height: 300, padding: 30 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <span className="flex flex-row gap-5 mt-8 justify-center items-center">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          style={{ width: '80%', marginRight: '10px' }}
          className="pt-2 pb-2 pl-4 pr-4 rounded-2xl bg-[#e9ecef] hover:bg-[#f8f9fa] duration-500 ease-in-out focus:outline-0"
        />
        <button
          onClick={sendMessage}
          className="p-3 hover:text-[#6c757d] hover:underline hover:underline-offset-4 hover:scale-105 duration-500 rounded-2xl"
        >
          Send
        </button>
      </span>
    </div>
  );
}
