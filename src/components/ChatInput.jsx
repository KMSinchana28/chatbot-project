import { useState } from 'react';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function getBotResponse(text) {
    const msg = text.toLowerCase();

    if (msg.includes('hello')) {
      return 'Hello! How can I help you?';
    }

    if (msg.includes('date')) {
      return `Today is ${new Date().toDateString()}`;
    }

    if (msg.includes('time')) {
      return `Current time is ${new Date().toLocaleTimeString()}`;
    }

    return "Sorry, I didn't understand that ";
  }

  function sendMessage() {
    if (!inputText.trim()) return;

    const userMessage = {
      message: inputText,
      sender: 'user',
      id: crypto.randomUUID()
    };

    const botMessage = {
      message: getBotResponse(inputText),
      sender: 'robot',
      id: crypto.randomUUID()
    };

    setChatMessages([
      ...chatMessages,
      userMessage,
      botMessage
    ]);

    setInputText('');
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >
        Send
      </button>
    </div>
  );
}
