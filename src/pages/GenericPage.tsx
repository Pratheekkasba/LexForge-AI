import { motion } from 'framer-motion';

export function GenericPage({ title }: { title: string }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6" style={{ color: '#E1E0CC' }}>
          {title}
        </h1>
        <p className="text-lg md:text-xl" style={{ color: 'rgba(225, 224, 204, 0.6)' }}>
          This page is currently under development. Content for {title} will be available soon.
        </p>
      </motion.div>
    </div>
  );
}
