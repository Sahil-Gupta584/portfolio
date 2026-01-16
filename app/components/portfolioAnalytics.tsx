import React from 'react'

const PortfolioAnalytics = () => {
    return (
        <section id="analytics" className="w-full min-h-screen container mx-auto px-6 py-20">
            <h2 className="text-xl font-bold mb-8 ">Quick Analytics of my portfolio</h2>
            <iframe
                src="https://www.insightly.live/share/696910f1002380fbed37/location?duration=last_7_days&primaryColor=%23006fee&bgColor=%230d0d0f&showLive=true"
                width="100%"
                height="500px"
                className='rounded-lg'
            ></iframe>
        </section>)
}

export default PortfolioAnalytics