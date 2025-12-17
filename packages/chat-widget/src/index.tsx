import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from './components/ChatWidget';
import ChatButton from './components/ChatButton';

// Export components for module federation
export { default as ChatWidget } from './components/ChatWidget';
export { default as ChatButton } from './components/ChatButton';
export type { Message, ChatWidgetProps } from './components/ChatWidget';
export type { ChatButtonProps } from './components/ChatButton';

// For standalone development
if (typeof window !== 'undefined' && document.getElementById('root')) {
  const root = ReactDOM.createRoot(document.getElementById('root')!);

  // Demo component for standalone development
  const App = () => {
    const handleMessageSent = (message: string) => {
      console.log('Message sent:', message);
    };

    return (
      <div style={{ padding: '20px' }}>
        <h1>Chat Widget - Standalone Development</h1>
        <p>
          This is the standalone development environment for the chat widget.
        </p>

        <div style={{ marginBottom: '40px' }}>
          <h2>Inline Chat Widget:</h2>
          <ChatWidget
            onMessageSent={handleMessageSent}
            botName='Demo Bot'
            welcomeMessage="Hi! I'm the demo chat bot. Try sending me a message!"
            placeholder='Type something...'
            theme='light'
          />
        </div>

        <div>
          <h2>Chat Button (Bottom Right):</h2>
          <p>Look at the bottom-right corner for the floating chat button.</p>
          <ChatButton
            onMessageSent={handleMessageSent}
            botName='Assistant'
            welcomeMessage="Hello! How can I help you with Yonatan's resume?"
            position='bottom-right'
            size='medium'
          />
        </div>
      </div>
    );
  };

  root.render(<App />);
}
