export function DeveloperQuickstart() {
  const steps = [
    {
      title: "1. Obtain your API Key",
      code: "# Set your key in your environment variables\nexport LEXFORGE_API_KEY='lf_live_...'"
    },
    {
      title: "2. Initialize the Client",
      code: "import { LexForge } from '@lexforge/sdk';\n\nconst lf = new LexForge({ apiKey: process.env.LEXFORGE_API_KEY });"
    },
    {
      title: "3. Make your first request",
      code: "const result = await lf.contracts.analyze({\n  document_url: 'https://example.com/msa.pdf',\n  focus: ['indemnification']\n});\n\nconsole.log(result);"
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-12" style={{ color: '#E1E0CC' }}>
          Quickstart Guide
        </h2>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {steps.map((step, i) => (
            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow" style={{ color: '#E1E0CC' }}>
                <span className="text-xs font-bold">{i + 1}</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border bg-[#111111]" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <h3 className="font-bold text-lg mb-4" style={{ color: '#E1E0CC' }}>{step.title}</h3>
                <pre className="p-4 rounded-xl bg-black border font-mono text-xs overflow-x-auto" style={{ borderColor: 'rgba(255,255,255,0.04)', color: 'rgba(225, 224, 204, 0.8)' }}>
                  {step.code}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
