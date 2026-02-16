// Service Worker for "For My Sindhu" PWA
const CACHE_NAME = 'for-my-sindhu-v1.0.0';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/valentine-popup.css',
    '/js/main.js',
    '/js/sceneManager.js',
    '/js/audioController.js',
    '/js/particleSystem.js',
    '/js/preloadManager.js',
    // GSAP from CDN (will be cached on first load)
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching core assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting(); // Activate immediately
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Take control immediately
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            // Clone the request because it can only be used once
            return fetch(event.request.clone()).then((networkResponse) => {
                // Cache successful responses for assets
                if (
                    networkResponse &&
                    networkResponse.status === 200 &&
                    (event.request.url.includes('/assets/') ||
                        event.request.url.includes('.png') ||
                        event.request.url.includes('.jpg') ||
                        event.request.url.includes('.mp3') ||
                        event.request.url.includes('.mp4'))
                ) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            });
        })
    );
});
