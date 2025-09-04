/**
 * Service Worker for Biblical Characters Hub
 * Path: /sw.js
 * Version: 1.0.0
 * Features: Offline support, caching, preloading, performance optimization
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `biblical-characters-${CACHE_VERSION}`;
const DATA_CACHE_NAME = `biblical-data-${CACHE_VERSION}`;

// Core files to cache for offline functionality
const STATIC_CACHE_URLS = [
    '/',
    '/index.html',
    '/studies/characters/characters_hub.html',
    '/studies/women/women-bible-hub.html',
    '/assets/css/characters-main.css',
    '/assets/css/global-v2.css',
    '/assets/js/hub-init.js',
    '/assets/js/hub-core.js',
    '/assets/js/hub-common.js',
    '/assets/js/character-loader.js',
    '/assets/js/search-module.js',
    '/assets/data/manifest.json',
    '/offline.html' // Fallback page
];

// Popular books to preload during idle time
const PRELOAD_BOOKS = [
    '/assets/data/books/genesis.json',
    '/assets/data/books/exodus.json',
    '/assets/data/books/samuel1.json',
    '/assets/data/books/samuel2.json',
    '/assets/data/books/proverbs.json',
    '/assets/data/books/matthew.json',
    '/assets/data/books/john.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[ServiceWorker] Caching static assets');
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .then(() => {
                console.log('[ServiceWorker] Skip waiting');
                return self.skipWaiting();
            })
            .catch(err => {
                console.error('[ServiceWorker] Installation failed:', err);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => {
                        return cacheName.startsWith('biblical-') && 
                               cacheName !== CACHE_NAME &&
                               cacheName !== DATA_CACHE_NAME;
                    })
                    .map(cacheName => {
                        console.log('[ServiceWorker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    })
            );
        }).then(() => {
            console.log('[ServiceWorker] Claiming clients');
            return self.clients.claim();
        }).then(() => {
            // Preload popular books during idle time
            preloadPopularBooks();
        })
    );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-HTTP requests
    if (!request.url.startsWith('http')) return;
    
    // Handle API/data requests
    if (url.pathname.includes('/assets/data/')) {
        event.respondWith(handleDataRequest(request));
        return;
    }
    
    // Handle static assets
    if (isStaticAsset(url.pathname)) {
        event.respondWith(handleStaticRequest(request));
        return;
    }
    
    // Handle navigation requests
    if (request.mode === 'navigate') {
        event.respondWith(handleNavigationRequest(request));
        return;
    }
    
    // Default strategy: network first, fallback to cache
    event.respondWith(
        fetch(request)
            .then(response => {
                // Cache successful responses
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                return caches.match(request);
            })
    );
});

// Handle data/API requests with smart caching
async function handleDataRequest(request) {
    const cache = await caches.open(DATA_CACHE_NAME);
    
    try {
        // Try network first for fresh data
        const networkResponse = await fetch(request);
        
        if (networkResponse.status === 200) {
            // Update cache with fresh data
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
        
        // If network fails, try cache
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            console.log('[ServiceWorker] Serving data from cache:', request.url);
            return cachedResponse;
        }
        
        // Return error response
        return networkResponse;
        
    } catch (error) {
        // Network failed, try cache
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            console.log('[ServiceWorker] Offline - serving data from cache:', request.url);
            return cachedResponse;
        }
        
        // Return offline data response
        return new Response(JSON.stringify({
            error: 'Offline',
            message: 'Data not available offline'
        }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Handle static asset requests
async function handleStaticRequest(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        // Return from cache, but also fetch and update in background
        fetch(request).then(response => {
            if (response.status === 200) {
                cache.put(request, response);
            }
        }).catch(() => {
            // Ignore errors for background update
        });
        
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        // Return fallback for certain asset types
        if (request.url.endsWith('.jpg') || request.url.endsWith('.png')) {
            return caches.match('/assets/images/placeholder.png');
        }
        throw error;
    }
}

// Handle navigation requests
async function handleNavigationRequest(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        // Try cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Try to return cached home page
        const homePage = await caches.match('/');
        if (homePage) {
            return homePage;
        }
        
        // Return offline page as last resort
        return caches.match('/offline.html');
    }
}

// Check if request is for static asset
function isStaticAsset(pathname) {
    const staticExtensions = ['.css', '.js', '.jpg', '.png', '.svg', '.woff', '.woff2', '.ttf'];
    return staticExtensions.some(ext => pathname.endsWith(ext));
}

// Preload popular books during idle time
async function preloadPopularBooks() {
    if ('requestIdleCallback' in self) {
        requestIdleCallback(async () => {
            const cache = await caches.open(DATA_CACHE_NAME);
            
            for (const url of PRELOAD_BOOKS) {
                try {
                    const response = await fetch(url);
                    if (response.status === 200) {
                        await cache.put(url, response);
                        console.log('[ServiceWorker] Preloaded:', url);
                    }
                } catch (error) {
                    console.log('[ServiceWorker] Failed to preload:', url);
                }
            }
        });
    }
}

// Message handler for cache control
self.addEventListener('message', (event) => {
    const { type, payload } = event.data;
    
    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
            
        case 'CLEAR_CACHE':
            event.waitUntil(
                caches.keys().then(cacheNames => {
                    return Promise.all(
                        cacheNames.map(cacheName => caches.delete(cacheName))
                    );
                }).then(() => {
                    event.ports[0].postMessage({ success: true });
                })
            );
            break;
            
        case 'CACHE_URLS':
            event.waitUntil(
                cacheUrls(payload.urls).then(() => {
                    event.ports[0].postMessage({ success: true });
                })
            );
            break;
            
        case 'GET_CACHE_SIZE':
            event.waitUntil(
                getCacheSize().then(size => {
                    event.ports[0].postMessage({ size });
                })
            );
            break;
    }
});

// Cache specific URLs on demand
async function cacheUrls(urls) {
    const cache = await caches.open(CACHE_NAME);
    
    for (const url of urls) {
        try {
            const response = await fetch(url);
            if (response.status === 200) {
                await cache.put(url, response);
            }
        } catch (error) {
            console.error('[ServiceWorker] Failed to cache:', url);
        }
    }
}

// Calculate cache size
async function getCacheSize() {
    if ('estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        return estimate.usage || 0;
    }
    return 0;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-progress') {
        event.waitUntil(syncProgress());
    }
});

// Sync user progress when back online
async function syncProgress() {
    const clients = await self.clients.matchAll();
    
    for (const client of clients) {
        client.postMessage({
            type: 'SYNC_PROGRESS',
            message: 'Syncing your progress...'
        });
    }
    
    // Here you would sync with a backend API if available
    console.log('[ServiceWorker] Progress sync completed');
}

// Push notification support (for future features)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New biblical character study available!',
        icon: '/assets/images/icon-192.png',
        badge: '/assets/images/badge-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('Biblical Characters Hub', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});

console.log('[ServiceWorker] Loaded successfully');