import { useState } from 'react'
import { useContentStore } from '@/stores/contentStore'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Play, Music, Video, Clock } from 'lucide-react'

type FilterType = 'all' | 'audio' | 'video'

export function LaPause() {
  const [filter, setFilter] = useState<FilterType>('all')
  const mediaLibrary = useContentStore((state) => state.mediaLibrary)

  const filteredMedia =
    filter === 'all'
      ? mediaLibrary
      : mediaLibrary.filter((m) => m.type === filter)

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-4xl font-display text-emerald-900 mb-2">
          La Pause Marutea
        </h1>
        <p className="text-emerald-900/70">Votre espace bien-être</p>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-3 justify-center">
        <Button
          variant={filter === 'all' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Tout voir
        </Button>
        <Button
          variant={filter === 'audio' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('audio')}
        >
          <Music className="w-4 h-4 mr-2" />
          Audio
        </Button>
        <Button
          variant={filter === 'video' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('video')}
        >
          <Video className="w-4 h-4 mr-2" />
          Vidéo
        </Button>
      </div>

      {/* Media Cards */}
      <div className="space-y-4">
        {filteredMedia.map((media) => (
          <Card
            key={media.id}
            variant="bubble"
          >
            <div className="flex items-start gap-4">
              {/* Thumbnail or Icon */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center flex-shrink-0">
                {media.type === 'audio' ? (
                  <Music className="w-8 h-8 text-emerald-900" />
                ) : (
                  <Video className="w-8 h-8 text-emerald-900" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-medium text-emerald-900 leading-tight">
                    {media.title}
                  </h3>
                  <Badge variant="rose">{media.category}</Badge>
                </div>

                {media.description && (
                  <p className="text-sm text-emerald-900/60 mb-3 line-clamp-2">
                    {media.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-emerald-900/60">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {formatDuration(media.duration)}
                    </span>
                  </div>

                  <Button size="sm" variant="secondary">
                    <Play className="w-4 h-4 mr-2" />
                    Écouter
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <Card variant="gentle" className="text-center py-12">
          <div className="text-emerald-900/40 mb-3">
            <Music className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-emerald-900/60">
            Aucun contenu disponible pour cette catégorie
          </p>
        </Card>
      )}

      {/* Breathing Exercise Card */}
      <Card variant="gentle">
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 animate-pulse" />
          </div>
          <h3 className="font-display text-xl text-emerald-900 mb-2">
            Exercice de Respiration
          </h3>
          <p className="text-sm text-emerald-900/60 mb-4">
            Prenez 2 minutes pour vous recentrer
          </p>
          <Button variant="secondary">
            Commencer
          </Button>
        </div>
      </Card>
    </div>
  )
}
