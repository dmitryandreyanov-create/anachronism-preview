const CACHE="anachronism-v9f355cbd5cf9";
const CORE=["/anachronism-preview/_expo/static/js/web/index-ba28b45310c2c1b90daf1b7c2e65e9ba.js","/anachronism-preview/assets/assets/maps/petrograd_mayak_1916.84770d53104ec87c9a6de311293c7054.jpg","/anachronism-preview/assets/assets/rasputin/gallery/petersburg/city_07.b5ab46b3aa7624e17e9e9258663e4149.jpg","/anachronism-preview/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.b4eb097d35f44ed943676fd56f6bdc51.ttf","/anachronism-preview/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.6e435534bd35da5fef04168860a9b8fa.ttf","/anachronism-preview/index.html"];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('anachronism-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request,url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith('/anachronism-preview/'))return;
  // Let the browser/server negotiate 206 responses for Safari media.
  if(req.headers.has('range'))return;
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).then(response=>{
      if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});}
      return response;
    }).catch(async()=>await caches.match(req)||await caches.match('/anachronism-preview/index.html')));
    return;
  }
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(response=>{
    if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});}
    return response;
  })));
});