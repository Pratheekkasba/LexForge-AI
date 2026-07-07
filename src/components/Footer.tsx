import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';


function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const footerLinks = [
  {
    heading: 'Product',
    links: [
      { label: 'Product', href: '/product' },
      { label: 'Platform', href: '/platform' },
      { label: 'API', href: '/api' },
      { label: 'Developers', href: '/developers' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Enterprise', href: '/enterprise' },
    ],
  },
  {
    heading: 'Developers',
    links: [
      { label: 'Documentation', href: '/documentation' },
      { label: 'API Reference', href: '/api' },
      { label: 'SDKs', href: '/sdks' },
      { label: 'GitHub', href: '/github' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Security', href: '/security' },
      { label: 'Compliance', href: '/compliance' },
      { label: 'DPA', href: '/dpa' },
    ],
  },
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer id="footer" ref={ref} className="relative border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>


      {/* Links Grid */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {footerLinks.map((group, i) => (
              <motion.div
                key={group.heading}
                id={group.heading.toLowerCase()}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.4 + i * 0.08,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <h4
                  className="text-xs font-bold uppercase tracking-wider mb-4"
                  style={{ color: 'rgba(225, 224, 204, 0.35)' }}
                >
                  {group.heading}
                </h4>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('http') ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm transition-colors duration-300"
                          style={{ color: 'rgba(225, 224, 204, 0.5)' }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.5)')}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm transition-colors duration-300"
                          style={{ color: 'rgba(225, 224, 204, 0.5)' }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.5)')}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.04)' }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="LexForge AI Logo" className="w-8 h-8 opacity-50 object-contain" />
            <span className="text-sm font-medium" style={{ color: 'rgba(225, 224, 204, 0.4)' }}>
              LexForge AI
            </span>
            <span className="text-xs" style={{ color: 'rgba(225, 224, 204, 0.2)' }}>
              © {new Date().getFullYear()}
            </span>
            <span className="text-xs ml-1" style={{ color: 'rgba(225, 224, 204, 0.25)' }}>
              · Made in India 🇮🇳
            </span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="transition-colors duration-300"
              style={{ color: 'rgba(225, 224, 204, 0.3)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.3)')}
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="#"
              className="transition-colors duration-300"
              style={{ color: 'rgba(225, 224, 204, 0.3)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.3)')}
            >
              <LinkedinIcon size={16} />
            </a>
            <div className="flex items-center gap-1.5 ml-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-subtle" />
              <span className="text-[10px]" style={{ color: 'rgba(225, 224, 204, 0.3)' }}>
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
