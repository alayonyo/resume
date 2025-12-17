// Chat Widget Module Federation Entry Point
// Simple static chat widget - React component
function ChatButton(props) {
  // Get React from the host application or use a fallback
  const React = window.React || props.React;

  if (!React) {
    console.error(
      'React is not available. The chat widget requires React to function.'
    );
    return null;
  }

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleChat = function () {
    setIsOpen(!isOpen);
    console.log('Chat widget toggled:', !isOpen);
    if (props.onMessageSent) {
      props.onMessageSent('Chat opened from microfrontend!');
    }
  };

  return React.createElement(
    'div',
    {
      style: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
      },
      key: 'chat-widget',
    },
    [
      isOpen &&
        React.createElement(
          'div',
          {
            style: {
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
            },
            key: 'widget-container',
          },
          [
            React.createElement(
              'div',
              {
                style: {
                  padding: '16px',
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '12px 12px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                },
                key: 'header',
              },
              [
                React.createElement(
                  'div',
                  {
                    style: {
                      fontSize: '24px',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                    },
                    key: 'avatar',
                  },
                  '🤖'
                ),
                React.createElement('div', { key: 'title' }, [
                  React.createElement(
                    'h3',
                    {
                      key: 'name',
                      style: { margin: 0, fontSize: '16px', fontWeight: 600 },
                    },
                    props.botName || 'Resume Assistant'
                  ),
                  React.createElement(
                    'span',
                    {
                      key: 'status',
                      style: { fontSize: '12px', opacity: 0.8 },
                    },
                    'Online (Microfrontend)'
                  ),
                ]),
              ]
            ),
            React.createElement(
              'div',
              {
                style: {
                  flex: 1,
                  overflowY: 'auto',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                },
                key: 'messages',
              },
              React.createElement(
                'div',
                {
                  style: {
                    maxWidth: '80%',
                    alignSelf: 'flex-start',
                  },
                },
                React.createElement(
                  'div',
                  {
                    style: {
                      padding: '12px 16px',
                      borderRadius: '18px',
                      background: '#f1f3f4',
                      color: '#333',
                      borderBottomLeftRadius: '4px',
                      wordWrap: 'break-word',
                      lineHeight: 1.4,
                    },
                  },
                  props.welcomeMessage ||
                    '🎉 Success! This chat widget is loaded as a microfrontend from port 3001!'
                )
              )
            ),
          ]
        ),
      React.createElement(
        'button',
        {
          style: {
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
          },
          onClick: toggleChat,
          key: 'button',
        },
        isOpen ? '✕' : props.buttonText || '💬'
      ),
    ]
  );
}

// Module Federation interface
window.chatWidget = {
  get: function (module) {
    console.log('🔍 Module requested:', module);
    if (module === './ChatButton') {
      return Promise.resolve(function () {
        console.log('📦 Returning ChatButton module');
        return {
          default: ChatButton,
        };
      });
    }
    return Promise.reject(new Error('Module not found: ' + module));
  },
};

console.log('✅ Chat widget microfrontend loaded successfully!');
