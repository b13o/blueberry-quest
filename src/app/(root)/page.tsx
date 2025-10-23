import { Hero } from "./_components/hero";
import { ConceptSection } from "./_components/concept-section";
import { BenefitsSection } from "./_components/benefits-section";
import { HowToSubmitSection } from "./_components/how-to-submit-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* ヒーローセクション */}
        <Hero />

        {/* コンセプト・課題セクション */}
        <ConceptSection />

        {/* 特徴セクション */}
        <BenefitsSection />

        {/* 使い方セクション */}
        <HowToSubmitSection />
      </div>
    </div>
  );
}
