import React from 'react'
import { motion } from 'framer-motion'

const PortfolioAnalytics = () => {
    return (
        <section id="analytics" className="w-full min-h-screen container mx-auto px-6 py-20">
            <motion.h2
                className="text-4xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Live Analytics
            </motion.h2>
            <iframe
                className="insightly-p1xt rounded-lg mx-auto"
                src="https://www.insightly.live/share/696910f1002380fbed37/location?duration=last_7_days&primaryColor=%23FF003C&bgColor=%230d0d0f&showLive=true"
            ></iframe>

        </section>)
}

export default PortfolioAnalytics