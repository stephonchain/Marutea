'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

const presetAmounts = [5000, 7500, 10000] // in cents

interface GiftCardSelectorProps {
  onSelect: (amountCents: number) => void
}

export function GiftCardSelector({ onSelect }: GiftCardSelectorProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')

  function handleSelect(amount: number) {
    setSelected(amount)
    setCustomAmount('')
    onSelect(amount)
  }

  function handleCustom() {
    const parsed = Math.round(parseFloat(customAmount) * 100)
    if (parsed >= 1000) {
      setSelected(null)
      onSelect(parsed)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-center gap-4">
        {presetAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => handleSelect(amount)}
            className={`px-8 py-4 rounded-sm border-2 transition-colors font-medium ${
              selected === amount
                ? 'border-terra bg-terra text-white'
                : 'border-sand/40 hover:border-terra'
            }`}
          >
            {(amount / 100).toFixed(0)} &euro;
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 justify-center">
        <span className="text-dark/60 text-sm">ou montant libre :</span>
        <input
          type="number"
          min="10"
          step="1"
          placeholder="Ex: 120"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="w-24 px-3 py-2 border border-sand/40 rounded-sm text-center"
        />
        <span className="text-dark/60">&euro;</span>
        <Button variant="outline" onClick={handleCustom}>
          Valider
        </Button>
      </div>
    </div>
  )
}
