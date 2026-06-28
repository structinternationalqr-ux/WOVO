import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Gem, Shield, Cpu, Network, Globe, BarChart2, Star, Headphones, Monitor, MousePointer } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';

export default function Home() {
  const { t } = useTranslation();

  const valueProps = [
    { icon: Rocket, label: 'Fast Turnaround' },
    { icon: Star, label: 'Modern Aesthetics' },
    { icon: Shield, label: 'Transparent Process' },
    { icon: Cpu, label: 'Clean Code' },
    { icon: Network, label: 'Scalable Architecture' },
  ];

  const services = [
    { icon: Globe, title: 'Web Development', desc: 'Custom websites built with modern technologies and best practices.' },
    { icon: BarChart2, title: 'SEO Ready', desc: 'Optimized structure to help you rank higher on search engines.' },
    { icon: Gem, title: 'Quality First', desc: 'Pixel-perfect implementation with attention to every detail.' },
    { icon: Headphones, title: 'Clear Communication', desc: 'Regular updates and transparent progress throughout the project.' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Effects — white/gray only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-white/[0.025] rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/3 w-[350px] h-[350px] bg-white/[0.02] rounded-full blur-[100px]"
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -40, 0], opacity: [0.06, 0.2, 0.06] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: `${10 + i * 12}%`, top: `${15 + (i % 4) * 20}%` }}
          />
        ))}
      </div>

      {/* Hero Section — extra top padding for navbar breathing room */}
      <section className="relative min-h-screen flex items-center pt-36 md:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-platinum tracking-wide"
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Modern Web Development</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  <span className="text-platinum">{t('hero.headline').split(',')[0]},</span>
                  <br />
                  <span className="text-gradient">{t('hero.headline').split(',')[1]}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-lg sm:text-xl text-silver/85 max-w-xl leading-relaxed"
                >
                  {t('hero.subheadline')}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/features" className="btn-primary inline-flex items-center gap-2">
                  {t('hero.cta')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/projects"
                  className="px-8 py-3 rounded-lg font-medium text-silver/85 hover:text-platinum transition-all duration-300 border border-white/10 hover:border-white/30 hover:bg-white/5"
                >
                  View Projects
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap gap-5 pt-2"
              >
                {valueProps.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="flex items-center gap-2 text-sm text-silver/65"
                  >
                    <item.icon className="w-4 h-4 text-silver/50" />
                    <span>{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* 3D Animated Computer — enhanced depth */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative perspective-1000"
            >
              <motion.div
                animate={{ y: [0, -12, 0], rotateY: [-3, 3, -3], rotateX: [1, -1, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="relative preserve-3d"
              >
                <div className="relative mx-auto w-full max-w-lg">
                  {/* Monitor glow base */}
                  <div className="absolute inset-0 rounded-2xl bg-white/[0.03] blur-2xl scale-105" />

                  {/* Screen Bezel */}
                  <div className="relative bg-graphite rounded-t-2xl p-2 shadow-2xl border border-white/10">
                    <div className="bg-charcoal rounded-xl overflow-hidden aspect-[16/10] relative">
                      {/* Browser Chrome */}
                      <div className="h-8 bg-graphite/80 flex items-center px-3 gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="h-5 bg-white/5 rounded-md flex items-center px-2">
                            <span className="text-[10px] text-silver/30">wovo-studio.bolt.new</span>
                          </div>
                        </div>
                      </div>

                      {/* Scrolling content */}
                      <div className="relative h-[calc(100%-2rem)] overflow-hidden">
                        <motion.div
                          animate={{ y: ['0%', '-50%'] }}
                          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-0"
                        >
                          <div className="h-full bg-gradient-to-br from-slate via-graphite to-void p-4 space-y-3">
                            <div className="h-6 w-2/3 bg-white/10 rounded-lg" />
                            <div className="h-3 w-1/2 bg-white/5 rounded" />
                            <div className="h-3 w-3/4 bg-white/5 rounded" />
                            <div className="flex gap-2 mt-4">
                              <div className="h-8 w-24 bg-white/10 rounded-lg" />
                              <div className="h-8 w-24 bg-white/5 rounded-lg" />
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-4">
                              {[1, 2, 3].map((j) => (
                                <div key={j} className="aspect-square bg-white/[0.06] rounded-lg p-2">
                                  <div className="h-2 w-2 rounded-full bg-white/20 mb-1" />
                                  <div className="h-2 w-full bg-white/5 rounded" />
                                </div>
                              ))}
                            </div>
                            <div className="space-y-2 mt-4">
                              <div className="h-20 bg-white/[0.03] rounded-lg" />
                              <div className="h-20 bg-white/[0.03] rounded-lg" />
                              <div className="grid grid-cols-2 gap-2">
                                <div className="h-16 bg-white/[0.03] rounded-lg" />
                                <div className="h-16 bg-white/[0.03] rounded-lg" />
                              </div>
                            </div>
                            {/* Duplicate for seamless loop */}
                            <div className="h-6 w-2/3 bg-white/10 rounded-lg mt-4" />
                            <div className="h-3 w-1/2 bg-white/5 rounded" />
                            <div className="grid grid-cols-3 gap-2 mt-4">
                              {[4, 5, 6].map((j) => (
                                <div key={j} className="aspect-square bg-white/[0.06] rounded-lg" />
                              ))}
                            </div>
                            <div className="space-y-2 mt-4">
                              <div className="h-20 bg-white/[0.03] rounded-lg" />
                              <div className="h-20 bg-white/[0.03] rounded-lg" />
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Stand */}
                  <div className="mx-auto w-24 h-8 bg-graphite border-x border-white/5" />
                  <div className="mx-auto w-40 h-3 bg-graphite rounded-b-lg border border-white/5 shadow-lg" />

                  {/* Floating badges */}
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute -top-6 -right-6 w-14 h-14 glass rounded-2xl flex items-center justify-center shadow-glow border border-white/10"
                  >
                    <Monitor className="w-6 h-6 text-platinum/70" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute -bottom-4 -left-6 w-12 h-12 glass rounded-xl flex items-center justify-center border border-white/10"
                  >
                    <MousePointer className="w-5 h-5 text-platinum/70" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute top-1/3 -right-8 w-11 h-11 glass rounded-xl flex items-center justify-center border border-white/10"
                  >
                    <Rocket className="w-5 h-5 text-platinum/70" />
                  </motion.div>
                </div>

                {/* Orbiting rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/[0.04] rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[145%] h-[145%] border border-white/[0.025] rounded-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '3', label: 'Clients Served' },
              { value: '92%', label: 'Client Satisfaction' },
              { value: '12h', label: 'Response Time' },
              { value: '3', label: 'Languages' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileInView={{ scale: [0.5, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold text-platinum mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-base text-silver/55">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-platinum mb-4">What We Offer</h2>
            <p className="text-silver/65 text-lg max-w-xl mx-auto">
              A focused set of services designed to deliver results.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glass rounded-2xl p-8 glow-border group cursor-pointer relative overflow-hidden"
              >
                {/* 3D corner highlight on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-2xl" />

                <div className="w-14 h-14 rounded-xl bg-white/[0.07] flex items-center justify-center mb-6 group-hover:bg-white/[0.12] transition-colors duration-300 relative">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <service.icon className="w-7 h-7 text-platinum relative z-10" />
                </div>
                <h3 className="text-xl font-semibold text-platinum mb-2">{service.title}</h3>
                <p className="text-silver/65 text-base">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-16 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs text-silver/40 uppercase tracking-[0.3em]"
          >
            Technologies We Use
          </motion.p>
        </div>
        <div className="relative">
          <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap gap-12">
            {[
              'React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vite',
              'Framer Motion', 'Supabase', 'Node.js',
              'React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vite',
              'Framer Motion', 'Supabase', 'Node.js',
            ].map((tech, i) => (
              <span
                key={i}
                className="text-xl font-bold text-white/[0.07] hover:text-white/20 transition-colors cursor-default select-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
