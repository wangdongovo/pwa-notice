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
