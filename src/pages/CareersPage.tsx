import { MarketingSection, SectionHeader } from '../components/ui/MarketingSection';

export function CareersPage() {
  const roles = [
    { title: 'Senior Machine Learning Engineer', team: 'Engineering', location: 'San Francisco / Remote' },
    { title: 'Founding Product Designer', team: 'Design', location: 'New York / Remote' },
    { title: 'Enterprise Account Executive', team: 'Sales', location: 'London / Remote' },
    { title: 'Legal Counsel (AI Regulation)', team: 'Legal', location: 'San Francisco' },
  ];

  return (
    <div className="pt-20">
      <MarketingSection background="black">
        <SectionHeader 
          title="Join LexForge AI" 
          description="Help us build the critical intelligence infrastructure for the global legal system. We are looking for exceptional builders who value deep work and precision."
          badge="Careers"
        />

        <div className="max-w-4xl mx-auto mt-24">
          <h3 className="text-2xl font-bold mb-8" style={{ color: '#E1E0CC' }}>Open Roles</h3>
          
          <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            {roles.map((role) => (
              <div key={role.title} className="py-8 flex flex-col sm:flex-row sm:items-center justify-between group hover:bg-white/[0.02] transition-colors -mx-4 px-4 rounded-xl">
                <div>
                  <h4 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors" style={{ color: '#E1E0CC' }}>
                    {role.title}
                  </h4>
                  <div className="flex gap-4 text-sm" style={{ color: 'rgba(225, 224, 204, 0.5)' }}>
                    <span>{role.team}</span>
                    <span>•</span>
                    <span>{role.location}</span>
                  </div>
                </div>
                <button className="mt-4 sm:mt-0 px-6 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-white hover:text-black hover:border-white" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#E1E0CC' }}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <div className="mt-24 p-8 rounded-2xl border bg-[#111111]" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#E1E0CC' }}>Don't see a fit?</h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
              We are always looking for extraordinary talent. If you believe you belong at LexForge but don't see an open role, send your resume and a brief note to careers@lexforge.ai.
            </p>
          </div>
        </div>
      </MarketingSection>
    </div>
  );
}
