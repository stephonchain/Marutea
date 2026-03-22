import { Hero } from '@/components/home/Hero'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { GiftCardBanner } from '@/components/home/GiftCardBanner'
import { Testimonials } from '@/components/home/Testimonials'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <GiftCardBanner />
      <Testimonials />
    </>
  )
}
