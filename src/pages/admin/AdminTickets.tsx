import { LifeBuoy, Search, MessageSquare, CheckCircle } from 'lucide-react';

export function AdminTickets() {
  const tickets = [
    { id: 'TIC-001', subject: 'API Rate Limit Increase', user: 'Bob Jones', status: 'Open', priority: 'High', date: '2 hours ago' },
    { id: 'TIC-002', subject: 'Billing question on Enterprise plan', user: 'Alice Smith', status: 'In Progress', priority: 'Medium', date: '1 day ago' },
    { id: 'TIC-003', subject: 'Cannot access playground', user: 'Charlie Day', status: 'Resolved', priority: 'Low', date: '3 days ago' },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2 text-red-400">Support Tickets</h1>
          <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
            Manage customer support inquiries.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            type="text"
            placeholder="Search tickets..."
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
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">Ticket</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">User</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">Status</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">Priority</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">Last Updated</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-white/40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, i) => (
                <tr key={ticket.id} className="transition-colors hover:bg-white/[0.02]" style={{ borderBottom: i !== tickets.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <LifeBuoy size={14} className="text-white/50" />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#E1E0CC' }}>{ticket.subject}</p>
                        <p className="text-xs text-white/40">{ticket.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/70">{ticket.user}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs uppercase tracking-wider font-semibold border ${
                      ticket.status === 'Open' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      ticket.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-green-500/10 text-green-400 border-green-500/20'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/50">{ticket.priority}</td>
                  <td className="px-6 py-4 text-sm text-white/50">{ticket.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded hover:bg-white/5 transition-colors text-white/50 hover:text-white" title="View Ticket">
                      <MessageSquare size={16} />
                    </button>
                    {ticket.status !== 'Resolved' && (
                      <button className="p-2 rounded hover:bg-green-500/10 transition-colors text-green-400/50 hover:text-green-400 ml-1" title="Mark Resolved">
                        <CheckCircle size={16} />
                      </button>
                    )}
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
