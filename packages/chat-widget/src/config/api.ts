/**
 * Chat Widget API Configuration
 * Centralized configuration for API endpoints
 *
 * Import runtime config directly from runtime-config.js
 * Edit runtime-config.js to change API URL without touching TypeScript
 */

import { CHAT_CONFIG } from './runtime-config.js';

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
 * Uses imported CHAT_CONFIG for easy updates (edit runtime-config.js)
 */
export const getChatApiUrl = (): string => {
  // Use runtime config if available
  if (CHAT_CONFIG?.apiUrl) {
    return CHAT_CONFIG.apiUrl;
  }

  // Fallback to built-in config
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    (typeof window !== 'undefined' &&
      !window.location.hostname.includes('localhost'));

  return isProduction
    ? API_CONFIG.CHAT_API.PRODUCTION
    : API_CONFIG.CHAT_API.DEVELOPMENT;
};
