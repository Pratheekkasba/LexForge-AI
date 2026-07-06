import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ContactSales() {
  return (
    <section className="py-24 bg-black border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border flex items-center justify-center mx-auto mb-8" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <Mail size={24} style={{ color: '#E1E0CC' }} />
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: '#E1E0CC' }}>
          Need a custom solution?
        </h2>
        <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
          For volume discounts, custom SLAs, or specialized fine-tuning, our enterprise sales team is ready to help you build the perfect package.
        </p>
        <Link 
          to="/contact" 
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium transition-all bg-white/5 hover:bg-white/10 border"
          style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }}
        >
          Contact Sales <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
