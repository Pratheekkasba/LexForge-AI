import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pricing } from '../components/Pricing';
import { FeatureMatrix } from '../components/marketing/FeatureMatrix';
import { PricingFAQ } from '../components/marketing/PricingFAQ';
import { ContactSales } from '../components/marketing/ContactSales';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export function PricingPage() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = async (tierName: string) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLoadingTier(tierName);
    try {
      // Mock subscription logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Successfully subscribed to ${tierName}!`);
    } catch (error) {
      toast.error('Failed to process subscription');
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pt-12 pb-4 text-center px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: '#E1E0CC' }}>
          Flexible Plans for Every Team
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
          Whether you're a solo advocate, a law firm, or a corporate legal team across India, we have a plan designed to scale with your practice.
        </p>
      </motion.div>
      
      <Pricing onSubscribe={handleSubscribe} loadingTier={loadingTier} />
      
      <FeatureMatrix />
      <PricingFAQ />
      <ContactSales />
    </div>
  );
}
