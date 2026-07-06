import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

const legalNavigation = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Security Architecture', href: '/security' },
  { name: 'Compliance & SOC', href: '/compliance' },
  { name: 'Data Processing Agreement', href: '/dpa' },
];

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-32 space-y-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>
                  Legal & Trust
                </h3>
                <nav className="space-y-1">
                  {legalNavigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block py-2 text-sm transition-colors ${
                          isActive 
                            ? 'font-medium text-[#E1E0CC]' 
                            : 'text-white/40 hover:text-white/80'
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="p-4 rounded-xl border bg-white/[0.02]" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <h4 className="text-sm font-medium mb-2" style={{ color: '#E1E0CC' }}>Questions?</h4>
                <p className="text-xs mb-4 leading-relaxed" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>
                  Our legal team is available to assist enterprise customers with custom DPAs.
                </p>
                <Link to="/contact" className="text-xs font-medium hover:underline" style={{ color: '#E1E0CC' }}>
                  Contact Legal Team →
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-[1.1]" style={{ color: '#E1E0CC' }}>
                {title}
              </h1>
              <p className="text-sm mb-12 pb-12 border-b" style={{ color: 'rgba(225, 224, 204, 0.4)', borderColor: 'rgba(255,255,255,0.06)' }}>
                Last updated: {lastUpdated}
              </p>

              <div 
                className="prose prose-invert prose-p:text-white/60 prose-p:leading-relaxed prose-headings:text-[#E1E0CC] prose-headings:font-semibold prose-a:text-[#E1E0CC] prose-li:text-white/60 max-w-none space-y-8"
              >
                {children}
              </div>
            </motion.div>
          </main>

        </div>
      </div>
    </div>
  );
}
