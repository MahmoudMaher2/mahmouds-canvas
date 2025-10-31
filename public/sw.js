// public/sw.js
const CACHE_NAME = 'mahmoud-maher-portfolio-v3';
const STATIC_CACHE = 'static-assets-v3';
const API_CACHE = 'api-cache-v1';

// الملفات الثابتة
const staticAssetsToCache = [
  '/',
  '/index.html',
  '/Mahmoud%20Maher.jpg',
  '/icons/letter-m.png',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching Static Assets');
        return cache.addAll(staticAssetsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', (event) => {
  // تجنب طلبات non-GET
  if (event.request.method !== 'GET') return;
  
  // طلبات API (بيانات ديناميكية)
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('jsonplaceholder.typicode.com') || 
      event.request.headers.get('accept')?.includes('application/json')) {
    
    console.log('Service Worker: API Request -', event.request.url);
    event.respondWith(handleApiRequest(event.request));
    return;
  }

  // الملفات الثابتة (استراتيجية Cache First)
  event.respondWith(handleStaticRequest(event.request));
});

// معالجة طلبات API (Network First → Cache Fallback)
async function handleApiRequest(request) {
  try {
    // الخطوة 1: حاول تجيب البيانات من النت أولاً
    console.log('Trying network first for API...');
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // خزن البيانات الجديدة في الكاش
      const cache = await caches.open(API_CACHE);
      await cache.put(request, networkResponse.clone());
      console.log('API data fetched from network and cached');
      return networkResponse;
    }
    throw new Error('Network response not ok');
  } catch (networkError) {
    console.log('Network failed, trying cache...', networkError);
    
    // الخطوة 2: لو النت فاشل، جيب من الكاش
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('API data served from cache');
      return cachedResponse;
    }
    
    // الخطوة 3: لو مفيش في الكاش، رجع رسالة خطأ
    console.log('No cached data available');
    return new Response(
      JSON.stringify({ 
        error: 'No network connection and no cached data available',
        timestamp: new Date().toISOString()
      }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// معالجة الملفات الثابتة (Cache First → Network Fallback)
async function handleStaticRequest(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // لو فشل كل حاجة، ممكن ترجع fallback page
    return new Response('Offline - Content not available', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // امسح الكاش القديم
          if (![STATIC_CACHE, API_CACHE].includes(cacheName)) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});