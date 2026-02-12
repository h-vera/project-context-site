/**
 * Project Context - Analytics Module
 * Path: /assets/js/analytics.js
 * Purpose: Centralized analytics initialization for projectcontext.org
 * 
 * Includes:
 *   - Google Analytics 4 (GA4)
 *   - Microsoft Clarity (heatmaps & session recordings)
 * 
 * Usage: Import and call from nav-component.js
 *   import { initAnalytics } from '/assets/js/analytics.js';
 *   initAnalytics();
 * 
 * Version: 1.1.0 - Added Microsoft Clarity
 */

const GA_MEASUREMENT_ID = 'G-YXW4310W34';
const CLARITY_PROJECT_ID = 'vgfd4xksju';

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

  // --- Microsoft Clarity ---
  const clarityScript = document.createElement('script');
  clarityScript.textContent = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
  `;
  document.head.appendChild(clarityScript);
}