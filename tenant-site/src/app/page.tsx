import { HeroSection } from "@/components/sections/hero";
import { ValuePropGrid } from "@/components/sections/value-prop-grid";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CostComparison } from "@/components/sections/cost-comparison";
import { SavingsCalculator } from "@/components/sections/savings-calculator";
import { CTASection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuePropGrid />
      <FeatureGrid
        id="features"
        title="Funzionalità già pronte per il tuo team"
        description="Dal primo login hai tutte le viste per affitti e vendite, inclusi CRM, documenti e lead."
      />
      <HowItWorks />
      <CostComparison />
      <SavingsCalculator />
      <CTASection />
    </>
  );
}
