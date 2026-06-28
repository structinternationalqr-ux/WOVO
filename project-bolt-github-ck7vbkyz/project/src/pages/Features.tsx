import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CircleUser as UserCircle, Rocket, Palette, Smartphone, Search, Timer, Monitor, Globe } from 'lucide-react';

const features = [
  {
    icon: UserCircle,
    titleKey: 'features.card1Title',
    descKey: 'features.card1Desc',
  },
  {
    icon: Rocket,
    titleKey: 'features.card2Title',
    descKey: 'features.card2Desc',
  },
  {
    icon: Palette,
    titleKey: 'features.card3Title',
    descKey: 'features.card3Desc',
  },
  {
    icon: Smartphone,
    titleKey: 'features.card4Title',
    descKey: 'features.card4Desc',
  },
  {
    icon: Search,
    titleKey: 'features.card5Title',
    descKey: 'features.card5Desc',
  },
  {
    icon: Timer,
    titleKey: 'features.card6Title',
    descKey: 'features.card6Desc',
  },
  {
    icon: Monitor,
    titleKey: 'features.card7Title',
    descKey: 'features.card7Desc',
  },
  {
    icon: Globe,
    titleKey: 'features.card8Title',
    descKey: 'features.card8Desc',
  },
];

export default function Features() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-0 w-96 h-96 bg-white/[0.025] rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 left-0 w-80 h-80 bg-white/[0.02] rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-platinum mb-6">
            {t('features.title')}
          </h1>
          <p className="text-silver/70 text-xl sm:text-2xl max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="relative h-full glass rounded-2xl p-8 lg:p-10 card-hover glow-border overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-platinum" />
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-semibold text-platinum mb-4">
                    {t(feature.titleKey) || feature.titleKey}
                  </h3>
                  <p className="text-silver/70 text-base lg:text-lg leading-relaxed">
                    {t(feature.descKey) || feature.descKey}
                  </p>
                </div>

                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-platinum text-center mb-16">
            {t('features.processTitle') || 'How It Works'}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: t('features.step1Title') || 'Discovery', desc: t('features.step1Desc') || 'We discuss your vision, goals, and requirements in detail.' },
              { step: '02', title: t('features.step2Title') || 'Design', desc: t('features.step2Desc') || 'I create mockups and prototypes for your approval.' },
              { step: '03', title: t('features.step3Title') || 'Development', desc: t('features.step3Desc') || 'Your site is built with clean, modern, and scalable code.' },
              { step: '04', title: t('features.step4Title') || 'Delivery', desc: t('features.step4Desc') || 'Final testing, deployment, and handover with full support.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileInView={{ scale: [0.8, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="text-6xl font-bold text-white/5 mb-4"
                >
                  {item.step}
                </motion.div>
                <h3 className="text-2xl font-semibold text-platinum mb-2">{item.title}</h3>
                <p className="text-base text-silver/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32"
        >
          <div className="glass rounded-2xl p-10 lg:p-16 glow-border relative overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-20 -right-20 w-40 h-40 border border-white/5 rounded-full"
            />
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-platinum mb-6">
                  {t('features.whyTitle') || 'Why Choose WOVO?'}
                </h2>
                <p className="text-silver/70 text-lg leading-relaxed mb-8">
                  {t('features.whyDesc') || 'We focus on delivering clean, fast, and modern websites that help your business grow. No unnecessary complexity — just results.'}
                </p>
                <div className="space-y-4">
                  {[
                    t('features.why1') || 'Transparent pricing with no hidden fees',
                    t('features.why2') || 'Direct communication throughout the project',
                    t('features.why3') || 'Modern tech stack for optimal performance',
                    t('features.why4') || 'Fast delivery without compromising quality',
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-platinum/50" />
                      <span className="text-silver/80">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Modern workspace"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
