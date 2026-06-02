import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-surface text-on-surface min-h-screen font-sans flex items-center justify-center p-4">
      {/* Absolute Back Button */}
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-secondary hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        <span className="font-label-sm uppercase tracking-widest">Back to Home</span>
      </Link>

      <div className="w-full max-w-[440px] bg-surface-container-low border border-outline-variant/30 rounded-[24px] p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[64px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="text-center mb-8 relative z-10">
          <h2 className="font-headline-lg text-[32px] text-primary mb-2">Welcome back</h2>
          <p className="font-body-md text-secondary">Sign in to manage your BrandEazy devices and view orders.</p>
        </div>

        <button 
          type="button"
          onClick={() => navigate('/admin')}
          className="w-full bg-white text-black border border-outline-variant/30 py-4 rounded-xl font-label-sm uppercase tracking-widest hover:bg-gray-50 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3 relative z-10 cursor-pointer"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="mt-8 text-center relative z-10">
          <p className="font-body-md text-sm text-secondary">
            Don't have an account? <Link to="/buy" className="text-primary hover:underline">Get your card</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
