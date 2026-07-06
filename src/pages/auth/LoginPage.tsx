import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, Loader2 } from 'lucide-react';
import { loginSchema, type LoginFormData } from '../../lib/validators';
import { useAuth } from '../../hooks/useAuth';

export function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password, data.rememberMe);
      navigate('/dashboard');
    } catch {
      // Error handled by AuthContext via toast
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black">
      {/* Background glow */}
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
            Welcome back to LexForge
          </h1>
          <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
            Sign in to access your dashboard and API keys
          </p>
        </div>

        <div className="bg-[#111111] border rounded-2xl p-6 sm:p-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(225, 224, 204, 0.9)' }}>
                Email
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium" style={{ color: 'rgba(225, 224, 204, 0.9)' }}>
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs hover:underline" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                  Forgot password?
                </Link>
              </div>
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

            <div className="flex items-center pt-1 pb-2">
              <input
                {...register('rememberMe')}
                type="checkbox"
                id="rememberMe"
                className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary/50 bg-black/50"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm" style={{ color: 'rgba(225, 224, 204, 0.7)' }}>
                Remember for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 glow-primary disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: '#E1E0CC', color: '#000' }}
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : (
                <>Sign in <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center before:flex-1 before:border-t before:border-white/10 after:flex-1 after:border-t after:border-white/10">
            <span className="px-3 text-xs uppercase" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>Or</span>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-colors hover:bg-white/5 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}
          >
            {isGoogleLoading ? <Loader2 size={16} className="animate-spin" /> : (
              <>
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in with Google
              </>
            )}
          </button>
        </div>

        <p className="mt-8 text-center text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
          Don't have an account?{' '}
          <Link to="/register" className="font-medium hover:underline transition-colors" style={{ color: '#E1E0CC' }}>
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
