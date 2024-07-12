self.addEventListener('notificationclick', function (event) {
  console.log('🍍🙏🍍👉: 触发 notificationclick 事件')
  const url = event.notification.data.url
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      console.log('当前打开的窗口:', windowClients)

      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i]
        if (client.url === url && 'focus' in client) {
          console.log('找到已经打开的目标窗口，聚焦:', url)
          return client.focus()
        }
      }

      if (clients.openWindow) {
        console.log('没有找到目标窗口，打开一个新的:', url)
        return clients.openWindow(url)
      }
    })
  )
})

self.addEventListener('push', (event) => {
  const data = event.data.json()
  console.log('🍍🙏🍍👉: 收到服务端推送', data)
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      data: { url: data.url }
    })
  )
})

if (!self.define) {
  let e,
    n = {}
  const s = (s, i) => (
    (s = new URL(s + '.js', i).href),
    n[s] ||
      new Promise((n) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;(e.src = s), (e.onload = n), document.head.appendChild(e)
        } else (e = s), importScripts(s), n()
      }).then(() => {
        let e = n[s]
        if (!e) throw new Error(`Module ${s} didn’t register its module`)
        return e
      })
  )
  self.define = (i, c) => {
    const r = e || ('document' in self ? document.currentScript.src : '') || location.href
    if (n[r]) return
    let o = {}
    const t = (e) => s(e, r),
      a = { module: { uri: r }, exports: o, require: t }
    n[r] = Promise.all(i.map((e) => a[e] || t(e))).then((e) => (c(...e), o))
  }
}
define(['./workbox-e1cdc987'], function (e) {
  'use strict'
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: 'dev-sw.js', revision: 'dd27101b94b773661b5e68ba25452a5e' },
        { url: 'index.Bf7ET_wm.js', revision: '7a96c588843c18c2fe7e70ad410feaf5' },
        { url: 'index.D5FwIP7v.css', revision: '677c9f25c0e8b6abaf9be0945319fa13' },
        { url: 'index.html', revision: 'd7c29f373c99d4fffcdeb0f693353894' },
        {
          url: 'icons/manifest-icon-192.maskable.png',
          revision: '8deee74806213102154875b6344c1011'
        },
        {
          url: 'icons/manifest-icon-512.maskable.png',
          revision: '3deeeaab1fa839af774ceacc782f3358'
        },
        { url: 'manifest.webmanifest', revision: '55ff19f6557af5ed1df90eb19e015cab' }
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL('index.html'))),
    e.registerRoute(
      /\.(?:png|jpg|jpeg|svg|webp)$/,
      new e.CacheFirst({
        cacheName: 'images-cache',
        plugins: [new e.ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 604800 })]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js|css)$/,
      new e.StaleWhileRevalidate({
        cacheName: 'static-resources',
        plugins: [new e.ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 604800 })]
      }),
      'GET'
    )
})
