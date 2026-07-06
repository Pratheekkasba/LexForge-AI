import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Product', href: '/product' },
  { label: 'Platform', href: '/platform' },
  { label: 'API', href: '/api' },
  { label: 'Developers', href: '/developers' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Documentation', href: '/documentation' },
  { label: 'Enterprise', href: '/enterprise' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <img src="/logo.svg" alt="LexForge AI Logo" className="w-12 h-12 object-contain" />
              </div>
              <span
                className="text-lg font-bold tracking-tight transition-colors duration-300"
                style={{ color: '#E1E0CC' }}
              >
                LexForge<span className="font-light opacity-70 ml-1">AI</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="relative px-3 py-2 text-sm transition-colors duration-300 group"
                  style={{ color: 'rgba(225, 224, 204, 0.6)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.6)')}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-primary/0 group-hover:bg-primary/30 transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 text-sm transition-all duration-300 rounded-lg"
                    style={{ color: 'rgba(225, 224, 204, 0.7)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.7)')}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="px-6 py-2.5 text-sm font-medium rounded-full transition-colors duration-300 hover:bg-white/10"
                    style={{ color: '#E1E0CC', border: '1px solid rgba(255,255,255,0.2)' }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm transition-all duration-300 rounded-lg"
                    style={{ color: 'rgba(225, 224, 204, 0.7)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.7)')}
                  >
                    Login
                  </Link>
                  <Link
                    to="/dashboard"
                    className="px-6 py-2.5 text-sm font-medium rounded-full transition-colors duration-300 hover:bg-white"
                    style={{
                      background: '#E1E0CC',
                      color: '#000000',
                    }}
                  >
                    Get API Key
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: '#E1E0CC' }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Navbar backdrop blur */}
        <div
          className="absolute inset-0 -z-10 border-b transition-all duration-500"
          style={{
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderColor: 'rgba(255,255,255,0.06)',
          }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 pt-20 lg:hidden"
            style={{
              background: 'rgba(0, 0, 0, 0.97)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <div className="flex flex-col items-center gap-2 px-6 py-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full border-b"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <Link
                    to={link.href}
                    className="block w-full text-center py-3 text-lg font-light transition-colors duration-300"
                    style={{ color: 'rgba(225, 224, 204, 0.7)' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-3 mt-6 w-full"
              >
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="py-3 text-base w-full text-center rounded-xl transition-colors"
                      style={{ color: 'rgba(225, 224, 204, 0.7)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onClick={() => setMobileOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                        navigate('/');
                      }}
                      className="py-3 text-base font-medium w-full text-center rounded-xl"
                      style={{ background: 'rgba(255,0,0,0.1)', color: '#ff6b6b' }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="py-3 text-base w-full text-center rounded-xl transition-colors"
                      style={{ color: 'rgba(225, 224, 204, 0.7)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onClick={() => setMobileOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/dashboard"
                      className="py-3 text-base font-medium w-full text-center rounded-xl"
                      style={{ background: '#E1E0CC', color: '#000' }}
                      onClick={() => setMobileOpen(false)}
                    >
                      Get API Key
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
