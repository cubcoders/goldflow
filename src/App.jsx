import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { TrendingUp, Users, DollarSign, Target, Shield, Zap, BarChart3, FileText, CreditCard, Settings, Bell, Search, Filter, Download, ChevronRight, ArrowUp, ArrowDown, Check, X, Menu, Star, Lock, Briefcase, MapPin, Phone, Mail, Calendar, Activity, Globe, Award, Clock, AlertCircle, TrendingDown, Eye, EyeOff, Sparkles, ArrowRight, Play, ChevronDown, CheckCircle, AlertTriangle, Database, Cloud, Smartphone, Globe2, Headphones, MessageSquare, ZapOff, Timer, TrendingUpIcon, PieChartIcon, Layers, ShieldCheck, UserCheck, MailCheck, PhoneCall, MapPinCheck } from 'lucide-react'

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [portalOpen, setPortalOpen] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const [portalTab, setPortalTab] = useState('dashboard')
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [counters, setCounters] = useState({ leads: 0, clients: 0, uptime: 0, revenue: 0 })
  const [showVideoModal, setShowVideoModal] = useState(false)
  
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.8])
  const heroY = useTransform(scrollY, [0, 300], [0, -50])
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = ['home', 'problem', 'solution', 'how', 'why', 'pricing', 'faq']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    // Animate counters when they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targets = [
            { id: 'leads', target: 250, suffix: 'M+', prefix: '$' },
            { id: 'clients', target: 1200, suffix: '+' },
            { id: 'uptime', target: 99.9, suffix: '%' },
            { id: 'revenue', target: 45, suffix: 'M+', prefix: '$' }
          ]
          
          targets.forEach(({ id, target, suffix, prefix }) => {
            let current = 0
            const increment = target / 50
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              setCounters(prev => ({ ...prev, [id]: `${prefix || ''}${current.toFixed(1)}${suffix || ''}` }))
            }, 30)
          })
          
          observer.disconnect()
        }
      })
    }, { threshold: 0.5 })
    
    const counterElement = document.getElementById('counters')
    if (counterElement) observer.observe(counterElement)
    
    return () => observer.disconnect()
  }, [])
  
  const handleOpenPortal = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    setPortalOpen(true)
    setPortalTab('dashboard')
    setPortalLoading(true)
    setTimeout(() => setPortalLoading(false), 2500)
  }
  
  // Sample data for charts
  const dailyLeadsData = Array.from({ length: 14 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i % 7],
    leads: Math.floor(Math.random() * 50) + 20,
    converted: Math.floor(Math.random() * 20) + 5
  }))
  
  const sourceData = [
    { name: 'Facebook', value: 42, color: '#1877F2' },
    { name: 'Google', value: 33, color: '#4285F4' },
    { name: 'TikTok', value: 15, color: '#000000' },
    { name: 'Other', value: 10, color: '#6B7280' }
  ]
  
  const stateData = [
    { state: 'CA', leads: 145, revenue: 12400 },
    { state: 'TX', leads: 98, revenue: 8900 },
    { state: 'FL', leads: 87, revenue: 7600 },
    { state: 'NY', leads: 76, revenue: 6800 },
    { state: 'AZ', leads: 54, revenue: 4200 }
  ]
  
  const conversionData = [
    { source: 'Facebook', rate: 15.2 },
    { source: 'Google', rate: 18.7 },
    { source: 'TikTok', rate: 12.3 },
    { source: 'Email', rate: 22.1 },
    { source: 'Direct', rate: 28.4 }
  ]
  
  const purchasedLeads = [
    { id: 1, name: 'John Peterson', email: 'johnp@email.com', phone: '(512) 555-0198', location: 'Austin, TX', netWorth: '$250K–$500K', date: '2025-11-12', status: 'contacted', score: 85 },
    { id: 2, name: 'Sarah Kim', email: 'sarahk@email.com', phone: '(305) 555-2044', location: 'Miami, FL', netWorth: '$1M+', date: '2025-11-11', status: 'pending', score: 92 },
    { id: 3, name: 'Rick Thompson', email: 'rickt@email.com', phone: '(702) 555-8866', location: 'Las Vegas, NV', netWorth: '$100K–$250K', date: '2025-11-10', status: 'converted', score: 78 },
    { id: 4, name: 'Maria Garcia', email: 'mariag@email.com', phone: '(602) 555-1432', location: 'Phoenix, AZ', netWorth: '$500K–$750K', date: '2025-11-10', status: 'contacted', score: 88 },
    { id: 5, name: 'David Chen', email: 'davidc@email.com', phone: '(415) 555-0891', location: 'San Francisco, CA', netWorth: '$2M+', date: '2025-11-09', status: 'pending', score: 95 }
  ]
  
  const availablePackages = [
    { id: 1, name: 'Starter Pack', leads: 100, costPerLead: 2.00, total: 200, features: ['Basic filtering', 'Email delivery', '7-day support'], popular: false },
    { id: 2, name: 'Growth Pack', leads: 500, costPerLead: 1.80, total: 900, features: ['Advanced filtering', 'Real-time API', 'Priority support', 'Custom reports'], popular: true },
    { id: 3, name: 'Enterprise Pack', leads: 1000, costPerLead: 1.60, total: 1600, features: ['Premium filtering', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee', 'Exclusive territory'], popular: false }
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-gold to-yellow-400 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">GoldFlow</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-6">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'problem', label: 'Problem' },
                  { id: 'solution', label: 'Solution' },
                  { id: 'how', label: 'How It Works' },
                  { id: 'why', label: 'Why Us' },
                  { id: 'pricing', label: 'Pricing' },
                  { id: 'faq', label: 'FAQ' }
                ].map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-sm font-medium transition-colors ${
                      activeSection === item.id ? 'text-gold' : 'text-gray-600 hover:text-gold'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button className="btn-secondary" onClick={handleOpenPortal}>
                View Demo
              </button>
              <button className="btn-primary" onClick={handleOpenPortal}>
                Get Started
              </button>
            </div>
            
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {['home', 'problem', 'solution', 'how', 'why', 'pricing', 'faq'].map(item => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="block py-2 text-gray-600 hover:text-gold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                ))}
                <div className="pt-4 space-y-2">
                  <button className="btn-secondary w-full" onClick={handleOpenPortal}>View Demo</button>
                  <button className="btn-primary w-full" onClick={handleOpenPortal}>Get Started</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gold/10 rounded-full text-gold text-sm font-medium mb-6">
                <Shield className="w-4 h-4 mr-2" />
                Trusted by 1,200+ dealers and advisors
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 text-balance">
                High-Intent Gold Investor Leads
                <span className="block text-3xl md:text-5xl mt-2 gradient-text">Starting at Just $2</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-balance">
                Access verified precious metal investors actively seeking to purchase gold, silver, and IRA products. Real-time delivery with comprehensive data included.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <button className="btn-primary text-base px-8 py-4" onClick={handleOpenPortal}>
                  Get Leads Now
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
                <button className="btn-secondary text-base px-8 py-4" onClick={handleOpenPortal}>
                  View Live Demo
                </button>
              </div>
            </motion.div>
            
            <motion.div
              id="counters"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { id: 'leads', icon: TrendingUp, label: 'Investor Requests Connected', value: counters.leads },
                { id: 'clients', icon: Users, label: 'Dealers & Advisors Served', value: counters.clients },
                { id: 'uptime', icon: Shield, label: 'Delivery Uptime', value: counters.uptime },
                { id: 'revenue', icon: DollarSign, label: 'Revenue Generated for Clients', value: counters.revenue }
              ].map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="glass-card p-6 hover-lift"
                >
                  <stat.icon className="w-8 h-8 text-gold mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Problem Section */}
      <section id="problem" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Tired of Paying $50+ Per Lead for Low-Intent Tire Kickers?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Most lead vendors overcharge for recycled, low-quality data. We've built a platform that delivers only verified, high-intent prospects actively seeking to invest in precious metals.
                </p>
                <div className="space-y-4">
                  {[
                    'No more recycled data or fake leads',
                    'Stop wasting time on unqualified prospects',
                    'Eliminate outrageous per-lead costs',
                    'Get real-time delivery of verified investors'
                  ].map((point, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="glass-card p-8">
                  <div className="text-center mb-6">
                    <div className="text-sm font-medium text-gray-500 mb-2">Traditional vs GoldFlow</div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                      <span className="text-sm font-medium text-red-700">Traditional Funnel</span>
                      <span className="text-sm text-red-600">3% Conversion</span>
                    </div>
                    <div className="flex justify-center">
                      <ArrowDown className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-sm font-medium text-green-700">GoldFlow Funnel</span>
                      <span className="text-sm text-green-600">13.8% Conversion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Solution Section */}
      <section id="solution" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Verified Gold & Silver Investor Leads That Convert
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Our advanced filtering and verification process ensures you get only the highest quality leads with complete data transparency.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Target, title: 'Starting at $2/lead', desc: 'Volume discounts available', color: 'text-blue-600' },
                { icon: FileText, title: 'Complete Data', desc: 'Name, phone, email, location, net worth', color: 'text-green-600' },
                { icon: Zap, title: 'Real-time Delivery', desc: 'API, webhook, or spreadsheet', color: 'text-yellow-600' },
                { icon: Shield, title: 'Verified Buyers', desc: 'Actively searching for investments', color: 'text-purple-600' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 text-center hover-lift"
                >
                  <feature.icon className={`w-12 h-12 ${feature.color} mx-auto mb-4`} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12">
              <button className="btn-primary text-lg px-8 py-4" onClick={handleOpenPortal}>
                View Pricing & Packages
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works */}
      <section id="how" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">Get started in three simple steps</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  title: 'Choose Your Targeting',
                  description: 'Select your ideal customer profile by state, income, investment type, and more.',
                  icon: Settings
                },
                {
                  step: 2,
                  title: 'Receive Verified Leads',
                  description: 'Get real-time delivery of pre-qualified investors through your preferred channel.',
                  icon: Zap
                },
                {
                  step: 3,
                  title: 'Close More Deals',
                  description: 'Convert high-intent prospects with complete data and contact information.',
                  icon: TrendingUp
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-gold to-yellow-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {step.step}
                    </div>
                    <step.icon className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full p-2 shadow-lg text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-500 mb-4">
                Data sourced from inbound funnels, opt-ins, and retirement rollover requests
              </p>
              <button className="btn-primary" onClick={handleOpenPortal}>
                Start Getting Leads Today
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section id="why" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">The Most Affordable High-Intent Gold Leads</h2>
              <p className="text-xl text-gray-600">Compare our platform to traditional lead vendors</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Other Vendors</th>
                    <th className="text-left py-4 px-6 font-semibold text-gold">GoldFlow</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Cost per Lead', '$50+', 'From $2'],
                    ['Verification', 'Limited', 'Multi-point verified'],
                    ['Data Fields', 'Name/email only', 'Full contact + net worth + state'],
                    ['Delivery Speed', '24–48 hrs', 'Instant'],
                    ['Support', 'Email only', '24/7 dedicated support'],
                    ['ROI Tracking', 'Basic', 'Advanced analytics dashboard']
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className={`py-4 px-6 ${cellIndex === 2 ? 'text-gold font-semibold' : 'text-gray-700'}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
              <p className="text-xl text-gray-600">See what our clients say about GoldFlow</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  quote: "We lowered our lead costs by 90% and doubled conversions. The quality of investors is unmatched.",
                  author: "Michael Rodriguez",
                  company: "Texas Gold Bullion",
                  role: "CEO",
                  rating: 5
                },
                {
                  quote: "Finally a real lead provider that delivers actual buyers ready to invest. Our sales team has never been more productive.",
                  author: "Jennifer Chen",
                  company: "Florida IRA Specialists",
                  role: "Sales Director",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="glass-card p-8"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing. No Contracts.</h2>
              <p className="text-xl text-gray-600">Choose the package that fits your business needs</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Starter',
                  leads: 100,
                  price: 200,
                  costPerLead: 2.00,
                  features: [
                    'Verified name, phone, email',
                    'Location + estimated net worth',
                    'Email delivery',
                    'Basic filtering',
                    'Email support'
                  ],
                  popular: false
                },
                {
                  name: 'Professional',
                  leads: 500,
                  price: 850,
                  costPerLead: 1.70,
                  features: [
                    'Everything in Starter',
                    'Real-time API delivery',
                    'Advanced filtering',
                    'Performance analytics',
                    'Priority support',
                    'Custom reports'
                  ],
                  popular: true
                },
                {
                  name: 'Enterprise',
                  leads: 1000,
                  price: 1500,
                  costPerLead: 1.50,
                  features: [
                    'Everything in Professional',
                    'Dedicated account manager',
                    'Custom integrations',
                    'Exclusive territory options',
                    'SLA guarantee',
                    '24/7 phone support'
                  ],
                  popular: false
                }
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative ${plan.popular ? 'scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-gold to-yellow-400 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className={`glass-card p-8 h-full ${plan.popular ? 'ring-2 ring-gold shadow-glow' : ''}`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-sm text-gray-600 mb-4">{plan.leads} verified leads</div>
                    <div className="text-4xl font-bold text-gray-900 mb-4">
                      ${plan.price}
                      <span className="text-lg font-normal text-gray-600">/mo</span>
                    </div>
                    <div className="text-sm text-gold font-semibold mb-6">
                      ${plan.costPerLead.toFixed(2)} per lead
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button 
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-gold to-yellow-400 text-white shadow-lg hover:shadow-xl' 
                          : 'btn-primary'
                      }`}
                      onClick={handleOpenPortal}
                    >
                      Get Started
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Everything you need to know about GoldFlow</p>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  question: "How are your leads generated and verified?",
                  answer: "Our leads are generated through targeted inbound funnels, search campaigns, and retirement rollover requests. Each lead undergoes multi-point verification including phone validation, email confirmation, and intent scoring."
                },
                {
                  question: "Are the leads exclusive or shared?",
                  answer: "We offer both exclusive and shared lead options. Exclusive leads are sold only to your company, while shared leads are distributed to a maximum of 3 non-competing businesses in different geographic areas."
                },
                {
                  question: "Can I filter leads by specific criteria?",
                  answer: "Yes. You can filter by state, metro area, estimated net worth, investment type (gold IRA, bullion, coins), and minimum investment amount. We also offer custom filtering for enterprise clients."
                },
                {
                  question: "How quickly are leads delivered?",
                  answer: "Leads are delivered instantly through our real-time API, webhook, or email integration. You can also download leads in CSV format through your dashboard at any time."
                },
                {
                  question: "What's the average conversion rate?",
                  answer: "Our clients typically see conversion rates between 12-18%, significantly higher than industry averages of 3-5%. Your actual rate will depend on your sales process and follow-up strategy."
                },
                {
                  question: "Do you integrate with my CRM?",
                  answer: "Yes. We integrate with all major CRMs including Salesforce, HubSpot, and Zoho. We also offer custom API integration for proprietary systems."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Closing More Gold Deals Today
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of dealers and advisors who trust GoldFlow for high-quality, verified precious metal investor leads.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="btn-primary text-lg px-8 py-4 bg-white text-gray-900 hover:bg-gray-100" onClick={handleOpenPortal}>
                Get Started Now
              </button>
              <a 
                href="https://calendly.com/sundream/15-minute-free-consultation-clone" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-8 py-4 border-white/20 text-white hover:bg-white/10"
              >
                Schedule a Demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-gold to-yellow-400 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">GoldFlow</span>
              </div>
              <p className="text-sm">
                Premium verified precious metal investor leads for dealers and advisors.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-gold transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-gold transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-gold transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">API Status</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Contact Support</a></li>
                <li><a href="https://calendly.com/sundream/15-minute-free-consultation-clone" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Schedule Demo</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 GoldFlow. All rights reserved. | BBB Accredited | SSL Secured | SOC 2 Compliant</p>
          </div>
        </div>
      </footer>
      
      {/* Advanced Demo Portal */}
      <AnimatePresence>
        {portalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setPortalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-7xl max-h-[90vh] bg-dark rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Portal Header */}
              <div className="bg-dark-card border-b border-dark-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-gold to-yellow-400 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">GoldFlow Buyer Portal</h3>
                      <p className="text-sm text-gray-400">Advanced Lead Management System</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-400">Live</span>
                    </div>
                    <span className="px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-sm text-gold">
                      Demo Mode
                    </span>
                    <button
                      onClick={() => setPortalOpen(false)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Portal Navigation */}
              <div className="bg-dark border-b border-dark-border px-6">
                <div className="flex space-x-1">
                  {[
                    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                    { id: 'purchased', label: 'Purchased Leads', icon: Users },
                    { id: 'available', label: 'Available Leads', icon: Target },
                    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                    { id: 'billing', label: 'Billing', icon: CreditCard },
                    { id: 'settings', label: 'Settings', icon: Settings }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setPortalTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        portalTab === tab.id
                          ? 'bg-gold/10 text-gold border-b-2 border-gold'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Portal Content */}
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
                {portalLoading ? (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white text-lg">Authenticating Dealer Account...</p>
                      <p className="text-gray-400 text-sm mt-2">Loading your personalized dashboard</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Dashboard Tab */}
                    {portalTab === 'dashboard' && (
                      <div className="p-6">
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-white mb-2">Welcome back, GoldTrust IRA</h2>
                          <p className="text-gray-400">Track your latest investor leads, ROI, and account balance in real time.</p>
                        </div>
                        
                        {/* KPI Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                          {[
                            { label: 'Leads Purchased This Month', value: '312', change: '+12%', icon: Users, color: 'text-blue-400' },
                            { label: 'Leads Available Now', value: '1,240', change: '+8%', icon: Target, color: 'text-green-400' },
                            { label: 'Avg Cost per Lead', value: '$2.12', change: '-5%', icon: DollarSign, color: 'text-yellow-400' },
                            { label: 'Conversion Rate', value: '13.8%', change: '+2.1%', icon: TrendingUp, color: 'text-purple-400' },
                            { label: 'Account Balance', value: '$452.00', change: '+$200', icon: CreditCard, color: 'text-gold' }
                          ].map((kpi, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="dark-glass p-4 hover-lift cursor-pointer"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                                <span className={`text-xs ${kpi.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                  {kpi.change}
                                </span>
                              </div>
                              <div className="text-2xl font-bold text-white mb-1">{kpi.value}</div>
                              <div className="text-xs text-gray-400">{kpi.label}</div>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Charts */}
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="dark-glass p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Leads Purchased (14 days)</h3>
                            <ResponsiveContainer width="100%" height={200}>
                              <AreaChart data={dailyLeadsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                                <XAxis dataKey="day" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip 
                                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
                                  labelStyle={{ color: '#9CA3AF' }}
                                />
                                <Area type="monotone" dataKey="leads" stroke="#C7A246" fill="#C7A246" fillOpacity={0.3} />
                                <Area type="monotone" dataKey="converted" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                          
                          <div className="dark-glass p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Lead Source Breakdown</h3>
                            <ResponsiveContainer width="100%" height={200}>
                              <PieChart>
                                <Pie
                                  data={sourceData}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  {sourceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip 
                                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
                                  labelStyle={{ color: '#9CA3AF' }}
                                />
                              </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 space-y-2">
                              {sourceData.map((source, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                                    <span className="text-gray-400">{source.name}</span>
                                  </div>
                                  <span className="text-white font-medium">{source.value}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="dark-glass p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Top Performing States</h3>
                            <ResponsiveContainer width="100%" height={200}>
                              <BarChart data={stateData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                                <XAxis dataKey="state" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip 
                                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
                                  labelStyle={{ color: '#9CA3AF' }}
                                />
                                <Bar dataKey="leads" fill="#C7A246" />
                                <Bar dataKey="revenue" fill="#10B981" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Purchased Leads Tab */}
                    {portalTab === 'purchased' && (
                      <div className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                          <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Your Purchased Leads</h2>
                            <p className="text-gray-400">View and manage investor leads you've already secured.</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="btn-secondary">
                              <Filter className="w-4 h-4 mr-2" />
                              Filter
                            </button>
                            <button className="btn-secondary">
                              <Download className="w-4 h-4 mr-2" />
                              Export CSV
                            </button>
                          </div>
                        </div>
                        
                        <div className="dark-glass overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-dark-border">
                                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Name</th>
                                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Email</th>
                                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Phone</th>
                                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Location</th>
                                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Net Worth</th>
                                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Date</th>
                                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Score</th>
                                </tr>
                              </thead>
                              <tbody>
                                {purchasedLeads.map((lead, index) => (
                                  <tr key={lead.id} className="border-b border-dark-border hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center">
                                          <Users className="w-4 h-4 text-gold" />
                                        </div>
                                        <span className="text-white font-medium">{lead.name}</span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-300">{lead.email}</td>
                                    <td className="py-3 px-4 text-gray-300">{lead.phone}</td>
                                    <td className="py-3 px-4 text-gray-300">{lead.location}</td>
                                    <td className="py-3 px-4 text-gray-300">{lead.netWorth}</td>
                                    <td className="py-3 px-4 text-gray-300">{lead.date}</td>
                                    <td className="py-3 px-4">
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        lead.status === 'converted' ? 'bg-green-500/10 text-green-400' :
                                        lead.status === 'contacted' ? 'bg-blue-500/10 text-blue-400' :
                                        'bg-yellow-500/10 text-yellow-400'
                                      }`}>
                                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                      </span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex items-center space-x-2">
                                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                                          <div 
                                            className="h-2 rounded-full"
                                            style={{
                                              width: `${lead.score}%`,
                                              backgroundColor: lead.score >= 90 ? '#10B981' : lead.score >= 80 ? '#C7A246' : '#EF4444'
                                            }}
                                          ></div>
                                        </div>
                                        <span className="text-sm text-gray-400">{lead.score}</span>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Available Leads Tab */}
                    {portalTab === 'available' && (
                      <div className="p-6">
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-white mb-2">Buy New Gold & Silver Investor Leads</h2>
                          <p className="text-gray-400">All leads are verified and include complete contact information and investment data.</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                          {availablePackages.map((pkg, index) => (
                            <motion.div
                              key={pkg.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`dark-glass p-6 relative ${pkg.popular ? 'ring-2 ring-gold' : ''}`}
                            >
                              {pkg.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                  <span className="bg-gold text-black px-3 py-1 rounded-full text-xs font-bold">
                                    MOST POPULAR
                                  </span>
                                </div>
                              )}
                              <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                              <div className="text-3xl font-bold text-gold mb-1">${pkg.total}</div>
                              <div className="text-sm text-gray-400 mb-4">{pkg.leads} leads at ${pkg.costPerLead.toFixed(2)} each</div>
                              <ul className="space-y-2 mb-6">
                                {pkg.features.map((feature, i) => (
                                  <li key={i} className="flex items-center text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              <button className="w-full btn-primary">
                                Purchase Package
                              </button>
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="dark-glass p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">Available Leads Preview</h3>
                          <div className="text-sm text-gray-400 mb-4">
                            <Lock className="w-4 h-4 inline mr-2" />
                            Purchase a package to unlock full lead details
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-dark-border">
                                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Name</th>
                                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Email</th>
                                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Phone</th>
                                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Location</th>
                                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Net Worth</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  ['— —', '— —', '— —', 'Los Angeles, CA', '$500K–$1M'],
                                  ['— —', '— —', '— —', 'Houston, TX', '$250K–$500K'],
                                  ['— —', '— —', '— —', 'Miami, FL', '$1M+']
                                ].map((row, index) => (
                                  <tr key={index} className="border-b border-dark-border opacity-50">
                                    {row.map((cell, i) => (
                                      <td key={i} className="py-2 px-3 text-sm text-gray-500">{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Analytics Tab */}
                    {portalTab === 'analytics' && (
                      <div className="p-6">
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-white mb-2">Performance & ROI Analytics</h2>
                          <p className="text-gray-400">Detailed insights into your lead performance and return on investment.</p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          {[
                            { label: 'Leads Contacted', value: '280', percentage: '89%', icon: Phone, color: 'text-blue-400' },
                            { label: 'Leads Converted', value: '42', percentage: '13%', icon: Check, color: 'text-green-400' },
                            { label: 'Avg Revenue per Lead', value: '$84.00', percentage: '+15%', icon: DollarSign, color: 'text-yellow-400' },
                            { label: 'Total ROI', value: '384%', percentage: '+45%', icon: TrendingUp, color: 'text-purple-400' }
                          ].map((metric, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="dark-glass p-4"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <metric.icon className={`w-5 h-5 ${metric.color}`} />
                                <span className="text-xs text-green-400">{metric.percentage}</span>
                              </div>
                              <div className="text-xl font-bold text-white">{metric.value}</div>
                              <div className="text-xs text-gray-400">{metric.label}</div>
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="dark-glass p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Conversion by Lead Source</h3>
                            <ResponsiveContainer width="100%" height={250}>
                              <BarChart data={conversionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                                <XAxis dataKey="source" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip 
                                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
                                  labelStyle={{ color: '#9CA3AF' }}
                                />
                                <Bar dataKey="rate" fill="#C7A246" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                          
                          <div className="dark-glass p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Revenue Performance</h3>
                            <ResponsiveContainer width="100%" height={250}>
                              <LineChart data={dailyLeadsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                                <XAxis dataKey="day" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip 
                                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
                                  labelStyle={{ color: '#9CA3AF' }}
                                />
                                <Line type="monotone" dataKey="leads" stroke="#C7A246" strokeWidth={2} />
                                <Line type="monotone" dataKey="converted" stroke="#10B981" strokeWidth={2} />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        
                        <div className="mt-6 grid md:grid-cols-3 gap-4">
                          <div className="dark-glass p-4 border-l-4 border-green-500">
                            <div className="flex items-center space-x-2 mb-2">
                              <Award className="w-5 h-5 text-green-400" />
                              <span className="text-white font-medium">Top Source</span>
                            </div>
                            <div className="text-lg font-bold text-white">Google Ads</div>
                            <div className="text-sm text-gray-400">$7.8K Revenue</div>
                          </div>
                          
                          <div className="dark-glass p-4 border-l-4 border-blue-500">
                            <div className="flex items-center space-x-2 mb-2">
                              <MapPin className="w-5 h-5 text-blue-400" />
                              <span className="text-white font-medium">Top State</span>
                            </div>
                            <div className="text-lg font-bold text-white">California</div>
                            <div className="text-sm text-gray-400">$10.2K Revenue</div>
                          </div>
                          
                          <div className="dark-glass p-4 border-l-4 border-gold">
                            <div className="flex items-center space-x-2 mb-2">
                              <Star className="w-5 h-5 text-gold" />
                              <span className="text-white font-medium">Best Campaign</span>
                            </div>
                            <div className="text-lg font-bold text-white">October IRA Promo</div>
                            <div className="text-sm text-gray-400">17.6% Conversion</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Billing Tab */}
                    {portalTab === 'billing' && (
                      <div className="p-6">
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-white mb-2">Billing & Account</h2>
                          <p className="text-gray-400">Manage your account balance, payment methods, and billing history.</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                          <div className="dark-glass p-6">
                            <div className="flex items-center space-x-2 mb-4">
                              <CreditCard className="w-5 h-5 text-gold" />
                              <span className="text-white font-medium">Account Balance</span>
                            </div>
                            <div className="text-3xl font-bold text-gold">$452.00</div>
                            <div className="text-sm text-gray-400 mt-2">Available for lead purchases</div>
                          </div>
                          
                          <div className="dark-glass p-6">
                            <div className="flex items-center space-x-2 mb-4">
                              <CreditCard className="w-5 h-5 text-blue-400" />
                              <span className="text-white font-medium">Payment Method</span>
                            </div>
                            <div className="text-lg font-medium text-white">Visa •••• 2241</div>
                            <div className="text-sm text-green-400 mt-2">Active • Expires 12/25</div>
                          </div>
                          
                          <div className="dark-glass p-6">
                            <div className="flex items-center space-x-2 mb-4">
                              <Clock className="w-5 h-5 text-purple-400" />
                              <span className="text-white font-medium">Next Auto Top-Up</span>
                            </div>
                            <div className="text-lg font-medium text-white">$500.00</div>
                            <div className="text-sm text-gray-400 mt-2">Nov 15, 2025</div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-4 mb-6">
                          <button className="btn-primary">
                            <DollarSign className="w-4 h-4 mr-2" />
                            Add Funds
                          </button>
                          <button className="btn-secondary">
                            <Download className="w-4 h-4 mr-2" />
                            Download Invoices
                          </button>
                        </div>
                        
                        <div className="dark-glass p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">Billing History</h3>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-dark-border">
                                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Date</th>
                                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Description</th>
                                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Amount</th>
                                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Balance</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  ['2025-11-12', 'Lead Purchase - 100 Pack', '-$200.00', '$452.00'],
                                  ['2025-11-11', 'Account Top-Up', '+$500.00', '$652.00'],
                                  ['2025-11-10', 'Lead Purchase - 500 Pack', '-$900.00', '$152.00'],
                                  ['2025-11-05', 'Lead Purchase - 100 Pack', '-$200.00', '$1,052.00'],
                                  ['2025-11-01', 'Monthly Subscription', '-$50.00', '$1,252.00']
                                ].map((transaction, index) => (
                                  <tr key={index} className="border-b border-dark-border">
                                    <td className="py-3 px-4 text-gray-300">{transaction[0]}</td>
                                    <td className="py-3 px-4 text-gray-300">{transaction[1]}</td>
                                    <td className={`py-3 px-4 font-medium ${transaction[2].startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                      {transaction[2]}
                                    </td>
                                    <td className="py-3 px-4 text-white">{transaction[3]}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Settings Tab */}
                    {portalTab === 'settings' && (
                      <div className="p-6">
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
                          <p className="text-gray-400">Manage your account preferences and notification settings.</p>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="dark-glass p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Company Name</label>
                                <input type="text" value="GoldTrust IRA" className="w-full px-3 py-2 bg-dark border border-dark-border rounded-lg text-white" readOnly />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Account ID</label>
                                <input type="text" value="GF-2025-001" className="w-full px-3 py-2 bg-dark border border-dark-border rounded-lg text-white" readOnly />
                              </div>
                            </div>
                          </div>
                          
                          <div className="dark-glass p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
                            <div className="space-y-4">
                              {[
                                { label: 'Email notifications for new leads', enabled: true },
                                { label: 'SMS alerts for high-value leads', enabled: true },
                                { label: 'Weekly performance reports', enabled: false },
                                { label: 'Low balance alerts', enabled: true }
                              ].map((setting, index) => (
                                <div key={index} className="flex items-center justify-between">
                                  <span className="text-gray-300">{setting.label}</span>
                                  <button
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                      setting.enabled ? 'bg-gold' : 'bg-gray-600'
                                    }`}
                                  >
                                    <span
                                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        setting.enabled ? 'translate-x-6' : 'translate-x-1'
                                      }`}
                                    />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="dark-glass p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">API Settings</h3>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">API Key</label>
                                <div className="flex space-x-2">
                                  <input type="password" value="gf_live_1a2b3c4d5e6f7g8h9i0j" className="flex-1 px-3 py-2 bg-dark border border-dark-border rounded-lg text-white" readOnly />
                                  <button className="btn-secondary">
                                    <EyeOff className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Webhook URL</label>
                                <input type="url" value="https://your-crm.com/webhook/goldflow" className="w-full px-3 py-2 bg-dark border border-dark-border rounded-lg text-white" readOnly />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {/* Portal Footer */}
              <div className="bg-dark border-t border-dark-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Demo environment - No real lead data stored
                  </div>
                  <a 
                    href="https://calendly.com/sundream/15-minute-free-consultation-clone" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
                  >
                    Book a Private Demo →
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
