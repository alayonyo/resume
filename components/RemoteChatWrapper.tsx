import React, { useEffect, useState, Suspense } from 'react';
import ReactDOM from 'react-dom';

// Type definitions for the remote module
interface ChatButtonProps {
  onMessageSent?: (message: string) => void;
  botName?: string;
  welcomeMessage?: string;
  placeholder?: string;
  theme?: 'light' | 'dark';
  buttonText?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  buttonColor?: string;
  size?: 'small' | 'medium' | 'large';
}

// Fallback component while loading
const ChatButtonFallback = ({ isError = false }: { isError?: boolean }) => (
  <div
    style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: isError ? '#ff6b6b' : '#667eea',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '20px',
      cursor: 'pointer',
      zIndex: 1000,
      opacity: isError ? 0.7 : 0.5,
      transition: 'all 0.3s ease',
    }}
    title={
      isError
        ? 'Chat widget unavailable (microfrontend not running)'
        : 'Loading chat widget...'
    }
    onClick={() => {
      if (isError) {
        alert(
          'Chat widget is not available.\n\nThe chat widget server may not be running.\n\nTo start it:\n1. Open a terminal\n2. Run: cd packages/chat-widget/public && python3 -m http.server 3001\n3. Refresh this page'
        );
      }
    }}
  >
    {isError ? '⚠️' : '💬'}
  </div>
); // Runtime loader for the chat widget
// Simple inline chat widget as a fallback
const InlineChatWidget: React.FC<any> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text:
        props.welcomeMessage ||
        "Hi! I'm here to help you learn more about Yonatan. Feel free to ask about his experience, skills, or download his resume!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    if (props.onMessageSent) {
      props.onMessageSent(userMessage.text);
    }

    // Simple bot response
    setTimeout(() => {
      const responses = [
        "Thanks for your message! You can download Yonatan's resume using the buttons above.",
        "That's interesting! Yonatan has extensive experience in React and TypeScript.",
        "Great question! Feel free to check out Yonatan's LinkedIn or GitHub profiles.",
        'Thanks for reaching out! This chat widget demonstrates React component architecture.',
      ];

      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
      }}
    >
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '0',
            width: '350px',
            height: '500px',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            background: 'white',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '12px 12px 0 0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
              }}
            >
              🤖
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                {props.botName || 'Resume Assistant'}
              </h3>
              <span style={{ fontSize: '12px', opacity: 0.8 }}>Online</span>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.map((message: any) => (
              <div
                key={message.id}
                style={{
                  maxWidth: '80%',
                  alignSelf:
                    message.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '18px',
                    background:
                      message.sender === 'user'
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : '#f1f3f4',
                    color: message.sender === 'user' ? 'white' : '#333',
                    borderBottomRightRadius:
                      message.sender === 'user' ? '4px' : '18px',
                    borderBottomLeftRadius:
                      message.sender === 'bot' ? '4px' : '18px',
                    wordWrap: 'break-word',
                    lineHeight: 1.4,
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              borderTop: '1px solid #e0e0e0',
              gap: '12px',
            }}
          >
            <input
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={props.placeholder || 'Ask me about Yonatan...'}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: '20px',
                outline: 'none',
                fontSize: '14px',
                background: '#f8f9fa',
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              style={{
                width: '40px',
                height: '40px',
                border: 'none',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                opacity: inputValue.trim() ? 1 : 0.5,
              }}
            >
              📤
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px',
          height: '60px',
          border: 'none',
          borderRadius: '50%',
          backgroundColor: props.buttonColor || '#667eea',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease',
        }}
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
};

const useChatWidget = () => {
  const [ChatButton, setChatButton] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChatWidget = async () => {
      // Determine widget URL based on environment
      const isProduction =
        process.env.NODE_ENV === 'production' ||
        !window.location.hostname.includes('localhost');
      const widgetUrl = isProduction
        ? '/chat-widget/remoteEntry.js' // Production: same domain
        : 'http://localhost:3001/remoteEntry.js'; // Development: separate server

      console.log(
        `🔄 Loading chat widget from: ${widgetUrl} (${
          isProduction ? 'production' : 'development'
        } mode)`
      );

      try {
        // Make React and ReactDOM available globally BEFORE loading the widget
        // This ensures the chat widget uses the host's React instance
        if (typeof window !== 'undefined') {
          (window as any).React = React;
          (window as any).ReactDOM = ReactDOM;
          console.log('✅ React and ReactDOM exposed on window object');
        }

        // Check if the widget is available
        const response = await fetch(widgetUrl, {
          cache: 'no-cache',
        });

        if (!response.ok) {
          throw new Error(`Widget server responded with ${response.status}`);
        }

        console.log('✅ Chat widget found, loading module...');

        // Load the remote entry script
        const script = document.createElement('script');
        script.src = widgetUrl;
        script.onload = () => {
          console.log('📦 RemoteEntry script loaded');

          // Wait for script to execute
          setTimeout(() => {
            const chatWidget = (window as any).chatWidget;

            if (chatWidget) {
              console.log('🎯 ChatWidget found, loading ChatButton module...');
              chatWidget
                .get('./ChatButton')
                .then((factory: any) => {
                  const Module = factory();
                  setChatButton(() => Module.default);
                  setIsLoading(false);
                  console.log('🎉 Chat widget loaded successfully!');
                })
                .catch((err: any) => {
                  console.error('❌ Failed to load ChatButton module:', err);
                  console.log('🔄 Falling back to inline widget');
                  setChatButton(() => InlineChatWidget);
                  setIsLoading(false);
                });
            } else {
              console.warn('❌ Chat widget not found, using inline fallback');
              setChatButton(() => InlineChatWidget);
              setIsLoading(false);
            }
          }, 100);
        };

        script.onerror = () => {
          console.error(
            '❌ Failed to load chat widget script, using inline fallback'
          );
          setChatButton(() => InlineChatWidget);
          setIsLoading(false);
        };

        document.head.appendChild(script);
      } catch (err) {
        console.warn('⚠️ Chat widget unavailable, using inline fallback:', err);
        setChatButton(() => InlineChatWidget);
        setIsLoading(false);
      }
    };

    loadChatWidget();
  }, []);

  return { ChatButton, isLoading, error };
};

interface RemoteChatWrapperProps extends ChatButtonProps {}

const RemoteChatWrapper: React.FC<RemoteChatWrapperProps> = (props) => {
  const { ChatButton, isLoading, error } = useChatWidget();

  const handleMessageSent = (message: string) => {
    console.log('Message sent from chat widget:', message);
    // You can add analytics or other handling here
    if (props.onMessageSent) {
      props.onMessageSent(message);
    }
  };

  if (isLoading) {
    return <ChatButtonFallback />;
  }

  if (error || !ChatButton) {
    console.log('Using fallback chat button due to:', error);
    return <ChatButtonFallback isError={true} />;
  }

  const chatProps = {
    ...props,
    onMessageSent: handleMessageSent,
    botName: props.botName || 'Resume Assistant',
    welcomeMessage:
      props.welcomeMessage ||
      "Hi! I'm here to help you learn more about Yonatan. Feel free to ask about his experience, skills, or download his resume!",
    placeholder: props.placeholder || 'Ask me about Yonatan...',
    theme: props.theme || 'light',
    position: props.position || 'bottom-right',
    size: props.size || 'medium',
    buttonColor: props.buttonColor || '#667eea',
  };

  return (
    <Suspense fallback={<ChatButtonFallback />}>
      <ChatButton {...chatProps} />
    </Suspense>
  );
};

export default RemoteChatWrapper;
