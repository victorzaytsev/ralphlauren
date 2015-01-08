this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.create('akaAppCacheItems').then(function(cache) {
  	if (cachedItem) {
	    	for (cachedItem in akaAppCacheItems) {
	    		cache.add(cachedItem);
	    	}
    	}
    	return cache;
    })
  );
});

this.addEventListener('fetch', function(event) {
  var cachedResponse = caches.match(event.request).catch(function() {
    return event.default().then(function(response) {
      return caches.get('akaSWCache').then(function(cache) {
        cache.put(event.request, response.clone());
        return response;
      });  
    });
  }).catch(function() {
	  return null;
  });
    
  event.respondWith(cachedResponse);
});
