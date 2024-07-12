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
    i = {}
  const n = (n, s) => (
    (n = new URL(n + '.js', s).href),
    i[n] ||
      new Promise((i) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;(e.src = n), (e.onload = i), document.head.appendChild(e)
        } else (e = n), importScripts(n), i()
      }).then(() => {
        let e = i[n]
        if (!e) throw new Error(`Module ${n} didn’t register its module`)
        return e
      })
  )
  self.define = (s, f) => {
    const r = e || ('document' in self ? document.currentScript.src : '') || location.href
    if (i[r]) return
    let o = {}
    const c = (e) => n(e, r),
      t = { module: { uri: r }, exports: o, require: c }
    i[r] = Promise.all(s.map((e) => t[e] || c(e))).then((e) => (f(...e), o))
  }
}
define(['./workbox-e1498109'], function (e) {
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
    e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL('index.html')))
})
