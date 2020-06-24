const CACHE_NAME = "jajankenramen-v1";
var urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/pages/nav.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/menu.html",
    "/css/materialize.min.css",
    "/css/about.css",
    "/css/menu.css",
    "/css/style.css",
    "/css/font-awesome.min.css",
    "/js/jquery-3.5.1.min.js",
    "/js/materialize.min.js",
    "/js/materialize.js",
    "/js/nav.js",
    "/img/badge.png",
    "/img/food.png",
    "/img/logo.png",
    "/img/ME.jpg",
    "/img/ramen 1.jpg",
    "/img/ramen2.jpg",
    "/img/ramen3.jpg",
    "/img/ramen4.jpg",
    "/img/shield.png",
    "/img/wp.jpg",
    "/img/icon.png",
    "/webfonts/fa-brands-400.eot",
    "/webfonts/fa-brands-400.svg",
    "/webfonts/fa-brands-400.ttf",
    "/webfonts/fa-brands-400.woff",
    "/webfonts/fa-brands-400.woff2",
    "/webfonts/fa-regular-400.eot",
    "/webfonts/fa-regular-400.svg",
    "/webfonts/fa-regular-400.ttf",
    "/webfonts/fa-regular-400.woff",
    "/webfonts/fa-regular-400.woff2",
    "/webfonts/fa-solid-900.eot",
    "/webfonts/fa-solid-900.svg",
    "/webfonts/fa-solid-900.ttf",
    "/webfonts/fa-solid-900.woff",
    "/webfonts/fa-solid-900.woff2"

];
// Register Cache

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});



// Menggunakan assets dari cache
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                console.log("ServiceWorker: Menggunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker:Sedang Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});


// Mengecek dan menghapus cache versi lama
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (cacheName) {
                if (cacheName != CACHE_NAME) {
                    console.log("ServiceWorker: cache " + cacheName + " dihapus");
                    return caches.delete(cacheName);
                }
            }));
        })
    );
});