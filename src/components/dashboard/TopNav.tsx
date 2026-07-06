import { Search, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { ProfileDropdown } from './ProfileDropdown';

export function TopNav() {
  const location = useLocation();
  
  // Format pathname into title
  const pathParts = location.pathname.split('/').filter(Boolean);
  let title = 'Overview';
  if (pathParts.length > 1) {
    const lastPart = pathParts[pathParts.length - 1];
    title = lastPart.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  return (
    <header 
      className="h-16 border-b flex items-center justify-between px-6 sticky top-0 bg-black/50 backdrop-blur-xl z-10"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold" style={{ color: '#E1E0CC' }}>
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-1.5 rounded-full bg-white/5 border text-sm focus:outline-none focus:ring-1 transition-all w-64"
            style={{ 
              borderColor: 'rgba(255,255,255,0.1)', 
              color: '#E1E0CC',
              '--tw-ring-color': '#DEDBC8'
            } as React.CSSProperties}
          />
        </div>
        
        <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors">
          <Bell size={18} style={{ color: 'rgba(225, 224, 204, 0.8)' }} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary border-2 border-black" />
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />
        
        <ProfileDropdown />
      </div>
    </header>
  );
}
