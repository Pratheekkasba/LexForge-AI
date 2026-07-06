import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Copy, Plus, ShieldAlert, Check, Trash2, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useFirestoreQuery, useCreateDocument } from '../../hooks/useFirestore';
import { where, orderBy } from 'firebase/firestore';
import type { ApiKey } from '../../types';
import toast from 'react-hot-toast';

export function ApiKeysPage() {
  const { userProfile } = useAuth();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  
  // Load mock keys from localStorage so they survive page refreshes
  const [localKeys, setLocalKeys] = useState<ApiKey[]>(() => {
    try {
      const saved = localStorage.getItem('lexforge_mock_keys');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const { data: keys = [], isLoading } = useFirestoreQuery<ApiKey>(
    'apiKeys',
    userProfile?.organizationId 
      ? [where('organizationId', '==', userProfile.organizationId), orderBy('createdAt', 'desc')]
      : [],
    !!userProfile?.organizationId
  );

  const createKeyMutation = useCreateDocument('apiKeys');

  // Combine locally created keys with database keys
  const allKeys = [...localKeys, ...keys].sort((a, b) => {
    const timeA = a.createdAt instanceof Date ? a.createdAt.getTime() : Date.now();
    const timeB = b.createdAt instanceof Date ? b.createdAt.getTime() : Date.now();
    return timeB - timeA;
  });

  const handleCopy = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    toast.success('API key copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    if (!userProfile?.organizationId) {
      toast.error('Your organization is not set up properly. Please contact support or check database rules.');
      return;
    }

    try {
      // Note: In a real app, this should call a Firebase Cloud Function to securely generate the key
      // For this demo, the firestore lib helper creates a mock key
      const { createApiKey } = await import('../../lib/firestore');
      const { id, key } = await createApiKey(newKeyName, userProfile.organizationId, userProfile.uid);
      
      // Add to local state and localStorage so it survives page refreshes
      const newKey: ApiKey = {
        id,
        name: newKeyName,
        key: key,
        prefix: key.substring(0, 12) + '...',
        organizationId: userProfile.organizationId,
        createdBy: userProfile.uid,
        createdAt: new Date().toISOString() as any, // Store as ISO string for JSON serialization
        lastUsed: null,
        expiresAt: null,
        status: 'active',
        permissions: ['read', 'write']
      };
      
      setLocalKeys(prev => {
        const updated = [newKey, ...prev];
        localStorage.setItem('lexforge_mock_keys', JSON.stringify(updated));
        return updated;
      });

      setIsCreating(false);
      setNewKeyName('');
      
      // Show the full key ONCE
      toast.success(
        <div>
          Key created successfully!
          <div className="mt-2 p-2 bg-black/50 rounded break-all font-mono text-xs border border-white/10 select-all">
            {key}
          </div>
          <p className="mt-2 text-xs opacity-70">Copy this now, you won't see it again.</p>
        </div>,
        { duration: 10000 }
      );
    } catch (err) {
      toast.error('Failed to create API key');
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: '#E1E0CC' }}>API Keys</h1>
          <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
            Manage your API keys to authenticate requests to the LexForge API.
          </p>
        </div>
        
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 hover:bg-white"
          style={{ background: '#E1E0CC', color: '#000' }}
        >
          <Plus size={16} />
          Create new key
        </button>
      </div>

      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="p-6 rounded-2xl border" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)' }}>
              <h3 className="font-semibold mb-4" style={{ color: '#E1E0CC' }}>Create new API key</h3>
              <form onSubmit={handleCreate} className="flex gap-4">
                <input
                  type="text"
                  placeholder="Key Name (e.g., Production App)"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="flex-1 px-4 py-2 bg-black/50 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
                  style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!newKeyName.trim() || createKeyMutation.isPending}
                  className="px-5 py-2 rounded-lg text-sm font-medium transition-colors bg-white/10 hover:bg-white/20 disabled:opacity-50"
                  style={{ color: '#E1E0CC' }}
                >
                  {createKeyMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setNewKeyName('');
                  }}
                  className="px-5 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
                  style={{ color: 'rgba(225, 224, 204, 0.6)' }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#111111' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>Name</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>Secret Key</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>Created</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>Last Used</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>
                    <Loader2 size={24} className="animate-spin mx-auto mb-2" />
                    Loading keys...
                  </td>
                </tr>
              ) : allKeys.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>
                    <Key size={32} className="mx-auto mb-3 opacity-20" />
                    <p>No API keys found.</p>
                    <p className="text-sm mt-1">Create one to get started.</p>
                  </td>
                </tr>
              ) : (
                allKeys.map((k, i) => (
                  <tr key={k.id} className="transition-colors hover:bg-white/[0.02]" style={{ borderBottom: i !== allKeys.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Key size={14} style={{ color: 'rgba(225, 224, 204, 0.4)' }} />
                        <span className="text-sm font-medium" style={{ color: '#E1E0CC' }}>{k.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="px-2 py-1 rounded bg-black/50 text-sm font-mono tracking-wider" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>
                        {k.prefix}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                      {k.createdAt ? new Date((k.createdAt as any).toDate?.() || k.createdAt).toLocaleDateString() : 'Just now'}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                      {k.lastUsed ? new Date((k.lastUsed as any).toDate?.() || k.lastUsed).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleCopy(k.key, k.id)}
                          className="p-2 rounded hover:bg-white/5 transition-colors group relative"
                          title="Copy key"
                        >
                          {copiedId === k.id ? (
                            <Check size={16} className="text-green-400" />
                          ) : (
                            <Copy size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: '#E1E0CC' }} />
                          )}
                        </button>
                        <button 
                          onClick={() => {
                            // Also allow deleting the key from localStorage
                            setLocalKeys(prev => {
                              const updated = prev.filter(key => key.id !== k.id);
                              localStorage.setItem('lexforge_mock_keys', JSON.stringify(updated));
                              return updated;
                            });
                            toast.success('Key revoked successfully');
                          }}
                          className="p-2 rounded hover:bg-red-500/10 transition-colors group"
                          title="Revoke key"
                        >
                          <Trash2 size={16} className="text-red-400/50 group-hover:text-red-400 transition-opacity" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex items-start gap-3 p-4 rounded-xl border" style={{ borderColor: 'rgba(222, 219, 200, 0.1)', background: 'rgba(222, 219, 200, 0.03)' }}>
        <ShieldAlert size={18} style={{ color: 'rgba(225, 224, 204, 0.6)' }} className="mt-0.5" />
        <div>
          <h4 className="text-sm font-medium mb-1" style={{ color: '#E1E0CC' }}>Keep your keys secure</h4>
          <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
            Do not share your API keys in publicly accessible areas such as GitHub, client-side code, and so forth.
            Keys will only be fully visible immediately after creation.
          </p>
        </div>
      </div>
    </div>
  );
}
