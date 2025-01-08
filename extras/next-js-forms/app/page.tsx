import { Navigation } from '@/components/navigation'
import { InteractiveMenu } from '@/components/interactive-menu'
import { DigitalPartner } from '@/components/digital-partner'
import { WorkSection } from '@/components/work-section/work-section'
import { TestimonialsSection } from '@/components/testimonials-section'

export default function Page() {
  return (
    <>
      <Navigation />
      <main className="pt-[80px]">
        <InteractiveMenu />
        <DigitalPartner />
        <WorkSection />
        <TestimonialsSection />
      </main>
    </>
  )
}

