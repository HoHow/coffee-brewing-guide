// Service Worker for 咖啡沖煮指南 PWA
const CACHE_NAME = 'coffee-guide-v1';
const urlsToCache = [
    '/coffee-brewing-guide/',
    '/coffee-brewing-guide/index.html',
    '/coffee-brewing-guide/css/style.css',
    '/coffee-brewing-guide/js/app.js',
    '/coffee-brewing-guide/js/data.js',
    '/coffee-brewing-guide/manifest.json'
];

// 安裝 Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('快取已開啟');
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.log('快取失敗:', err);
            })
    );
    self.skipWaiting();
});

// 啟動 Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('清除舊快取:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// 攔截請求
self.addEventListener('fetch', event => {
    // 只處理 GET 請求
    if (event.request.method !== 'GET') return;

    // 忽略第三方請求
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 如果有快取，返回快取
                if (response) {
                    return response;
                }

                // 否則從網路獲取
                return fetch(event.request).then(response => {
                    // 檢查是否為有效響應
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // 複製響應並快取
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
            .catch(() => {
                // 離線時返回快取的首頁
                return caches.match('/coffee-brewing-guide/index.html');
            })
    );
});
