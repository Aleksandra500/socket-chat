import { useEffect, useState } from "react";
import { getMessages, sendMessage } from "../services/messageService";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sender, setSender] = useState("Aleksandra 😊"); // kasnije ćeš ovo zameniti loginom


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages();
        setMessages(data);
      } catch (error) {
        console.error("Greška pri dohvatanju poruka:", error);
      }
    };

    fetchMessages();
  }, []);


  const handleSend = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    const newMessage = { sender, text };

    try {
      const saved = await sendMessage(newMessage);
      setMessages((prev) => [...prev, saved]);
      setText("");
    } catch (error) {
      console.error("Greška pri slanju poruke:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto p-4 bg-gray-100">
      <h1 className="text-2xl font-semibold text-center mb-4">💬 Chat App</h1>

      {/* Lista poruka */}
      <div className="flex-1 overflow-y-auto mb-4 p-3 bg-white rounded-xl shadow">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">Nema poruka još 😄</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id || msg.timestamp} className="mb-2">
              <strong>{msg.sender}:</strong> <span>{msg.text}</span>
            </div>
          ))
        )}
      </div>

   
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Unesi poruku..."
          className="flex-1 border rounded-xl p-2 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4"
        >
          Pošalji
        </button>
      </form>
    </div>
  );
}

export default Chat;
