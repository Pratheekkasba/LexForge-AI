import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, userProfile, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user && !userProfile) return null;

  const displayName = userProfile?.name || user?.displayName || 'User';
  const displayEmail = userProfile?.email || user?.email || '';
  const displayPhoto = userProfile?.photo || user?.photoURL || '';
  const displayRole = userProfile?.role || 'member';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-white/5 transition-colors border"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {displayPhoto ? (
          <img src={displayPhoto} alt={displayName} className="w-8 h-8 rounded-full" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <User size={16} className="text-primary" />
          </div>
        )}
        <span className="text-sm font-medium hidden md:block" style={{ color: '#E1E0CC' }}>
          {displayName}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 rounded-xl border bg-card shadow-xl overflow-hidden z-50"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <p className="text-sm font-medium" style={{ color: '#E1E0CC' }}>{displayName}</p>
              <p className="text-xs truncate opacity-60" style={{ color: '#E1E0CC' }}>{displayEmail}</p>
              <div className="mt-2 inline-flex px-2 py-0.5 rounded text-xs uppercase tracking-wider font-semibold bg-primary/10 text-primary border border-primary/20">
                {displayRole}
              </div>
            </div>
            
            <div className="py-1">
              <Link
                to="/dashboard/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                onClick={() => setIsOpen(false)}
              >
                <Settings size={16} />
                Profile Settings
              </Link>
            </div>
            
            <div className="py-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-red-500/10 text-red-400 transition-colors"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
