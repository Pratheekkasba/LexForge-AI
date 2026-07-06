import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../../lib/validators';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

export function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await resetPassword(data.email);
      setIsSubmitted(true);
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
            Reset password
          </h1>
          <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <div className="bg-[#111111] border rounded-2xl p-6 sm:p-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2" style={{ color: '#E1E0CC' }}>Check your email</h3>
              <p className="text-sm mb-6" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                We sent a password reset link to your email address.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-sm font-medium hover:underline transition-colors"
                style={{ color: '#E1E0CC' }}
              >
                Try another email
              </button>
            </motion.div>
          ) : (
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 glow-primary disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: '#E1E0CC', color: '#000' }}
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Send reset link'}
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-sm font-medium hover:underline transition-colors" 
            style={{ color: 'rgba(225, 224, 204, 0.6)' }}
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
