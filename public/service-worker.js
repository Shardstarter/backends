self.addEventListener('push', (event) => {
  const data = event.data.json();
  const { title, image, body, address } = data;

  console.log(address);
  const options = {
    body: body,
    data: {
      url: `https://mintwall.io`
    },
    // icon: `http://localhost:5000/uploads/${image}`,
    // image: `http://localhost:5000/uploads/${image}`,
    // image: `https://as1.ftcdn.net/v2/jpg/04/74/32/66/1000_F_474326689_g16qM6MzzjtI3uwmuEiyNeOTXzTqMWaU.jpg`,
    image: image,
    requireInteraction: true
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  let url = 'https://mintwall.io/presales';
  
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
