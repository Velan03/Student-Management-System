// This is a service worker file for PWA functionality

// Cache name
const CACHE_NAME = "edupulse-v1"

// Resources to cache
const RESOURCES_TO_CACHE = ["/", "/index.html", "/manifest.json", "/icons/icon-192x192.png", "/icons/icon-512x512.png"]

// Install event - cache resources
self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache")
      return cache.addAll(RESOURCES_TO_CACHE)
    }),
  )
  // Activate the service worker immediately
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event: any) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
          return null
        }),
      )
    }),
  )
  // Claim clients immediately
  self.clients.claim()
})

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response
      }

      // Clone the request
      const fetchRequest = event.request.clone()

      return fetch(fetchRequest)
        .then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Clone the response
          const responseToCache = response.clone()

          caches.open(CACHE_NAME).then((cache) => {
            // Don't cache API requests or other dynamic content
            if (!event.request.url.includes("/api/")) {
              cache.put(event.request, responseToCache)
            }
          })

          return response
        })
        .catch(() => {
          // If fetch fails (offline), try to serve the offline page
          if (event.request.mode === "navigate") {
            return caches.match("/")
          }
          return null
        })
    }),
  )
})

// Background sync for offline form submissions
self.addEventListener("sync", (event: any) => {
  if (event.tag === "sync-assignments") {
    event.waitUntil(syncAssignments())
  }
})

// Push notification event
self.addEventListener("push", (event: any) => {
  const data = event.data.json()
  const options = {
    body: data.body,
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      url: data.url,
    },
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

// Notification click event
self.addEventListener("notificationclick", (event: any) => {
  event.notification.close()
  event.waitUntil(clients.openWindow(event.notification.data.url))
})

// Function to sync assignments when back online
async function syncAssignments() {
  const db = await openDB()
  const assignments = await db.getAll("offline-assignments")

  for (const assignment of assignments) {
    try {
      await fetch("/api/assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignment),
      })

      // If successful, remove from IndexedDB
      await db.delete("offline-assignments", assignment.id)
    } catch (error) {
      console.error("Error syncing assignment:", error)
    }
  }
}

// Helper function to open IndexedDB
async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("edupulse-db", 1)

    request.onerror = () => {
      reject("Error opening IndexedDB")
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains("offline-assignments")) {
        db.createObjectStore("offline-assignments", { keyPath: "id", autoIncrement: true })
      }
    }
  })
}
