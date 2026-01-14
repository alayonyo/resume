/**
 * Chat Widget API Configuration
 * Centralized configuration for API endpoints
 *
 * Import runtime config directly from runtime-config.js
 * Edit runtime-config.js to change API URL without touching TypeScript
 */

import { CHAT_CONFIG } from './runtime-config.js';

// Export CHAT_CONFIG for direct access
export { CHAT_CONFIG };

/**
 * Get the chat API URL from runtime configuration
 */
export const getChatApiUrl = (): string => {
  return CHAT_CONFIG.apiUrl;
};

/**
 * Get the origin header from runtime configuration
 */
export const getOriginHeader = (): string => {
  return CHAT_CONFIG.headers.origin;
};
