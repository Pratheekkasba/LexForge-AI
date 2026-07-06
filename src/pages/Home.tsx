import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Pricing } from '../components/Pricing';
import { TrustedBy } from '../components/marketing/TrustedBy';
import { ArchitectureOverview } from '../components/marketing/ArchitectureOverview';
import { EnterpriseSecurity } from '../components/marketing/EnterpriseSecurity';

export function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Features />
      <ArchitectureOverview />
      <EnterpriseSecurity />
      <Pricing />
    </>
  );
}
