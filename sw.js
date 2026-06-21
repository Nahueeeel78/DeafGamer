const CACHE = 'sg-v1';

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE)));

self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(self.registration.showNotification(data.title || 'Sordos Gamer 🤟', {
    body: data.body || 'Nuevo mensaje',
    icon: 'https://via.placeholder.com/192x192/7c3aed/ffffff?text=SG',
    badge: 'https://via.placeholder.com/96x96/7c3aed/ffffff?text=SG',
    vibrate: [100, 60, 100, 60, 200],
    data: data
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
