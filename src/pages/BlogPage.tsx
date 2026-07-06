import { MarketingSection, SectionHeader } from '../components/ui/MarketingSection';

export function BlogPage() {
  const posts = [
    {
      title: 'Introducing the next generation of legal reasoning models',
      category: 'Product',
      date: 'Oct 24, 2023',
      excerpt: 'Today we are announcing LexForge-V2, our most capable model for complex contract analysis and legal research.',
    },
    {
      title: 'How we built a secure, zero-retention inference engine',
      category: 'Engineering',
      date: 'Sep 12, 2023',
      excerpt: 'A deep dive into our infrastructure choices and how we guarantee that customer data never trains our foundational models.',
    },
    {
      title: 'SOC 2 Type II Certification Achieved',
      category: 'Security',
      date: 'Aug 05, 2023',
      excerpt: 'LexForge AI has successfully completed its SOC 2 Type II audit, reaffirming our commitment to enterprise security.',
    }
  ];

  return (
    <div className="pt-20">
      <MarketingSection background="black">
        <SectionHeader 
          title="LexForge Blog" 
          description="Updates from the team on product, engineering, and the future of legal technology."
          align="left"
        />

        <div className="max-w-5xl mt-16 space-y-16">
          {posts.map((post) => (
            <article key={post.title} className="group cursor-pointer">
              <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest mb-4">
                <span className="text-primary">{post.category}</span>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                <span style={{ color: 'rgba(225, 224, 204, 0.4)' }}>{post.date}</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors" style={{ color: '#E1E0CC' }}>
                {post.title}
              </h2>
              <p className="text-lg leading-relaxed max-w-3xl" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </MarketingSection>
    </div>
  );
}
