/**
 * Project Context - Analytics Module
 * Centralized analytics initialization for projectcontext.org
 * 
 * Usage: Import and call from nav-component.js
 *   import { initAnalytics } from '/assets/js/analytics.js';
 *   initAnalytics();
 * 
 * Version: 1.0
 */

const GA_MEASUREMENT_ID = 'G-YXW4310W34';

let analyticsInitialized = false;

export function initAnalytics() {
  // Prevent double initialization
  if (analyticsInitialized) return;
  analyticsInitialized = true;

  // --- Google Analytics 4 ---
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(gaScript);

  const gaInit = document.createElement('script');
  gaInit.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `;
  document.head.appendChild(gaInit);

  console.log('[Project Context] Analytics initialized');
}