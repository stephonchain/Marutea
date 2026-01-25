import { create } from 'zustand'

interface MediaContent {
  id: string
  title: string
  type: 'audio' | 'video'
  category: string
  url: string
  duration: number
  thumbnail?: string
  description?: string
}

interface ContentStore {
  mediaLibrary: MediaContent[]
  thoughtOfTheDay: string
  getMediaByType: (type: 'audio' | 'video') => MediaContent[]
}

const mockThoughts = [
  "Prendre soin de soi n'est pas égoïste, c'est essentiel.",
  "Votre peau est le reflet de votre bien-être intérieur.",
  "Chaque moment de pause est un pas vers l'harmonie.",
  "La beauté commence par l'amour de soi.",
  "Respirez profondément, vous êtes exactement où vous devez être."
]

export const useContentStore = create<ContentStore>((_set, get) => ({
  mediaLibrary: [
    {
      id: 'm1',
      title: 'Méditation du Matin',
      type: 'audio',
      category: 'Méditation',
      url: '/media/meditation-morning.mp3',
      duration: 600,
      description: 'Commencez votre journée en douceur avec cette méditation guidée.'
    },
    {
      id: 'm2',
      title: 'Routine Visage Soir',
      type: 'video',
      category: 'Tutoriel',
      url: '/media/routine-evening.mp4',
      duration: 420,
      thumbnail: '/media/thumb-routine.jpg',
      description: 'Découvrez les gestes essentiels pour une routine du soir parfaite.'
    },
    {
      id: 'm3',
      title: 'Respiration Anti-Stress',
      type: 'audio',
      category: 'Respiration',
      url: '/media/breathing-stress.mp3',
      duration: 300,
      description: 'Technique de respiration pour apaiser le stress instantanément.'
    },
    {
      id: 'm4',
      title: 'Auto-Massage Visage',
      type: 'video',
      category: 'Tutoriel',
      url: '/media/self-massage.mp4',
      duration: 480,
      thumbnail: '/media/thumb-massage.jpg',
      description: 'Apprenez les techniques d\'auto-massage pour détendre vos traits.'
    }
  ],
  thoughtOfTheDay: mockThoughts[Math.floor(Math.random() * mockThoughts.length)],
  getMediaByType: (type) => get().mediaLibrary.filter((m) => m.type === type)
}))
