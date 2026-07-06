import { Database, FileText, Cloud, LayoutGrid } from 'lucide-react';

export function Integrations() {
  const platforms = [
    { name: 'Salesforce', icon: Cloud, type: 'CRM' },
    { name: 'Ironclad', icon: FileText, type: 'CLM' },
    { name: 'DocuSign', icon: FileText, type: 'eSignature' },
    { name: 'Snowflake', icon: Database, type: 'Data Warehouse' },
    { name: 'Workday', icon: LayoutGrid, type: 'ERP' },
    { name: 'Custom API', icon: Cloud, type: 'REST/gRPC' },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: '#E1E0CC' }}>
              Connects to your existing stack.
            </h2>
            <p className="text-lg" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
              LexForge API seamlessly integrates with the tools your enterprise already uses. Sync extracted data directly to your CRM, CLM, or Data Warehouse.
            </p>
          </div>

          <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {platforms.map((p) => (
              <div key={p.name} className="p-6 rounded-2xl border bg-[#111111] hover:bg-white/5 transition-colors cursor-pointer group" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <p.icon size={24} className="mb-4 opacity-50 group-hover:opacity-100 transition-opacity group-hover:text-primary" style={{ color: '#E1E0CC' }} />
                <h4 className="font-bold text-sm mb-1" style={{ color: '#E1E0CC' }}>{p.name}</h4>
                <p className="text-xs" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>{p.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
