import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  useEffect(() => {
    // Scroll Reveal Animation for the Card and Content
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-card').forEach(el => observer.observe(el));

    // Parallax effect for the Hero Card
    const handleScroll = () => {
        const card = document.getElementById('hero-card-container');
        if (card) {
            const scroll = window.scrollY;
            if (scroll < 1000) {
                card.style.transform = `translateY(${scroll * 0.1}px) rotateX(${scroll * 0.02}deg)`;
            }
        }

        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('py-2', 'shadow-sm');
                nav.classList.remove('py-4');
            } else {
                nav.classList.remove('py-2', 'shadow-sm');
                nav.classList.add('py-4');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
        observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* Top Navigation Shell */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 transition-all duration-500 py-4">
        <div className="flex justify-between items-center max-w-[1440px] mx-auto px-margin-desktop">
          <Link to="/" className="font-headline-lg text-[24px] font-black tracking-tighter text-tertiary">BrandEazy</Link>
          <div className="hidden md:flex gap-10 items-center">
            <a className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold" href="#">Product</a>
            <a className="font-label-sm text-label-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-300" href="#">Features</a>
            <a className="font-label-sm text-label-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-300" href="#">Security</a>
            <a className="font-label-sm text-label-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-300" href="#">Support</a>
            <Link to="/login" className="font-label-sm text-label-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-300 font-bold">Login</Link>
          </div>
          <Link to="/buy" className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
            Buy Now
          </Link>
        </div>
      </nav>

      {/* Hero Section: Cinematic Typography */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-32 px-margin-mobile md:px-margin-desktop text-center bg-surface">
        <h1 className="font-display-xl text-headline-lg-mobile md:text-display-xl text-primary mb-6 max-w-4xl mx-auto opacity-0 translate-y-8 animate-[fadeInUp_1s_ease_forwards]">
            The Identity. Redefined.
        </h1>
        <p className="font-body-lg text-body-md md:text-body-lg text-secondary max-w-2xl mx-auto mb-16 opacity-0 translate-y-8 animate-[fadeInUp_1s_ease_0.3s_forwards]">
            Experience precision engineering in the palm of your hand. A single touch to connect, impress, and grow.
        </p>

        {/* Floating Card Visual Anchor */}
        <div className="relative w-full max-w-3xl aspect-[1.586/1] mt-12 reveal-card active" id="hero-card-container">
          <div className="absolute inset-0 bg-tertiary rounded-[24px] overflow-hidden nfc-card-shadow border border-white/10 group">
            {/* Card Interior Design */}
            <div className="absolute top-8 left-8">
              <div className="font-headline-lg text-[28px] font-black tracking-tighter text-white opacity-40">BrandEazy</div>
            </div>
            <div className="absolute bottom-8 left-8 text-left">
              <p className="text-white/40 font-label-sm tracking-widest uppercase mb-1">Founder &amp; CEO</p>
              <p className="text-white font-headline-lg text-[24px]">Alexander Sterling</p>
            </div>
            <div className="absolute top-8 right-8">
              <span className="material-symbols-outlined text-white/40 text-[48px]">contactless</span>
            </div>
            {/* Subtle Texture/Metal Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.4),transparent)]"></div>
          </div>
          {/* Reflections Overlay */}
          <div className="absolute inset-0 rounded-[24px] pointer-events-none opacity-20 bg-gradient-to-b from-white/10 to-transparent"></div>
        </div>
      </section>

      {/* Process Section: Line Art Frame */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto bg-surface">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="group p-8 text-center md:text-left">
            <div className="w-16 h-16 mb-8 mx-auto md:mx-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[48px]">touch_app</span>
            </div>
            <h3 className="font-headline-lg text-[28px] mb-4 text-primary">Tap.</h3>
            <p className="font-body-md text-secondary">Effortless proximity interaction. One touch triggers an instant digital handshake with any modern device.</p>
          </div>
          <div className="group p-8 text-center md:text-left">
            <div className="w-16 h-16 mb-8 mx-auto md:mx-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[48px]">visibility</span>
            </div>
            <h3 className="font-headline-lg text-[28px] mb-4 text-primary">Review.</h3>
            <p className="font-body-md text-secondary">Present your curated professional universe in a format optimized for immediate retention and impact.</p>
          </div>
          <div className="group p-8 text-center md:text-left">
            <div className="w-16 h-16 mb-8 mx-auto md:mx-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[48px]">send</span>
            </div>
            <h3 className="font-headline-lg text-[28px] mb-4 text-primary">Post.</h3>
            <p className="font-body-md text-secondary">Integrated social synchronization ensures your new connection follows your journey across every platform.</p>
          </div>
        </div>
      </section>

      {/* Asymmetric Feature Section: The Precision Lens */}
      <section className="py-section-gap bg-surface overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-2 items-center gap-section-gap">
          <div className="order-2 lg:order-1">
            <div className="space-y-12">
              <div className="border-l-2 border-primary pl-8">
                <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-2">Build Quality</h4>
                <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Industrial Grade Steel</h2>
                <p className="font-body-md text-secondary">Laser-etched and diamond-cut. Each BrandEazy card is a piece of hardware designed to last a lifetime.</p>
              </div>
              <div className="border-l-2 border-outline-variant pl-8">
                <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-2">Connectivity</h4>
                <h2 className="font-headline-lg text-headline-lg text-primary mb-4">NXP® Trimension™ Tech</h2>
                <p className="font-body-md text-secondary">Proprietary antenna design ensures 360-degree connectivity even through thick phone cases.</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative h-[600px] flex items-center justify-center">
            <div className="absolute w-[120%] h-[120%] bg-surface-container-low rounded-full scale-150"></div>
            <img 
              alt="Close-up detailed view of a black metal NFC business card" 
              className="relative z-10 w-full object-cover rounded-xl shadow-2xl" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5-Y9DjY5vCmKC8kZyXpqj8eqXA2jhQ-MZNoSoMwuoAULshed2ynRl2904bVw2YrCFVvAm0964ouhhrrLJNNxWfv8lc1phKC6-m-cIIAyuI_HkvsyodOTVbmd3-Ny36JWJIg4L0WJ4dEaXpU2rmuretMBqD0KmkH2-Jr_1WRhflPs0Zmz26vqCA4dZDHZiCd7YtfIVBUR3bJlXB1pf2S60dut8_CjcKmCsXH7kv7WVyGoJmKU7qEbco_saZWrXewiWbt6zMKDeAy0"
            />
          </div>
        </div>
      </section>

      {/* Bento Grid Gallery */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-gutter h-[800px] max-md:h-auto">
          <div className="md:col-span-2 md:row-span-2 bg-surface-container-low rounded-xl overflow-hidden group relative max-md:h-[400px]">
            <img 
              alt="A professional business person holding a sleek black metal card" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGPvKudWItmv-aZ0JXQB3f07I8-XTabJTYRkw-EcVQc1leZfmQnCXawiOUXRApaUAFP0B-GpZQxT70KenxAl17_cIPywDlXt7fDHWSozgDQ24MPecjM2Umv8o8fKGaQkbkIR2jFWBkz0Eubz479WsTAmF8dRNLsTZvEmHtp7twWWJ20sFZ-8lL1NprKQ-sBCTX6zvVVWEaA2oqC9cnbFjjms2F3oBoVvCuzA4h5SD0JDCAmuKd3BWL2k3cJuq8IBTT0WNBrxv7Cj8"
            />
            <div className="absolute bottom-8 left-8 text-primary">
              <p className="font-label-sm uppercase tracking-widest mb-2">Performance</p>
              <h4 className="font-headline-lg text-[24px]">Instant Impression</h4>
            </div>
          </div>
          <div className="md:col-span-2 bg-surface-container-high rounded-xl overflow-hidden relative group max-md:h-[300px]">
            <img 
              alt="A close up of a phone screen receiving a digital business card via NFC." 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_ZPHqRJFfxM4RqB7NXn_3inC4IlBcD5_JrhYWmuljOHc__qFPaHwbSPGipd_G4f0SGcSKSXLSBhOcSJBBtDQBCYqXTPXOLH1NneS4KzOSzX463TepY_FJjz-1BS2p-QNLp9EWAqVbOwKX1kbhQgPJzeJh3ycVosIGdBYwKeR_XqbHLH7kOLMOdcxZzk6mgFKs8agnjgbTf3HC1UvlC6l0G5SX6fJhvm5RPMPH8a5aWS4FfRwBuwbDKAurq-dqpGAo3XHwPMieMFU"
            />
          </div>
          <div className="bg-primary rounded-xl flex flex-col justify-center p-8 text-on-primary max-md:h-[200px]">
            <h5 className="font-display-lg text-[48px] leading-none mb-2">99%</h5>
            <p className="font-label-sm uppercase tracking-widest">Device Compatibility</p>
          </div>
          <div className="bg-surface-container rounded-xl flex flex-col justify-center p-8 border border-outline-variant/30 max-md:h-[200px]">
            <h5 className="font-display-lg text-[48px] leading-none mb-2">24k+</h5>
            <p className="font-label-sm uppercase tracking-widest">Active Users</p>
          </div>
        </div>
      </section>

      {/* Footer Shell */}
      <footer className="w-full py-section-gap border-t border-outline-variant/30 bg-surface">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter max-w-[1440px] mx-auto px-margin-desktop">
          <div className="col-span-2">
            <div className="font-headline-lg text-headline-lg font-black text-tertiary mb-6">BrandEazy</div>
            <p className="font-body-md text-secondary max-w-xs">Precision engineered networking for the modern professional. Join the elite circle.</p>
          </div>
          <div>
            <h6 className="font-label-sm uppercase tracking-widest text-primary mb-6">Product</h6>
            <ul className="space-y-4 font-body-md text-secondary">
              <li className="hover:text-primary transition-colors cursor-pointer">Metal Cards</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Custom Kits</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Enterprise</li>
            </ul>
          </div>
          <div>
            <h6 className="font-label-sm uppercase tracking-widest text-primary mb-6">Company</h6>
            <ul className="space-y-4 font-body-md text-secondary">
              <li className="hover:text-primary transition-colors cursor-pointer">Sustainability</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Investors</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Careers</li>
            </ul>
          </div>
          <div>
            <h6 className="font-label-sm uppercase tracking-widest text-primary mb-6">Support</h6>
            <ul className="space-y-4 font-body-md text-secondary">
              <li className="hover:text-primary transition-colors cursor-pointer">Accessibility</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Help Center</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h6 className="font-label-sm uppercase tracking-widest text-primary mb-6">Legal</h6>
            <ul className="space-y-4 font-body-md text-secondary">
              <li className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-margin-desktop mt-section-gap pt-8 border-t border-outline-variant/10 text-center md:text-left">
          <p className="text-secondary font-body-md">© 2024 BrandEazy NFC. Designed for Precision.</p>
        </div>
      </footer>
    </div>
  )
}
