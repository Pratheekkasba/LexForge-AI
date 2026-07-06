import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Loader2, Save } from 'lucide-react';
import { profileSchema, type ProfileFormData } from '../../lib/validators';
import { useAuth } from '../../hooks/useAuth';
import { useUpdateDocument } from '../../hooks/useFirestore';
import toast from 'react-hot-toast';

export function SettingsPage() {
  const { userProfile } = useAuth();
  const updateProfileMutation = useUpdateDocument('users');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userProfile?.name || '',
      email: userProfile?.email || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    if (!userProfile) return;
    try {
      await updateProfileMutation.mutateAsync({
        id: userProfile.uid,
        data: { name: data.name },
      });
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: '#E1E0CC' }}>Profile Settings</h1>
        <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
          Manage your personal information and preferences.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl border" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.08)' }}>
        <h3 className="font-semibold mb-6" style={{ color: '#E1E0CC' }}>Personal Information</h3>
        
        <div className="flex items-center gap-6 mb-8 pb-8 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            {userProfile?.photo ? (
              <img src={userProfile.photo} alt="Profile" className="w-full h-full rounded-full" />
            ) : (
              <User size={32} className="text-primary" />
            )}
          </div>
          <div>
            <button className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}>
              Change Avatar
            </button>
            <p className="text-xs mt-2" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>
              JPG, GIF or PNG. 1MB max.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(225, 224, 204, 0.9)' }}>
              Full Name
            </label>
            <input
              {...register('name')}
              type="text"
              className={`w-full px-4 py-2.5 bg-black/50 border rounded-xl text-sm transition-colors focus:outline-none focus:ring-1 ${
                errors.name ? 'border-red-500/50 focus:ring-red-500/50' : 'focus:ring-primary/50'
              }`}
              style={{ borderColor: errors.name ? undefined : 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(225, 224, 204, 0.9)' }}>
              Email Address (Cannot be changed)
            </label>
            <input
              {...register('email')}
              type="email"
              disabled
              className="w-full px-4 py-2.5 bg-black/50 border rounded-xl text-sm opacity-50 cursor-not-allowed"
              style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || updateProfileMutation.isPending}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 glow-primary disabled:opacity-70"
            style={{ background: '#E1E0CC', color: '#000' }}
          >
            {isSubmitting || updateProfileMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <><Save size={16} /> Save Changes</>}
          </button>
        </form>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl border border-red-500/20 bg-red-500/5 mt-8">
        <h3 className="font-semibold text-red-400 mb-2">Danger Zone</h3>
        <p className="text-sm mb-6" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
