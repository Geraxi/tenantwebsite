import { Hero } from '@/components/landing/hero'
import { ValueProposition } from '@/components/landing/value-proposition'
import { ComparisonTable } from '@/components/landing/comparison-table'
import { CostCalculator } from '@/components/landing/cost-calculator'
import { Pricing } from '@/components/landing/pricing'
import { Contact } from '@/components/landing/contact'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ValueProposition />
      <ComparisonTable />
      <CostCalculator />
      <Pricing />
      <Contact />
    </main>
  )
}
