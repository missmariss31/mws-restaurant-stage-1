// register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
    .then(function (registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    });

    navigator.serviceWorker.ready.then(function (registration) {
        console.log('Service Worker Ready');
    });
}