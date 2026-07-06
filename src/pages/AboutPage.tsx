import { MarketingSection, SectionHeader } from '../components/ui/MarketingSection';

export function AboutPage() {
  return (
    <div className="pt-20">
      <MarketingSection background="black">
        <SectionHeader 
          title="The foundation for legal intelligence." 
          description="We're a team of engineers, researchers, and legal professionals building the infrastructure that will power the next generation of law."
          badge="Our Mission"
        />

        <div className="max-w-4xl mx-auto mt-24 space-y-32">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#E1E0CC' }}>Built for precision.</h3>
              <p className="text-white/60 leading-relaxed">
                General purpose models are not enough for the rigors of legal practice. We train and deploy specialized models that understand the nuance, structure, and risk inherent in complex legal documentation.
              </p>
            </div>
            <div className="aspect-square rounded-2xl border bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="w-full h-full grid-pattern opacity-30 mix-blend-overlay rounded-2xl" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="order-2 md:order-1 aspect-square rounded-2xl border bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="w-full h-full grid-pattern opacity-30 mix-blend-overlay rounded-2xl" />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#E1E0CC' }}>Security by design.</h3>
              <p className="text-white/60 leading-relaxed">
                Trust is our most important product. From zero-data-retention inference to single-tenant enterprise deployments, every component of LexForge is designed to protect attorney-client privilege and proprietary data.
              </p>
            </div>
          </div>

        </div>
      </MarketingSection>
    </div>
  );
}
