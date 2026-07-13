/* Global type augmentation for Cantina Virtual */

interface Window {
  __cv_cookie_consent?: string;
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}