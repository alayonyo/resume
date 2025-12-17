import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';

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
    setInputValue('');

    // Call the optional callback
    if (onMessageSent) {
      onMessageSent(userMessage.text);
    }

    // Simulate bot typing
    setIsTyping(true);

    // Simulate bot response (you can replace this with actual API call)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (userMessage: string): string => {
    const responses = [
      "Thanks for your message! I'm a demo bot for Yonatan's resume website.",
      "That's interesting! Feel free to explore Yonatan's experience and skills.",
      "I appreciate your interest! You can download Yonatan's resume using the buttons above.",
      'Great question! Yonatan has extensive experience in full-stack development.',
      'Thanks for reaching out! This chat widget demonstrates microfrontend architecture.',
    ];

    // Simple keyword-based responses
    if (userMessage.toLowerCase().includes('resume')) {
      return "You can download Yonatan's resume in PDF or DOCX format using the download buttons!";
    }
    if (userMessage.toLowerCase().includes('experience')) {
      return 'Yonatan has over 10 years of experience in software development, specializing in full-stack applications.';
    }
    if (userMessage.toLowerCase().includes('contact')) {
      return 'You can reach Yonatan through the contact information provided on the resume!';
    }

    return responses[Math.floor(Math.random() * responses.length)];
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
