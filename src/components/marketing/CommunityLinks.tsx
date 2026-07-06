import { Code2, MessageSquare, BookOpen } from 'lucide-react';

export function CommunityLinks() {
  const links = [
    { title: 'GitHub', desc: 'Contribute to our SDKs and explore open-source examples.', icon: Code2, href: '/github' },
    { title: 'Discord', desc: 'Join 10,000+ developers building the future of legal tech.', icon: MessageSquare, href: '#' },
    { title: 'Guides', desc: 'Deep-dive tutorials and architectural patterns.', icon: BookOpen, href: '/documentation' }
  ];

  return (
    <section className="py-24 bg-[#111111] border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map((link) => (
            <a 
              key={link.title} 
              href={link.href}
              className="p-6 rounded-2xl border bg-black hover:bg-white/5 transition-colors group flex items-start gap-4"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <link.icon size={18} style={{ color: '#E1E0CC' }} />
              </div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: '#E1E0CC' }}>{link.title}</h3>
                <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>{link.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
