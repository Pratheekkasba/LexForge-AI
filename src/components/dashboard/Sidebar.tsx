import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Key,
  Building2, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  PlaySquare,
  Book
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { userProfile, logout } = useAuth();

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'API Keys', href: '/dashboard/api-keys', icon: Key },
    { name: 'API Playground', href: '/dashboard/playground', icon: PlaySquare },
    { name: 'API Docs', href: '/dashboard/api-docs', icon: Book },
  ];

  const adminNav = [
    { name: 'Organization', href: '/dashboard/org', icon: Building2 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const isAdminOrOwner = userProfile?.role === 'admin' || userProfile?.role === 'owner';
  
  const allNav = isAdminOrOwner ? [...navigation, ...adminNav] : navigation;

  return (
    <motion.aside
      initial={{ width: 240 }}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="h-screen sticky top-0 border-r flex flex-col bg-black/50 backdrop-blur-xl z-20"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="h-16 flex items-center px-4 border-b relative" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <Link to="/dashboard" className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8 object-contain shrink-0" />
          <motion.span 
            initial={{ opacity: 1 }}
            animate={{ opacity: collapsed ? 0 : 1, display: collapsed ? 'none' : 'block' }}
            className="font-bold text-lg" 
            style={{ color: '#E1E0CC' }}
          >
            LexForge AI
          </motion.span>
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-card border rounded-full flex items-center justify-center hover:bg-card-hover transition-colors"
          style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#E1E0CC' }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-1">
          {allNav.map((item) => {
            const isActive = location.pathname === item.href || 
                             (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  isActive ? 'bg-primary/10' : 'hover:bg-white/5'
                }`}
                title={collapsed ? item.name : undefined}
              >
                <item.icon 
                  size={20} 
                  className={`shrink-0 ${isActive ? 'text-primary' : 'opacity-60 group-hover:opacity-100 group-hover:text-primary'}`} 
                  style={{ color: isActive ? '#E1E0CC' : undefined }}
                />
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: collapsed ? 0 : 1, display: collapsed ? 'none' : 'block' }}
                  className={`text-sm font-medium whitespace-nowrap ${isActive ? 'text-primary' : 'text-primary/60 group-hover:text-primary'}`}
                  style={{ color: isActive ? '#E1E0CC' : undefined }}
                >
                  {item.name}
                </motion.span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t mt-auto" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group hover:bg-red-500/10"
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={20} className="shrink-0 text-red-400/70 group-hover:text-red-400" />
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: collapsed ? 0 : 1, display: collapsed ? 'none' : 'block' }}
            className="text-sm font-medium whitespace-nowrap text-red-400/70 group-hover:text-red-400"
          >
            Logout
          </motion.span>
        </button>
      </div>
    </motion.aside>
  );
}
