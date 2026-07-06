import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Plus, Building2, Shield, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useOrganization } from '../../hooks/useOrganization';

export function OrganizationPage() {
  const { userProfile } = useAuth();
  const { organization, isLoading } = useOrganization();
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const isAdminOrOwner = userProfile?.role === 'admin' || userProfile?.role === 'owner';

  if (isLoading) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center min-h-[400px]">
        <Loader2 size={32} className="animate-spin text-primary/50" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: '#E1E0CC' }}>Organization</h1>
        <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
          Manage your organization settings and team members.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Members Table */}
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#111111' }}>
            <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: '#E1E0CC' }}>Team Members</h3>
                <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                  {organization?.members?.length || 0} members in {organization?.name || 'your organization'}
                </p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>Member</th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>Role</th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {organization?.members?.map((member, i) => (
                    <tr key={member.uid} className="transition-colors hover:bg-white/[0.02]" style={{ borderBottom: i !== organization.members.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users size={14} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium" style={{ color: '#E1E0CC' }}>{member.name}</p>
                            <p className="text-xs" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs uppercase tracking-wider font-semibold border ${
                          member.role === 'owner' ? 'bg-primary/10 text-primary border-primary/20' :
                          member.role === 'admin' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          'bg-white/5 text-white/70 border-white/10'
                        }`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                        {member.joinedAt ? new Date((member.joinedAt as any).toDate?.() || member.joinedAt).toLocaleDateString() : 'Just now'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Invite form */}
          {isAdminOrOwner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl border"
              style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <h3 className="font-semibold mb-2" style={{ color: '#E1E0CC' }}>Invite Member</h3>
              <p className="text-sm mb-4" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                Send an invitation to join {organization?.name || 'your team'}.
              </p>
              
              <form onSubmit={(e) => { e.preventDefault(); setIsInviting(true); setTimeout(() => setIsInviting(false), 1000); }} className="space-y-4">
                <div>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full pl-9 pr-4 py-2 bg-black/50 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
                      style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                  <select
                    className="w-full pl-9 pr-4 py-2 bg-black/50 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors appearance-none"
                    style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}
                  >
                    <option value="developer">Developer</option>
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!inviteEmail || isInviting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 glow-primary disabled:opacity-50"
                  style={{ background: '#E1E0CC', color: '#000' }}
                >
                  {isInviting ? <Loader2 size={16} className="animate-spin" /> : <><Plus size={16} /> Send Invite</>}
                </button>
              </form>
            </motion.div>
          )}

          {/* Org Info */}
          <div className="p-6 rounded-2xl border" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/5 border flex items-center justify-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <Building2 size={20} style={{ color: '#E1E0CC' }} />
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: '#E1E0CC' }}>{organization?.name || 'Organization'}</h3>
                <p className="text-xs uppercase tracking-wider font-semibold text-primary mt-0.5">
                  {organization?.subscription} Plan
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <span className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>Org ID</span>
                <span className="text-sm font-mono" style={{ color: '#E1E0CC' }}>{organization?.id || '---'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <span className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>Created</span>
                <span className="text-sm" style={{ color: '#E1E0CC' }}>
                  {organization?.createdAt ? new Date((organization.createdAt as any).toDate?.() || organization.createdAt).toLocaleDateString() : '---'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
