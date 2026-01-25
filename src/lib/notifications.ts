import { messaging } from './firebase'
import { getToken, onMessage } from 'firebase/messaging'

// Request notification permission and get FCM token
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission()

    if (permission === 'granted') {
      console.log('Notification permission granted.')

      const msg = await messaging
      if (!msg) {
        console.log('Messaging not supported')
        return null
      }

      // Get FCM token
      const token = await getToken(msg, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY || 'your-vapid-key'
      })

      console.log('FCM Token:', token)
      return token
    } else {
      console.log('Notification permission denied.')
      return null
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error)
    return null
  }
}

// Listen for foreground messages
export const onMessageListener = async (callback: (payload: any) => void) => {
  const msg = await messaging
  if (!msg) return

  onMessage(msg, (payload) => {
    console.log('Message received:', payload)
    callback(payload)
  })
}

// Show local notification
export const showLocalNotification = (title: string, body: string, icon?: string) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: icon || '/pwa-192x192.png',
      badge: '/pwa-192x192.png'
    })
  }
}
