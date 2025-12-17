import React, { useState } from 'react';
import ChatWidget, { ChatWidgetProps } from './ChatWidget';
import './ChatButton.css';

export interface ChatButtonProps extends ChatWidgetProps {
  buttonText?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  buttonColor?: string;
  size?: 'small' | 'medium' | 'large';
}

const ChatButton: React.FC<ChatButtonProps> = ({
  buttonText = '💬',
  position = 'bottom-right',
  buttonColor = '#667eea',
  size = 'medium',
  ...chatWidgetProps
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'chat-container-bottom-left';
      case 'top-right':
        return 'chat-container-top-right';
      case 'top-left':
        return 'chat-container-top-left';
      default:
        return 'chat-container-bottom-right';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'chat-button-small';
      case 'large':
        return 'chat-button-large';
      default:
        return 'chat-button-medium';
    }
  };

  return (
    <div className={`chat-container ${getPositionClasses()}`}>
      {isOpen && (
        <div
          className={`chat-widget-container ${
            position.includes('top') ? 'chat-widget-above' : 'chat-widget-below'
          }`}
        >
          <ChatWidget {...chatWidgetProps} />
        </div>
      )}

      <button
        className={`chat-toggle-button ${getSizeClasses()} ${
          isOpen ? 'chat-button-open' : ''
        }`}
        onClick={toggleChat}
        style={{ backgroundColor: buttonColor }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '✕' : buttonText}
      </button>
    </div>
  );
};

export default ChatButton;
