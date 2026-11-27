const CACHE='trent-park-rota-v1';
const ROOT=new URL('./',self.location.href).href;
self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||e.request.mode!=='navigate'||!(u.href.split('?')[0]===ROOT||u.href.split('?')[0]===ROOT+'index.html'))return;e.respondWith((async()=>{const c=await caches.open(CACHE);try{const r=await fetch(e.request,{cache:'no-store'});if(r.ok){await c.put(ROOT,r.clone());return r;}throw Error('Unavailable');}catch(err){return (await c.match(ROOT))||new Response('Rota unavailable offline. Connect to the internet and try again.',{status:503,headers:{'Content-Type':'text/plain'}});}})());});
