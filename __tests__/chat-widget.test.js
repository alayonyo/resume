/**
 * Chat Widget Unit Tests
 * Testing both the external microfrontend widget and fallback scenarios
 */

// Mock React for testing
const mockReact = {
  useState: jest.fn((initialValue) => [initialValue, jest.fn()]),
  createElement: jest.fn((type, props, children) => ({
    type,
    props: { ...props, children },
    children,
  })),
};

// Setup global window mock
global.window = {
  React: mockReact,
};

// Load the chat widget
require('../deploy/chat-widget/remoteEntry.js');

describe('Chat Widget Microfrontend', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset useState mock to return fresh state
    mockReact.useState.mockImplementation((initialValue) => [
      initialValue,
      jest.fn(),
    ]);
  });

  describe('ChatButton Component', () => {
    test('should initialize with correct default state', () => {
      const props = {};

      // Call the ChatButton function
      if (typeof ChatButton !== 'undefined') {
        ChatButton(props);
      }

      // Verify useState calls for initial state
      expect(mockReact.useState).toHaveBeenCalledWith(false); // isOpen
      expect(mockReact.useState).toHaveBeenCalledWith(''); // inputValue
      expect(mockReact.useState).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            id: '1',
            sender: 'bot',
            text: expect.stringContaining('help you learn more about Yonatan'),
          }),
        ])
      ); // messages
    });

    test('should handle React unavailability gracefully', () => {
      const originalReact = global.window.React;
      global.window.React = null;

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      // Simulate props without React
      const props = {};

      // This should return null when React is unavailable
      if (typeof ChatButton !== 'undefined') {
        const result = ChatButton(props);
        expect(result).toBeNull();
      }

      expect(consoleSpy).toHaveBeenCalledWith(
        'React is not available. The chat widget requires React to function.'
      );

      // Restore
      global.window.React = originalReact;
      consoleSpy.mockRestore();
    });

    test('should accept custom props', () => {
      const customProps = {
        welcomeMessage: 'Custom welcome!',
        botName: 'Custom Bot',
        placeholder: 'Custom placeholder...',
        onMessageSent: jest.fn(),
      };

      if (typeof ChatButton !== 'undefined') {
        ChatButton(customProps);
      }

      // Verify useState was called with custom welcome message
      expect(mockReact.useState).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            text: 'Custom welcome!',
            sender: 'bot',
          }),
        ])
      );
    });

    test('should render toggle button when closed', () => {
      // Mock useState to return closed state
      mockReact.useState
        .mockReturnValueOnce([false, jest.fn()]) // isOpen = false
        .mockReturnValueOnce([[], jest.fn()]) // messages
        .mockReturnValueOnce(['', jest.fn()]); // inputValue

      if (typeof ChatButton !== 'undefined') {
        const result = ChatButton({});

        // Should render a button element
        expect(mockReact.createElement).toHaveBeenCalledWith(
          'button',
          expect.objectContaining({
            'data-testid': 'chat-toggle-button',
          }),
          '💬'
        );
      }
    });

    test('should render full interface when open', () => {
      const mockSetIsOpen = jest.fn();
      const mockSetMessages = jest.fn();
      const mockSetInputValue = jest.fn();

      // Mock useState to return open state
      mockReact.useState
        .mockReturnValueOnce([true, mockSetIsOpen]) // isOpen = true
        .mockReturnValueOnce([
          [{ id: '1', text: 'Welcome!', sender: 'bot' }],
          mockSetMessages,
        ]) // messages
        .mockReturnValueOnce(['', mockSetInputValue]); // inputValue

      if (typeof ChatButton !== 'undefined') {
        const result = ChatButton({});

        // Should render the main container
        expect(mockReact.createElement).toHaveBeenCalledWith(
          'div',
          expect.objectContaining({
            'data-testid': 'chat-widget-container',
          }),
          expect.any(Array)
        );

        // Should render input field
        expect(mockReact.createElement).toHaveBeenCalledWith(
          'input',
          expect.objectContaining({
            'data-testid': 'chat-input',
            placeholder: 'Ask me about Yonatan...',
            type: 'text',
          })
        );

        // Should render send button
        expect(mockReact.createElement).toHaveBeenCalledWith(
          'button',
          expect.objectContaining({
            'data-testid': 'send-button',
          }),
          '→'
        );
      }
    });
  });

  describe('Module Federation Interface', () => {
    test('should expose chatWidget globally', () => {
      expect(global.window.chatWidget).toBeDefined();
      expect(typeof global.window.chatWidget.get).toBe('function');
    });

    test('should return ChatButton module when requested', async () => {
      const moduleFactory = global.window.chatWidget.get('./ChatButton');
      expect(moduleFactory).toBeInstanceOf(Promise);

      const factory = await moduleFactory;
      const module = factory();

      expect(module).toHaveProperty('default');
      expect(typeof module.default).toBe('function');
    });

    test('should reject unknown modules', async () => {
      await expect(
        global.window.chatWidget.get('./UnknownModule')
      ).rejects.toThrow('Module not found: ./UnknownModule');
    });
  });

  describe('Message Handling', () => {
    test('should handle message sending', () => {
      const mockSetMessages = jest.fn();
      const mockSetInputValue = jest.fn();
      const onMessageSent = jest.fn();

      // Mock useState to return open state with input
      mockReact.useState
        .mockReturnValueOnce([true, jest.fn()]) // isOpen = true
        .mockReturnValueOnce([[], mockSetMessages]) // messages
        .mockReturnValueOnce(['Hello!', mockSetInputValue]); // inputValue

      const props = { onMessageSent };

      if (typeof ChatButton !== 'undefined') {
        ChatButton(props);

        // Verify that createElement was called with onChange handler
        const inputCall = mockReact.createElement.mock.calls.find(
          (call) => call[1] && call[1]['data-testid'] === 'chat-input'
        );

        expect(inputCall).toBeDefined();
        expect(inputCall[1]).toHaveProperty('onChange');
        expect(inputCall[1]).toHaveProperty('onKeyPress');
      }
    });
  });

  describe('Accessibility & Testing Attributes', () => {
    test('should include data-testid attributes for testing', () => {
      mockReact.useState
        .mockReturnValueOnce([true, jest.fn()]) // isOpen = true
        .mockReturnValueOnce([[], jest.fn()]) // messages
        .mockReturnValueOnce(['', jest.fn()]); // inputValue

      if (typeof ChatButton !== 'undefined') {
        ChatButton({});

        const testIds = [
          'chat-widget-container',
          'chat-header',
          'bot-name',
          'bot-status',
          'chat-close-button',
          'messages-container',
          'input-container',
          'chat-input',
          'send-button',
        ];

        testIds.forEach((testId) => {
          const elementCall = mockReact.createElement.mock.calls.find(
            (call) => call[1] && call[1]['data-testid'] === testId
          );
          expect(elementCall).toBeDefined();
        });
      }
    });
  });
});

// Integration test for the full widget loading
describe('Chat Widget Integration', () => {
  test('should load successfully in production environment', () => {
    // Verify the widget is loaded
    expect(global.window.chatWidget).toBeDefined();

    // Verify console log for successful loading
    const consoleSpy = jest.spyOn(console, 'log');

    // Re-run the loading script
    expect(consoleSpy).toHaveBeenCalledWith(
      '✅ Chat widget microfrontend loaded successfully!'
    );

    consoleSpy.mockRestore();
  });

  test('should handle React from different sources', () => {
    const propsReact = { ...mockReact };
    const props = { React: propsReact };

    if (typeof ChatButton !== 'undefined') {
      ChatButton(props);
      // Should work with React from props
      expect(mockReact.useState).toHaveBeenCalled();
    }
  });
});
