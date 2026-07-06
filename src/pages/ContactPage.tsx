import { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { WordsPullUpMultiStyle } from '../components/animations';

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API submission
    await new Promise(r => setTimeout(r, 1500));
    toast.success('Message sent successfully. We will get back to you soon.');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <WordsPullUpMultiStyle 
            segments={[{ text: 'Get in touch' }]}
            containerClassName="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          />
          <p className="text-lg" style={{ color: 'rgba(225, 224, 204, 0.7)' }}>
            Our team is here to help you build the future of legal AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-5xl mx-auto">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6" style={{ color: '#E1E0CC' }}>Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border flex items-center justify-center shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <Mail className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: '#E1E0CC' }}>Email Sales</p>
                    <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>sales@lexforge.ai</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border flex items-center justify-center shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <MessageSquare className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: '#E1E0CC' }}>Technical Support</p>
                    <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>support@lexforge.ai</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border flex items-center justify-center shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <Phone className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: '#E1E0CC' }}>Enterprise Office</p>
                    <p className="text-sm" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl border bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#E1E0CC' }}>Enterprise Inquiries</h3>
              <p className="text-sm mb-4" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>Looking for custom deployment, SLA guarantees, or volume pricing?</p>
              <button className="text-sm font-medium transition-colors hover:text-white" style={{ color: '#E1E0CC' }}>
                View Enterprise Plan →
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 rounded-2xl border space-y-6 bg-[#111111]" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <h3 className="text-xl font-semibold mb-6" style={{ color: '#E1E0CC' }}>Send a Message</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>First Name</label>
                <input required type="text" className="w-full px-4 py-3 bg-black/50 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>Last Name</label>
                <input required type="text" className="w-full px-4 py-3 bg-black/50 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>Work Email</label>
              <input required type="email" className="w-full px-4 py-3 bg-black/50 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>Message</label>
              <textarea required rows={4} className="w-full px-4 py-3 bg-black/50 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors resize-none" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }} />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition-all duration-300 glow-primary disabled:opacity-70" style={{ background: '#E1E0CC', color: '#000' }}>
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <><Send size={16} /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
