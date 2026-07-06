import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User, Loader2 } from 'lucide-react';
import { registerSchema, type RegisterFormData } from '../../lib/validators';
import { useAuth } from '../../hooks/useAuth';

export function RegisterPage() {
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerAuth(data.email, data.password, data.name);
      navigate('/dashboard');
    } catch {
      // Error handled by AuthContext via toast
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <img src="/logo.svg" alt="Logo" className="w-12 h-12 mx-auto" />
          </Link>
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#E1E0CC' }}>
            Create your account
          </h1>
          <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
            Start building with LexForge AI today
          </p>
        </div>

        <div className="bg-[#111111] border rounded-2xl p-6 sm:p-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(225, 224, 204, 0.9)' }}>
                Full Name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                <input
                  {...register('name')}
                  type="text"
                  placeholder="John Doe"
                  className={`w-full pl-10 pr-4 py-2.5 bg-black/50 border rounded-xl text-sm transition-colors focus:outline-none focus:ring-1 ${
                    errors.name ? 'border-red-500/50 focus:ring-red-500/50' : 'focus:ring-primary/50'
                  }`}
                  style={{ borderColor: errors.name ? undefined : 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}
                />
              </div>
              {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(225, 224, 204, 0.9)' }}>
                Work Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="name@company.com"
                  className={`w-full pl-10 pr-4 py-2.5 bg-black/50 border rounded-xl text-sm transition-colors focus:outline-none focus:ring-1 ${
                    errors.email ? 'border-red-500/50 focus:ring-red-500/50' : 'focus:ring-primary/50'
                  }`}
                  style={{ borderColor: errors.email ? undefined : 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(225, 224, 204, 0.9)' }}>
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                <input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-2.5 bg-black/50 border rounded-xl text-sm transition-colors focus:outline-none focus:ring-1 ${
                    errors.password ? 'border-red-500/50 focus:ring-red-500/50' : 'focus:ring-primary/50'
                  }`}
                  style={{ borderColor: errors.password ? undefined : 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}
                />
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(225, 224, 204, 0.9)' }}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                <input
                  {...register('confirmPassword')}
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-2.5 bg-black/50 border rounded-xl text-sm transition-colors focus:outline-none focus:ring-1 ${
                    errors.confirmPassword ? 'border-red-500/50 focus:ring-red-500/50' : 'focus:ring-primary/50'
                  }`}
                  style={{ borderColor: errors.confirmPassword ? undefined : 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}
                />
              </div>
              {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 glow-primary disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: '#E1E0CC', color: '#000' }}
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : (
                <>Create account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs" style={{ color: 'rgba(225, 224, 204, 0.5)' }}>
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-primary">Terms of Service</Link> and{' '}
            <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
        </div>

        <p className="mt-8 text-center text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-medium hover:underline transition-colors" style={{ color: '#E1E0CC' }}>
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
