/**
 * Hub Initializer
 * Path: /assets/js/hub-init.js
 * Purpose: Auto-detects and initializes the appropriate hub (characters or women)
 * Version: 1.0.0
 */

import HubCore from './hub-core.js';

// Detect which hub we're in based on body class
const isWomenHub = document.body.classList.contains('women-hub');

// Initialize with appropriate settings
const hub = new HubCore({
    type: isWomenHub ? 'women' : 'characters',
    filterGender: isWomenHub ? 'female' : null
});

// Make hub available globally for debugging
window.hub = hub;

// Log initialization
console.log(`✓ Initialized ${isWomenHub ? 'Women in the Bible' : 'Biblical Characters'} Hub`);

// Also initialize common hub functionality if available
import('./hub-common.js')
    .then(module => {
        console.log('✓ Hub common utilities loaded');
    })
    .catch(err => {
        console.warn('Hub common utilities not found or failed to load:', err);
    });

// Export the hub instance in case other modules need it
export default hub;