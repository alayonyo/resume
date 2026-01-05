import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';
import { getChatApiUrl, API_CONFIG } from '../config/api';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatWidgetProps {
  onMessageSent?: (message: string) => void;
  botName?: string;
  welcomeMessage?: string;
  placeholder?: string;
  theme?: 'light' | 'dark';
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  onMessageSent,
  botName = 'Assistant',
  welcomeMessage = "Hi! I'm here to help you learn more about Yonatan. Feel free to ask about his experience, skills, or download his resume!",
  placeholder = 'Ask me about Yonatan...',
  theme = 'light',
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: welcomeMessage,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = inputValue.trim();
    setInputValue('');

    // Call the optional callback
    if (onMessageSent) {
      onMessageSent(messageText);
    }

    // Show typing indicator
    setIsTyping(true);

    try {
      // Call actual chat API
      const response = await fetch(getChatApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: API_CONFIG.HEADERS.ORIGIN,
        },
        credentials: 'include',
        body: JSON.stringify({
          message: messageText,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'Sorry, I could not process your message.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Chat API error:', error);

      // Fallback error message
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting to the chat service. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`chat-widget ${theme}`}>
      <div className='chat-header'>
        <div className='chat-title'>
          <div className='bot-avatar'>🤖</div>
          <div>
            <h3>{botName}</h3>
            <span className='status'>Online</span>
          </div>
        </div>
      </div>

      <div className='chat-messages'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.sender === 'user' ? 'user-message' : 'bot-message'
            }`}
          >
            <div className='message-content'>{message.text}</div>
            <div className='message-time'>{formatTime(message.timestamp)}</div>
          </div>
        ))}

        {isTyping && (
          <div className='message bot-message'>
            <div className='message-content typing-indicator'>
              <div className='typing-dots'>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className='chat-input'>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className='message-input'
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
          className='send-button'
        >
          📤
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
