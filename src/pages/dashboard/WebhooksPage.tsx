import { useState } from 'react';
import { Webhook, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export function WebhooksPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [url, setUrl] = useState('');

  const [webhooks, setWebhooks] = useState([
    { id: 'wh_1', url: 'https://api.acme.com/webhooks/lexforge', events: ['api.usage.limit_reached'], status: 'active', created: 'Oct 1, 2023' },
  ]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      setWebhooks([...webhooks, {
        id: `wh_${Date.now()}`,
        url,
        events: ['*'],
        status: 'active',
        created: new Date().toLocaleDateString()
      }]);
      setUrl('');
      setIsAdding(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: '#E1E0CC' }}>Webhooks</h1>
          <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
            Configure webhooks to receive real-time notifications for API events.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 glow-primary"
          style={{ background: '#E1E0CC', color: '#000' }}
        >
          <Plus size={16} />
          Add Endpoint
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="p-6 rounded-2xl border" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)' }}>
          <h3 className="font-semibold mb-4" style={{ color: '#E1E0CC' }}>Add Webhook Endpoint</h3>
          <div className="flex gap-4">
            <input
              type="url"
              placeholder="https://your-domain.com/webhook"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-4 py-2 bg-black/50 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}
              required
            />
            <button type="submit" className="px-5 py-2 rounded-lg text-sm font-medium transition-colors bg-white/10 hover:bg-white/20" style={{ color: '#E1E0CC' }}>
              Save
            </button>
            <button type="button" onClick={() => setIsAdding(false)} className="px-5 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5 text-white/50">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="rounded-2xl border overflow-hidden bg-[#111111]" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">URL</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">Events</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-white/40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {webhooks.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-white/40">
                  <Webhook size={32} className="mx-auto mb-3 opacity-20" />
                  <p>No webhooks configured.</p>
                </td>
              </tr>
            ) : (
              webhooks.map((wh) => (
                <tr key={wh.id} className="border-b last:border-0 hover:bg-white/[0.02] transition-colors" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Webhook size={14} className="text-white/40" />
                      <span className="text-sm font-medium" style={{ color: '#E1E0CC' }}>{wh.url}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/60">{wh.events.join(', ')}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium text-green-400 bg-green-500/10">
                      <CheckCircle2 size={10} /> {wh.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setWebhooks(webhooks.filter(w => w.id !== wh.id))}
                      className="p-2 rounded hover:bg-red-500/10 transition-colors group" 
                      title="Delete webhook"
                    >
                      <Trash2 size={16} className="text-red-400/50 group-hover:text-red-400" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
