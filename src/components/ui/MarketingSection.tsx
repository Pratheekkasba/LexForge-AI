import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface MarketingSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  background?: 'black' | 'dark' | 'gradient';
  borderTop?: boolean;
}

export function MarketingSection({ 
  children, 
  id, 
  className = '', 
  background = 'black',
  borderTop = false
}: MarketingSectionProps) {
  const bgStyles = {
    black: 'bg-black',
    dark: 'bg-[#0a0a0a]',
    gradient: 'bg-gradient-to-b from-black to-[#0a0a0a]'
  };

  return (
    <section 
      id={id} 
      className={`relative py-24 md:py-32 ${bgStyles[background]} ${className}`}
    >
      {borderTop && (
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)' }} />
      )}
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ title, description, badge, align = 'center' }: SectionHeaderProps) {
  return (
    <div className={`mb-16 md:mb-24 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest mb-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(225, 224, 204, 0.7)' }}
        >
          {badge}
        </motion.div>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]"
        style={{ color: '#E1E0CC' }}
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl font-normal leading-relaxed"
          style={{ color: 'rgba(225, 224, 204, 0.5)' }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
