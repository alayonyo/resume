/**
 * Chat Widget API Configuration
 * Centralized configuration for API endpoints
 */

export const API_CONFIG = {
  // MCP Chat API URLs
  CHAT_API: {
    PRODUCTION:
      'https://mcp-resume-acqopagtp-alayonyos-projects.vercel.app/api/chat',
    DEVELOPMENT: 'http://localhost:3000/api/chat',
  },

  // API Headers
  HEADERS: {
    ORIGIN: 'https://yonatan-ayalon.com',
  },
} as const;

/**
 * Get the appropriate chat API URL based on environment
 */
export const getChatApiUrl = (): string => {
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    (typeof window !== 'undefined' &&
      !window.location.hostname.includes('localhost'));

  return isProduction
    ? API_CONFIG.CHAT_API.PRODUCTION
    : API_CONFIG.CHAT_API.DEVELOPMENT;
};
