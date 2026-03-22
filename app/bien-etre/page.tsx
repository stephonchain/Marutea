import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Bien-être',
  description: 'Conseils bien-être, astuces beauté et rituels détente par Marutea.',
}

export default function BienEtrePage() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-5xl text-center mb-6">Blog Bien-être</h1>
        <p className="text-dark/60 text-center max-w-xl mx-auto mb-16">
          Nos conseils et astuces pour prendre soin de vous au quotidien.
        </p>
        <p className="text-center text-dark/40">Articles à venir.</p>
      </div>
    </section>
  )
}
