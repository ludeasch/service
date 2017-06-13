/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, serviceworker, es6 */

'use strict';


self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: `${event.data.text()}`,
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

var CURRENT_CACHES = 'prefetch-cache-v2';

self.addEventListener('install', function(event) {
  console.log('entro---no');
  //self.skipWaiting();
  event.waitUntil(
    caches.open(CURRENT_CACHES).then(function(cache) {
      return cache.addAll(
        [
           'sw.js',
           'scripts/main.js',
           'styles/index.css',
        ]
      );
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(CURRENT_CACHES) {
      return Promise.all(
        CURRENT_CACHES.filter(function(cacheName) {

        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});




self.addEventListener('fetch', function(event) {
  console.log(event.request.method);
  event.respondWith(
      caches.open(CURRENT_CACHES).then(function(cache) {
        if(event.request.url.includes("index")){
          if(!navigator.onLine){
            return caches.match(event.request)
          }else{
            cache.add(event.request)
            return fetch(event.request)
          }
        }
        if(event.request.url.includes("https://trim-mode-139918.firebaseio.com/.json?print=pretty")){
          if(!navigator.onLine){
                console.log("mira")
                return caches.match(event.request)

          }else{
              cache.add(event.request)
              return fetch(event.request)
          }

        }else{
            return caches.match(event.request).then(function (response) {
              return response || fetch(event.request).then(function(response) {
                cache.add(event.request, response.clone());
                return response;
              }).catch(function(r){console.log(r)})
            }).catch(function(r){console.log(r)})
        }
      }).catch(function(r){console.log(r)})
  )
});