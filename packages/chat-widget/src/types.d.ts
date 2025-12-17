declare module 'chatWidget/ChatWidget' {
  import { ComponentType } from 'react';
  
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

  const ChatWidget: ComponentType<ChatWidgetProps>;
  export default ChatWidget;
}

declare module 'chatWidget/ChatButton' {
  import { ComponentType } from 'react';
  import { ChatWidgetProps } from 'chatWidget/ChatWidget';

  export interface ChatButtonProps extends ChatWidgetProps {
    buttonText?: string;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    buttonColor?: string;
    size?: 'small' | 'medium' | 'large';
  }

  const ChatButton: ComponentType<ChatButtonProps>;
  export default ChatButton;
}