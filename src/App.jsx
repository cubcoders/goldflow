import { useEffect, useRef, useState } from 'react'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', volume: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [portalOpen, setPortalOpen] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const [portalTab, setPortalTab] = useState('dashboard') // dashboard | purchased | available | reports | billing

  function validate() {
    const e = {}
    if (!form.name) e.name = 'Required'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone) e.phone = 'Required'
    if (!form.company) e.company = 'Required'
    if (!form.volume) e.volume = 'Required'
    return e
  }

  function handleOpenPortal(e) {
    if (e && e.preventDefault) e.preventDefault()
    setPortalOpen(true)
    setPortalTab('dashboard')
    setPortalLoading(true)
    setTimeout(() => setPortalLoading(false), 2500)
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) {
      setSubmitted(true)
      // Submit to API endpoint here
      setTimeout(() => setSubmitted(false), 2500)
    }
  }

  function Counter({ to = 250, prefix = '', suffix = '+', duration = 1400 }) {
    const [val, setVal] = useState(0)
    const ref = useRef(null)
    useEffect(() => {
      const el = ref.current
      if (!el) return
      let started = false
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          const start = performance.now()
          const animate = (t) => {
            const p = Math.min((t - start) / duration, 1)
            setVal(Math.floor(p * to))
            if (p < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      }, { threshold: 0.4 })
      obs.observe(el)
      return () => obs.disconnect()
    }, [to, duration])
    return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>
  }

  return (
    <div id="home" className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-black text-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-extrabold tracking-tight" style={{color:'#C7A246'}}>Precious Leads</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-6">
                <a href="#problem" className="inline-flex items-center pt-1 text-sm font-medium hover:text-gold">Problem</a>
                <a href="#solution" className="inline-flex items-center pt-1 text-sm font-medium hover:text-gold">Solution</a>
                <a href="#how" className="inline-flex items-center pt-1 text-sm font-medium hover:text-gold">How It Works</a>
                <a href="#pricing" className="inline-flex items-center pt-1 text-sm font-medium hover:text-gold">Pricing</a>
                <a href="#faq" className="inline-flex items-center pt-1 text-sm font-medium hover:text-gold">FAQ</a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <a href="#lead-form" onClick={handleOpenPortal} className="px-4 py-2 rounded-lg font-semibold" style={{background:'#C7A246', color:'#111'}}>
                Get Leads Now
              </a>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <a href="#problem" className="block pl-3 pr-4 py-2 text-base font-medium text-white bg-gray-900">Problem</a>
              <a href="#solution" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-200 hover:bg-gray-900">Solution</a>
              <a href="#how" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-200 hover:bg-gray-900">How It Works</a>
              <a href="#pricing" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-200 hover:bg-gray-900">Pricing</a>
              <a href="#faq" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-200 hover:bg-gray-900">FAQ</a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="mt-3 space-y-1">
                  <a href="#lead-form" onClick={handleOpenPortal} className="w-full block px-4 py-2 text-base font-semibold" style={{color:'#C7A246'}}>
                    Get Leads Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-white" aria-label="Hero">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="block animate-slide-up">Get High-Intent Gold Buyer Leads</span>
              <span className="block animate-slide-up animation-delay-200" style={{color:'#C7A246'}}>Starting at Just $2</span>
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 animate-slide-up animation-delay-400">
              We deliver exclusive, verified precious-metal investor leads — including name, phone, email, estimated net worth, and location — in real time.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-600">
              <a href="#lead-form" onClick={handleOpenPortal} className="px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl" style={{background:'#C7A246', color:'#111'}}>Get Leads Now</a>
              <a href="#pricing" className="px-6 py-3 rounded-lg font-semibold border border-black text-black hover:bg-gray-50 hover:scale-105 transition-all duration-300">View Pricing</a>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up animation-delay-800">
                <div className="text-2xl font-bold"><Counter to={250} prefix="$" suffix="M+" /></div>
                <div className="text-sm text-gray-600">Investor requests connected</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up animation-delay-900">
                <div className="text-2xl font-bold"><Counter to={1200} suffix="+" /></div>
                <div className="text-sm text-gray-600">Dealers and advisors served</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up animation-delay-1000">
                <div className="text-2xl font-bold"><Counter to={99} suffix=".9%" /></div>
                <div className="text-sm text-gray-600">Delivery uptime</div>
              </div>
            </div>
            <ul className="mt-8 grid sm:grid-cols-2 gap-3 text-left max-w-3xl mx-auto text-sm text-gray-700">
              <li>• Real buyers actively seeking to purchase gold or silver</li>
              <li>• Filter by state, net worth, or investment interest</li>
              <li>• Exclusive or shared lead options available</li>
              <li>• Real-time delivery via API or spreadsheet</li>
            </ul>
            <div className="mt-8 flex items-center justify-center gap-6 opacity-80">
              <span className="text-xs">BBB</span>
              <span className="text-xs">SSL</span>
              <span className="text-xs">U.S. Verified Data</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center">Tired of Paying $50+ Per Lead for Low-Intent Tire Kickers?</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-8 items-center">
            <p className="text-gray-700 leading-relaxed">
              Most lead vendors overcharge for recycled data. We cut out the fluff — delivering only verified, high-intent prospects actively seeking to invest in precious metals.
            </p>
            <div className="rounded-xl border border-gray-200 p-6 bg-white shadow-soft text-center">
              <div className="text-sm text-gray-500">Funnel</div>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">Broken funnel</div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">Streamlined funnel</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution / Value Proposition */}
      <section id="solution" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center">Verified Gold & Silver Investor Leads That Convert.</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <ul className="space-y-3 text-gray-700">
              <li>• Starting at $2 per lead (volume discounts available)</li>
              <li>• Name, phone, email, location, and estimated net worth included</li>
              <li>• Real-time delivery via API or spreadsheet</li>
              <li>• Leads are actively searching for gold IRA, bullion, or coin purchases</li>
            </ul>
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-6">
              <a href="#pricing" className="inline-block px-6 py-3 rounded-lg font-semibold" style={{background:'#C7A246', color:'#111'}}>View Pricing & Packages</a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center">How It Works</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
              <div className="text-3xl font-extrabold" style={{color:'#C7A246'}}>1</div>
              <p className="mt-2 font-semibold">Choose your targeting</p>
              <p className="text-gray-600 text-sm">State, income, investment type</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
              <div className="text-3xl font-extrabold" style={{color:'#C7A246'}}>2</div>
              <p className="mt-2 font-semibold">We deliver verified leads</p>
              <p className="text-gray-600 text-sm">Daily or weekly</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
              <div className="text-3xl font-extrabold" style={{color:'#C7A246'}}>3</div>
              <p className="mt-2 font-semibold">You close more deals</p>
              <p className="text-gray-600 text-sm">With less effort</p>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-6 text-sm">Data pulled from inbound funnels, opt-ins, and retirement rollover requests.</p>
          <div className="text-center mt-6">
            <a href="#lead-form" className="px-6 py-3 rounded-lg font-semibold" style={{background:'#C7A246', color:'#111'}}>Start Getting Leads Today</a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center">The Most Affordable High-Intent Gold Leads Online.</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Feature</th>
                  <th className="px-4 py-2 text-left">Other Vendors</th>
                  <th className="px-4 py-2 text-left">Our Platform</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-2">Cost per lead</td>
                  <td className="px-4 py-2">$50+</td>
                  <td className="px-4 py-2" style={{color:'#C7A246'}}>From $2</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Verification</td>
                  <td className="px-4 py-2">Limited</td>
                  <td className="px-4 py-2">Multi-point verified</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Data fields</td>
                  <td className="px-4 py-2">Name/email only</td>
                  <td className="px-4 py-2">Full contact + net worth + state</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Delivery speed</td>
                  <td className="px-4 py-2">24–48 hrs</td>
                  <td className="px-4 py-2">Instant</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6">
          <blockquote className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
            <p className="text-lg">“We lowered our lead costs by 90% and doubled conversions.”</p>
            <footer className="mt-3 text-sm text-gray-600">— Gold Dealer, Texas</footer>
          </blockquote>
          <blockquote className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
            <p className="text-lg">“Finally a real lead provider that delivers actual buyers ready to invest.”</p>
            <footer className="mt-3 text-sm text-gray-600">— IRA Specialist, Florida</footer>
          </blockquote>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center">Transparent Pricing. No Contracts.</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[{name:'Starter',qty:100,price:200},{name:'Pro',qty:500,price:850},{name:'Enterprise',qty:1000,price:1500}].map((p)=> (
              <div key={p.name} className="border rounded-xl p-6 shadow-soft">
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="mt-1 text-gray-600">{p.qty} leads</p>
                <div className="mt-4 text-3xl font-extrabold">${p.price}</div>
                <ul className="mt-4 text-sm text-gray-700">
                  <li>• Verified name, phone, email</li>
                  <li>• Location + estimated net worth</li>
                  <li>• Real-time delivery</li>
                </ul>
                <a href="#lead-form" className="mt-6 inline-block w-full text-center px-4 py-2 rounded-lg font-semibold" style={{background:'#C7A246', color:'#111'}}>Order Leads Now</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center">FAQ</h2>
          <div className="mt-8 divide-y divide-gray-200 bg-white rounded-xl border border-gray-100 shadow-soft">
            {[
              {q:"How are leads generated?", a:"Inbound funnels, opt-ins, search traffic, and retirement rollover requests."},
              {q:"Are they exclusive?", a:"We offer both exclusive and shared options depending on your package and budget."},
              {q:"Can I filter by net worth or location?", a:"Yes. Target by state, metro, income, or estimated net worth."},
              {q:"Do you integrate with my CRM?", a:"We can deliver via API, webhook, Zapier, or spreadsheet for manual upload."},
              {q:"What’s the average close rate?", a:"Results vary by sales process; our clients report significant improvements vs. generic leads."},
            ].map((item)=> (
              <div key={item.q} className="p-4">
                <div className="font-semibold">{item.q}</div>
                <div className="text-sm text-gray-700 mt-1">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold">Start Closing More Gold Deals for Less.</h2>
          <p className="mt-2 opacity-90">Buy verified investor leads today — from just $2 each.</p>
          <a href="#lead-form" className="mt-6 inline-block px-6 py-3 rounded-lg font-semibold" style={{background:'#C7A246', color:'#111'}}>Get Started</a>
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-form" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center">Get Verified Precious-Metal Leads</h2>
          <p className="text-center text-gray-600 mt-2">Fill out the form and we’ll reach out with packages and a demo.</p>
          <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-soft">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input className="mt-1 w-full border rounded-md px-3 py-2" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" className="mt-1 w-full border rounded-md px-3 py-2" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input className="mt-1 w-full border rounded-md px-3 py-2" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
              {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Company</label>
              <input className="mt-1 w-full border rounded-md px-3 py-2" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} />
              {errors.company && <p className="text-red-600 text-xs mt-1">{errors.company}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium">Monthly lead volume desired</label>
              <input className="mt-1 w-full border rounded-md px-3 py-2" placeholder="e.g., 100" value={form.volume} onChange={e=>setForm({...form,volume:e.target.value})} />
              {errors.volume && <p className="text-red-600 text-xs mt-1">{errors.volume}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium">Message</label>
              <textarea className="mt-1 w-full border rounded-md px-3 py-2" rows="4" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}></textarea>
            </div>
            <div className="sm:col-span-2 flex justify-between items-center">
              <div className="text-xs text-gray-500">We respect privacy. BBB | SSL | U.S. Verified Data</div>
              <button type="submit" className="px-6 py-3 rounded-lg font-semibold" style={{background:'#C7A246', color:'#111'}}>{submitted ? 'Submitting…' : 'Book a Demo'}</button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                About
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Blog
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Jobs
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Press
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Accessibility
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Partners
              </a>
            </div>
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating mobile CTA */}
      <a href="#lead-form" onClick={handleOpenPortal} className="fixed bottom-4 right-4 sm:hidden px-5 py-3 rounded-full font-bold shadow-soft" style={{background:'#C7A246', color:'#111'}}>
        Get Leads Now
      </a>

      {/* Buyer Portal Demo Overlay */}
      {portalOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70" onClick={() => setPortalOpen(false)}></div>
          <div className="absolute inset-0 flex items-stretch justify-center">
            <div className="relative w-full max-w-7xl mx-auto my-6 bg-[#0F0F0F] text-white rounded-xl shadow-soft overflow-hidden">
              {/* Top Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 h-14 border-b border-white/10 bg-black/60">
                <div className="font-extrabold tracking-tight" style={{color:'#C7A246'}}>GoldFlow Buyer Portal <span className="opacity-60">(Beta)</span></div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="hidden sm:inline opacity-80">GoldTrust IRA</span>
                  <span className="opacity-80">🔔</span>
                  <span className="px-2 py-1 rounded bg-white/10 border border-white/10">Demo Mode</span>
                  <button className="ml-2 text-white/70 hover:text-white" onClick={() => setPortalOpen(false)}>✕</button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 px-3 sm:px-6 py-2 border-b border-white/10 text-sm overflow-x-auto">
                {[
                  {id:'dashboard',label:'Dashboard'},
                  {id:'purchased',label:'Purchased Leads'},
                  {id:'available',label:'Available Leads'},
                  {id:'reports',label:'Reports'},
                  {id:'billing',label:'Billing / Account'},
                ].map(t => (
                  <button key={t.id} onClick={() => setPortalTab(t.id)} className={`px-3 py-2 rounded-lg whitespace-nowrap ${portalTab===t.id? 'bg-white/10 border border-white/10' : 'hover:bg-white/5'}`}>{t.label}</button>
                ))}
              </div>

              {/* Loading Screen */}
              {portalLoading ? (
                <div className="p-10 sm:p-14 text-center animate-fade-in">
                  <div className="text-lg opacity-80 animate-pulse">Authenticating Dealer Account…</div>
                  <div className="mt-4 inline-block h-1 w-40 bg-white/10 rounded overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-transparent via-[color:#C7A246] to-transparent animate-shimmer"></div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <div className="h-3 bg-white/5 rounded animate-pulse"></div>
                    <div className="h-3 bg-white/5 rounded w-3/4 mx-auto animate-pulse"></div>
                  </div>
                </div>
              ) : (
                <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-7rem)]">
                  {/* Dashboard */}
                  {portalTab==='dashboard' && (
                    <section>
                      <h3 className="text-2xl font-extrabold">Welcome back, GoldTrust IRA</h3>
                      <p className="text-white/70 mt-1">Track your latest investor leads, ROI, and account balance in real time.</p>
                      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
                        {[
                          {k:'Leads Purchased This Month',v:'312',icon:'📊'},
                          {k:'Leads Available Now',v:'1,240',icon:'📈'},
                          {k:'Avg Cost per Lead',v:'$2.12',icon:'💰'},
                          {k:'Conversion Rate',v:'13.8 %',icon:'🎯'},
                          {k:'Account Balance',v:'$452.00',icon:'💳'},
                        ].map((card, idx) => (
                          <div key={card.k} className="rounded-lg bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20 cursor-pointer group" style={{animationDelay: `${idx * 100}ms`}}>
                            <div className="text-xs text-white/70 group-hover:text-white transition-colors">{card.k}</div>
                            <div className="text-xl font-bold mt-1 group-hover:scale-110 transition-transform" style={{color:'#C7A246'}}>{card.v}</div>
                            <div className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{card.icon}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 grid md:grid-cols-3 gap-4">
                        <div className="rounded-lg bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                          <div className="font-semibold flex items-center gap-2">Leads Purchased per Day (last 14 days) <span className="text-xs opacity-50">📊</span></div>
                          <div className="mt-3 h-36 bg-gradient-to-b from-white/10 to-transparent rounded relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[color:#C7A246]/20 to-transparent animate-shimmer"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[color:#C7A246]/30 to-transparent"></div>
                          </div>
                        </div>
                        <div className="rounded-lg bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                          <div className="font-semibold flex items-center gap-2">Lead Source Breakdown <span className="text-xs opacity-50">🥧</span></div>
                          <div className="text-xs text-white/70 mt-2">Facebook 42% | Google 33% | TikTok 15% | Other 10%</div>
                          <div className="mt-3 h-36 bg-white/10 rounded-full mx-auto w-36 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[color:#C7A246]/20 to-transparent animate-shimmer"></div>
                            <div className="absolute inset-2 bg-white/5 rounded-full"></div>
                          </div>
                        </div>
                        <div className="rounded-lg bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                          <div className="font-semibold flex items-center gap-2">Top Performing Lead States <span className="text-xs opacity-50">🗺️</span></div>
                          <div className="mt-3 h-36 bg-white/10 rounded relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[color:#C7A246]/20 to-transparent animate-shimmer"></div>
                            <div className="absolute bottom-2 left-2 right-2 flex justify-around text-xs">
                              <span>CA</span><span>TX</span><span>FL</span><span>NY</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Purchased Leads */}
                  {portalTab==='purchased' && (
                    <section>
                      <h3 className="text-2xl font-extrabold">Your Purchased Leads</h3>
                      <p className="text-white/70 mt-1">View and manage investor leads you’ve already secured.</p>
                      <div className="mt-4 flex flex-wrap gap-2 text-sm">
                        <select className="bg-white/5 border border-white/10 rounded px-2 py-1 hover:bg-white/10 transition-colors cursor-pointer"><option>State ▾</option></select>
                        <select className="bg-white/5 border border-white/10 rounded px-2 py-1 hover:bg-white/10 transition-colors cursor-pointer"><option>Net Worth ▾</option></select>
                        <select className="bg-white/5 border border-white/10 rounded px-2 py-1 hover:bg-white/10 transition-colors cursor-pointer"><option>Status ▾</option></select>
                        <select className="bg-white/5 border border-white/10 rounded px-2 py-1 hover:bg-white/10 transition-colors cursor-pointer"><option>Date Range ▾</option></select>
                        <button className="ml-auto px-3 py-1 rounded bg-white/10 border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105">Export Leads → CSV</button>
                      </div>
                      <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-sm">
                          <thead className="text-left bg-white/5">
                            <tr>
                              {['Name','Email','Phone','Location','Est. Net Worth','Purchase Date','Status'].map(h=> <th key={h} className="px-3 py-2">{h}</th>)}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10">
                            {[
                              ['John P.','johnp@email.com','(512) 555-0198','Austin, TX','$250K–$500K','Nov 12, 2025','Contacted 📞','bg-blue-500/10'],
                              ['Sarah K.','sarahk@email.com','(305) 555-2044','Miami, FL','$1M+','Nov 11, 2025','Pending ✅','bg-yellow-500/10'],
                              ['Rick T.','rickt@email.com','(702) 555-8866','Las Vegas, NV','$100K–$250K','Nov 10, 2025','Converted ⭐','bg-green-500/10'],
                            ].map((row,i)=> (
                              <tr key={i} className={`hover:bg-white/5 transition-all duration-300 cursor-pointer ${row[7]}`}>
                                {row.slice(0, -1).map((c,ci)=> (
                                  <td key={ci} className="px-3 py-2">
                                    {ci === 6 ? <span className="inline-flex items-center gap-1">{c}</span> : c}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  )}

                  {/* Available Leads */}
                  {portalTab==='available' && (
                    <section>
                      <h3 className="text-2xl font-extrabold">Buy New Gold & Silver Investor Leads</h3>
                      <p className="text-white/70 mt-1">All leads are verified and include name, phone, email, location, and estimated net worth.</p>
                      <div className="mt-6 grid md:grid-cols-3 gap-4">
                        {[
                          {name:'Starter Pack',leads:100,cpl:'$2.00',total:'$200',popular:false,icon:'🚀'},
                          {name:'Growth Pack',leads:500,cpl:'$1.80',total:'$900',popular:true,icon:'📈'},
                          {name:'Pro Pack',leads:1000,cpl:'$1.60',total:'$1,600',popular:false,icon:'⭐'},
                        ].map(p => (
                          <div key={p.name} className={`rounded-lg bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20 relative ${p.popular ? 'ring-2 ring-[color:#C7A246]/50' : ''}`}>
                            {p.popular && <span className="absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full" style={{background:'#C7A246', color:'#111'}}>Popular</span>}
                            <div className="text-lg font-bold flex items-center gap-2">{p.icon} {p.name}</div>
                            <div className="mt-2 text-sm opacity-80">Leads: {p.leads}</div>
                            <div className="text-sm opacity-80">Cost per Lead: {p.cpl}</div>
                            <div className="text-xl font-extrabold mt-2" style={{color:'#C7A246'}}>Total: {p.total}</div>
                            <button className="mt-3 px-3 py-2 rounded bg-white/10 border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full">Purchase</button>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-white/70">Need exclusive territory or custom filters? Contact us for premium packages.</p>
                      <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-sm opacity-70">
                          <thead className="text-left bg-white/5">
                            <tr>
                              {['Name','Email','Phone','Location','Est. Net Worth'].map(h=> <th key={h} className="px-3 py-2">{h}</th>)}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10">
                            {[
                              ['— —','— —','— —','California','$500K–$1M'],
                              ['— —','— —','— —','Texas','$250K–$500K'],
                              ['— —','— —','— —','Florida','$1M+'],
                            ].map((row,i)=> (
                              <tr key={i} className="bg-white/[0.03]">
                                {row.map((c,ci)=> <td key={ci} className="px-3 py-2">{c}</td>)}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  )}

                  {/* Reports */}
                  {portalTab==='reports' && (
                    <section>
                      <h3 className="text-2xl font-extrabold">Performance & ROI Analytics</h3>
                      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          ['Leads Contacted','280 (89%)','📞'],
                          ['Leads Converted','42 (13%)','✅'],
                          ['Avg Revenue per Lead','$84.00','💵'],
                          ['ROI','384%','📈'],
                        ].map((c, idx) => (
                          <div key={c[0]} className="rounded-lg bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer group" style={{animationDelay: `${idx * 100}ms`}}>
                            <div className="text-xs text-white/70 group-hover:text-white transition-colors">{c[0]}</div>
                            <div className="text-xl font-extrabold mt-1 group-hover:scale-110 transition-transform" style={{color:'#C7A246'}}>{c[1]}</div>
                            <div className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{c[2]}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 grid md:grid-cols-3 gap-4">
                        <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                          <div className="font-semibold">Conversion by Lead Source</div>
                          <div className="mt-3 h-36 bg-white/10 rounded"></div>
                        </div>
                        <div className="rounded-lg bg-white/5 border border-white/10 p-4 md:col-span-2">
                          <div className="font-semibold">Revenue by State</div>
                          <div className="mt-3 h-36 bg-white/10 rounded"></div>
                        </div>
                      </div>
                      <div className="mt-6 grid md:grid-cols-3 gap-3 text-sm">
                        <div className="rounded-lg bg-white/5 border border-white/10 p-3">✅ Top Source – Google Ads ($7.8K Revenue)</div>
                        <div className="rounded-lg bg-white/5 border border-white/10 p-3">✅ Top State – California ($10.2K)</div>
                        <div className="rounded-lg bg-white/5 border border-white/10 p-3">✅ Best Campaign – October IRA Promo (17.6% Conversion)</div>
                      </div>
                    </section>
                  )}

                  {/* Billing / Account */}
                  {portalTab==='billing' && (
                    <section>
                      <h3 className="text-2xl font-extrabold">Billing / Account</h3>
                      <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
                        <div className="rounded-lg bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer group">
                          <div className="flex items-center gap-2">💳 Account Balance</div>
                          <div className="text-2xl font-extrabold mt-1 group-hover:scale-110 transition-transform" style={{color:'#C7A246'}}>$452.00</div>
                        </div>
                        <div className="rounded-lg bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer group">
                          <div className="flex items-center gap-2">💳 Payment Method</div>
                          <div className="mt-1 group-hover:text-white transition-colors">Visa •••• 2241 (Active)</div>
                        </div>
                        <div className="rounded-lg bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer group">
                          <div className="flex items-center gap-2">⏰ Next Auto Top-Up</div>
                          <div className="mt-1 group-hover:text-white transition-colors">$500 on Nov 15 2025</div>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button className="px-4 py-2 rounded bg-white/10 border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg">Add Funds</button>
                        <button className="px-4 py-2 rounded bg-white/10 border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg">Download Invoices</button>
                      </div>
                      <div className="mt-4 rounded-lg bg-white/5 border border-white/10 p-4">
                        <div className="font-semibold mb-2">Recent Invoices</div>
                        <div className="text-sm">#1048 – $400 · #1049 – $250 · #1050 – $900</div>
                      </div>
                      <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-sm">
                          <thead className="text-left bg-white/5">
                            <tr>
                              {['Date','Description','Amount','Balance'].map(h=> <th key={h} className="px-3 py-2">{h}</th>)}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10">
                            {[
                              ['Nov 12, 2025','Lead Purchase – 100 Pack','-$200.00','$452.00'],
                              ['Nov 11, 2025','Top-Up','+$500.00','$652.00'],
                              ['Nov 10, 2025','Lead Purchase – 500 Pack','-$900.00','$152.00'],
                            ].map((row,i)=> (
                              <tr key={i} className="hover:bg-white/5">
                                {row.map((c,ci)=> <td key={ci} className="px-3 py-2">{c}</td>)}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  )}

                  {/* Demo Footer */}
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
                    <div className="opacity-70">Demo environment – no real lead data stored. For access to live feeds and pricing, contact our sales team.</div>
                    <a href="https://calendly.com/sundream/15-minute-free-consultation-clone" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform" style={{background:'#C7A246', color:'#111'}}>Book a Private Demo →</a>
                  </div>
                </div>
              )}

              {/* Watermark */}
              <div className="absolute bottom-2 right-3 text-xs text-white/50 select-none">Demo Mode</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
