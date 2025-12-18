import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

/**
 * Custom hook to check if specific URL parameters are set to "true"
 * @param paramNames - Array of URL parameter names to check
 * @returns Array of booleans - true if the parameter value is "true", false otherwise
 *
 * @example
 * // Usage in a component
 * const [showChatWidget, isDevMode] = useDevFeatures(['chat_widget', 'dev_mode']);
 * // URL: http://localhost:3500?chat_widget=true&dev_mode=false
 * // Returns: [true, false]
 *
 * @example
 * // URL: http://localhost:3500?chat_widget=true
 * // Returns: [true, false]
 */
export const useDevFeatures = (paramNames: string[]): boolean[] => {
  const router = useRouter();

  // Initialize with false to match SSR render
  const [featureFlags, setFeatureFlags] = useState<boolean[]>(
    paramNames.map(() => false)
  );

  useEffect(() => {
    // Only run on client after hydration
    if (typeof window === 'undefined') return;

    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);

    // Check each parameter and return true only if its value is "true"
    const flags = paramNames.map((paramName) => {
      const value = params.get(paramName);
      return value === 'true';
    });

    setFeatureFlags(flags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]); // Only depend on router.query, paramNames is constant in practice

  return featureFlags;
};
