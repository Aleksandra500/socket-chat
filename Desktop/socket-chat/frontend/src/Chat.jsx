import { useEffect, useState, useRef } from "react";
import { getMessages, sendMessage } from "./services/messageService";
import UserComponents from "./components/UserComponents";

export default function ChatPage({ currentUser, onSelectUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMessage = { sender: currentUser, text };
    try {
      const saved = await sendMessage(newMessage);
      setMessages((prev) => [...prev, saved]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-full min-h-[calc(100vh-2rem)] gap-4 p-2 sm:p-4">
      {/* Sidebar */}
      <div className="w-full sm:w-64 bg-indigo-50 p-4 rounded-2xl shadow-inner flex-shrink-0 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-indigo-800">👥 Users</h2>
        <UserComponents currentUser={currentUser} onSelectUser={onSelectUser} />
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col bg-purple-50 p-4 rounded-2xl shadow-inner">
        <h1 className="text-2xl font-bold text-center mb-4 text-purple-700">💬 Global Chat</h1>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-white rounded-2xl shadow-inner flex flex-col gap-2">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center mt-auto mb-auto">Nema poruka još 😄</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id || msg.timestamp}
                className={`p-3 max-w-[70%] rounded-xl shadow break-words ${
                  msg.sender === currentUser ? "bg-blue-200 self-end" : "bg-gray-200 self-start"
                }`}
              >
                <strong className="text-blue-800">{msg.sender}:</strong>{" "}
                <span>{msg.text}</span>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="flex gap-2 mt-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Unesi poruku..."
            className="flex-1 border rounded-full p-3 text-base outline-none shadow-md"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-2 shadow-md text-base"
          >
            Pošalji
          </button>
        </form>
      </div>
    </div>
  );
}
