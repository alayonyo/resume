/**
 * Chat Widget Runtime Configuration
 * Checks for external config.js file first (for easy production updates)
 * Falls back to bundled defaults if not available
 */

// Default configuration (bundled)
const DEFAULT_CONFIG = {
  apiUrl: 'https://mcp-resume-acqopagtp-alayonyos-projects.vercel.app/api/chat',
  headers: {
    origin: 'https://yonatan-ayalon.com',
  },
};

/**
 * Get runtime configuration
 * Priority: window.CHAT_WIDGET_RUNTIME_CONFIG (from external config.js) > DEFAULT_CONFIG
 */
function getRuntimeConfig() {
  if (typeof window !== 'undefined' && window.CHAT_WIDGET_RUNTIME_CONFIG) {
    return window.CHAT_WIDGET_RUNTIME_CONFIG;
  }
  return DEFAULT_CONFIG;
}

export const CHAT_CONFIG = getRuntimeConfig();
