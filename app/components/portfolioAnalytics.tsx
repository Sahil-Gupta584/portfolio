"use client";
import { motion } from "framer-motion";

const PortfolioAnalytics = () => {
  return (
    <section
      id="analytics"
      className="w-full min-h-screen container mx-auto px-6 py-24 relative aurora-bg overflow-hidden"
    >
      <div className="aurora-blob aurora-blob--indigo animate-aurora" style={{ width: 320, height: 320, top: "5%", left: "20%" }} />

      <motion.div
        className="text-center mb-14 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-muted-foreground text-sm font-medium">Real-time</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
          Live <span className="gradient-text">Analytics</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
          This very page is tracked with Insightly — see who&apos;s visiting right now.
        </p>
      </motion.div>

      <motion.div
        className="card-glow premium-card p-3 max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <iframe
          className="insightly-p1xt w-full"
          src="https://www.insightly.live/share/696910f1002380fbed37/location?duration=last_7_days&primaryColor=%236366F1&bgColor=%23FAFAF9&showLive=true"
          title="Live analytics"
        />
      </motion.div>
    </section>
  );
};

export default PortfolioAnalytics;
