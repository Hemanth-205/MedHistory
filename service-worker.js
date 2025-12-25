const CACHE_NAME = 'medhistory-v1';
const ASSETS_TO_CACHE = [
    'index.html',
    'offline.html',
    'css/style.css',
    'js/supabase-config.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => caches.match('offline.html'));
        })
    );
});
