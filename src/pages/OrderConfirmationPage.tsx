import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function OrderConfirmationPage() {
  useEffect(() => {
    // Subtle entrance animation on load
    const el = document.getElementById('confirmation-container')
    if (el) {
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }
  }, [])

  const trackingSteps = [
    { name: 'Order Placed', status: 'completed', date: 'Today, 2:45 PM' },
    { name: 'Processing', status: 'current', date: 'In Progress' },
    { name: 'Laser Engraving', status: 'upcoming', date: 'Est. Tomorrow' },
    { name: 'Shipped', status: 'upcoming', date: 'Pending' },
    { name: 'Delivered', status: 'upcoming', date: 'Pending' }
  ]

  return (
    <div className="bg-surface text-on-surface min-h-screen font-sans">
      {/* Top Navigation Shell */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 py-4 transition-all duration-500">
        <div className="flex justify-between items-center max-w-[1440px] mx-auto px-margin-desktop">
          <Link to="/" className="font-headline-lg text-[24px] font-black tracking-tighter text-tertiary">BrandEazy</Link>
          <div className="hidden md:flex gap-10 items-center">
             <Link to="/" className="font-label-sm text-label-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-300">Back to Home</Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop min-h-screen bg-surface flex flex-col items-center justify-center">
        <div 
          id="confirmation-container"
          className="max-w-[800px] w-full space-y-12 opacity-0 translate-y-12 transition-all duration-1000 ease-out"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/10 text-emerald-500 mb-2 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
              <span className="material-symbols-outlined text-[48px]">check_circle</span>
            </div>
            <h1 className="font-headline-lg text-[40px] md:text-[56px] text-primary leading-tight tracking-tight">Order Confirmed.</h1>
            <p className="font-body-md text-secondary max-w-lg mx-auto">Your premium NFC card is being prepared for manufacturing. We will notify you once it ships.</p>
            <div className="inline-block px-6 py-2 rounded-full border border-outline-variant/50 bg-surface-container-low font-mono text-sm text-secondary tracking-widest mt-4">
              ORDER #BE-84729
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-[24px] p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
            
            <h3 className="font-headline-lg text-[24px] text-primary mb-8 border-b border-outline-variant/30 pb-6 relative z-10">Track Your Order</h3>
            
            <div className="relative z-10">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex gap-6 relative">
                  {/* Vertical Line connecting steps */}
                  {index !== trackingSteps.length - 1 && (
                    <div className={`absolute top-8 left-3 w-0.5 h-full -ml-px ${step.status === 'completed' ? 'bg-emerald-500' : 'bg-outline-variant'}`}></div>
                  )}
                  
                  {/* Status Indicator */}
                  <div className={`relative flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1 bg-surface-container-low border-2 z-10 ${step.status === 'completed' ? 'border-emerald-500' : (step.status === 'current' ? 'border-blue-500' : 'border-outline-variant/50')}`}>
                    {step.status === 'completed' && (
                      <div className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </div>
                    )}
                    {step.status === 'current' && (
                      <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] animate-pulse"></div>
                    )}
                    {step.status === 'upcoming' && (
                      <div className="w-2 h-2 rounded-full bg-outline-variant/50"></div>
                    )}
                  </div>
                  
                  {/* Step Info */}
                  <div className="pb-10">
                    <h4 className={`font-headline-lg text-[18px] mb-1 ${step.status === 'upcoming' ? 'text-secondary' : 'text-primary'}`}>
                      {step.name}
                    </h4>
                    <p className="font-body-md text-sm text-secondary opacity-80">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details Summary */}
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-[16px] p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-label-sm uppercase tracking-widest text-secondary mb-3">Shipping To</h4>
                <p className="font-body-md text-primary leading-relaxed">
                  Alexander Sterling<br />
                  123 Innovation Drive<br />
                  Tech Park, Block B<br />
                  Bangalore, KA 560100
                </p>
              </div>
              <div>
                <h4 className="font-label-sm uppercase tracking-widest text-secondary mb-3">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between font-body-md text-primary">
                    <span>1x Metal Card (Matte Black)</span>
                    <span>₹2,499</span>
                  </div>
                  <div className="flex justify-between font-body-md text-secondary">
                    <span>Express Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-body-md font-semibold text-primary pt-2 border-t border-outline-variant/30">
                    <span>Total Paid</span>
                    <span>₹2,499</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
             <Link to="/" className="inline-block bg-transparent border border-outline-variant text-primary px-8 py-3 rounded-xl font-label-sm uppercase tracking-widest hover:bg-surface-container-highest transition-colors cursor-pointer">
               Return to Home
             </Link>
          </div>

        </div>
      </section>
    </div>
  )
}
