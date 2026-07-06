import { Building2, Search, MoreVertical, Edit2 } from 'lucide-react';

export function AdminOrgs() {
  const orgs = [
    { id: 'org_1', name: 'Acme Corp', plan: 'Enterprise', mrr: '$1,000', members: 12, joined: 'Oct 1, 2023' },
    { id: 'org_2', name: 'TechFlow', plan: 'Professional', mrr: '$199', members: 4, joined: 'Nov 12, 2023' },
    { id: 'org_3', name: 'Lex Partners', plan: 'Starter', mrr: '$49', members: 1, joined: 'Dec 5, 2023' },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2 text-red-400">Organizations</h1>
          <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
            Manage organizational billing and quotas.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            type="text"
            placeholder="Search orgs..."
            className="w-full pl-9 pr-4 py-2 bg-[#111111] border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-colors"
            style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}
          />
        </div>
      </div>

      <div className="rounded-2xl border overflow-hidden bg-[#111111]" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">Organization</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">Plan</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">MRR</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">Members</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-white/40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orgs.map((org, i) => (
                <tr key={org.id} className="transition-colors hover:bg-white/[0.02]" style={{ borderBottom: i !== orgs.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <Building2 size={14} className="text-white/50" />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#E1E0CC' }}>{org.name}</p>
                        <p className="text-xs text-white/40">Created {org.joined}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-0.5 rounded text-xs uppercase tracking-wider font-semibold border bg-primary/10 text-primary border-primary/20">
                      {org.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-green-400">{org.mrr}</td>
                  <td className="px-6 py-4 text-sm text-white/70">{org.members}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded hover:bg-white/5 transition-colors text-white/50 hover:text-white" title="Edit Plan">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 rounded hover:bg-white/5 transition-colors text-white/50 hover:text-white ml-2">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
