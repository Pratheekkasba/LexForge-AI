import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Users, 
  Building2, 
  LifeBuoy, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield
} from 'lucide-react';
import { TopNav } from './TopNav'; // Reusing TopNav

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Platform Overview', href: '/admin', icon: BarChart },
    { name: 'Organizations', href: '/admin/orgs', icon: Building2 },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Support Tickets', href: '/admin/tickets', icon: LifeBuoy },
    { name: 'Platform Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-black">
      {/* Admin Sidebar */}
      <motion.aside
        initial={{ width: 240 }}
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="h-screen sticky top-0 border-r flex flex-col bg-black/50 backdrop-blur-xl z-20"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="h-16 flex items-center px-4 border-b relative" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <Link to="/dashboard" className="flex items-center gap-3 overflow-hidden whitespace-nowrap group">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors">
              <Shield size={16} className="text-red-400" />
            </div>
            <motion.span 
              initial={{ opacity: 1 }}
              animate={{ opacity: collapsed ? 0 : 1, display: collapsed ? 'none' : 'block' }}
              className="font-bold text-lg text-red-400" 
            >
              LexForge Admin
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
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                    isActive ? 'bg-red-500/10' : 'hover:bg-white/5'
                  }`}
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon 
                    size={20} 
                    className={`shrink-0 ${isActive ? 'text-red-400' : 'opacity-60 group-hover:opacity-100 group-hover:text-red-400'}`} 
                  />
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: collapsed ? 0 : 1, display: collapsed ? 'none' : 'block' }}
                    className={`text-sm font-medium whitespace-nowrap ${isActive ? 'text-red-400' : 'text-white/60 group-hover:text-red-400'}`}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
           <Link to="/dashboard" className="text-xs text-white/50 hover:text-white transition-colors flex items-center gap-2">
             <ChevronLeft size={12} /> Back to App
           </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
