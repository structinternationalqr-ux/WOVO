import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, HelpCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';

const tiers = [
  {
    nameKey: 'pricing.tier1Title',
    priceKey: 'pricing.tier1Price',
    descKey: 'pricing.tier1Desc',
    features: [
      'pricing.tier1Feature1',
      'pricing.tier1Feature2',
      'pricing.tier1Feature3',
      'pricing.tier1Feature4',
    ],
    popular: false,
    available: true,
  },
  {
    nameKey: 'pricing.tier2Title',
    priceKey: 'pricing.tier2Price',
    descKey: 'pricing.tier2Desc',
    features: [
      'pricing.tier2Feature1',
      'pricing.tier2Feature2',
      'pricing.tier2Feature3',
      'pricing.tier2Feature4',
    ],
    popular: true,
    available: true,
  },
  {
    nameKey: 'pricing.tier3Title',
    priceKey: 'pricing.tier3Price',
    descKey: 'pricing.tier3Desc',
    features: [
      'pricing.tier3Feature1',
      'pricing.tier3Feature2',
      'pricing.tier3Feature3',
      'pricing.tier3Feature4',
    ],
    popular: false,
    available: false,
  },
];

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Most projects are completed within 2-4 weeks depending on complexity and scope.',
  },
  {
    q: 'Do you offer ongoing maintenance?',
    a: 'Yes, I offer monthly maintenance packages to keep your site updated and secure.',
  },
  {
    q: 'Can I request changes after delivery?',
    a: 'Absolutely. Minor revisions are included, and larger changes can be discussed.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Bank transfer and major digital payment platforms are accepted.',
  },
];

export default function Pricing() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/[0.015] rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-platinum mb-6">
            {t('pricing.title')}
          </h1>
          <p className="text-silver/70 text-xl sm:text-2xl max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-16"
        >
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-silver/60">
            <Sparkles className="w-3.5 h-3.5" />
            {t('pricing.disclaimer')}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.nameKey}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative ${tier.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              <div
                className={`h-full rounded-2xl p-8 lg:p-10 transition-all duration-500 relative ${
                  !tier.available
                    ? 'opacity-40 grayscale border border-white/10'
                    : tier.popular
                    ? 'bg-gradient-to-b from-white/10 to-transparent border border-white/20 shadow-glow'
                    : 'glass glow-border card-hover'
                }`}
              >
                {!tier.available && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 rounded-2xl">
                    <div className="bg-void/80 px-6 py-3 rounded-xl border border-white/10">
                      <span className="text-platinum font-bold text-lg flex items-center gap-2">
                        <X className="w-5 h-5" />
                        Currently Unavailable
                      </span>
                    </div>
                  </div>
                )}

                {tier.popular && tier.available && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-platinum text-void text-xs font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-platinum mb-3">
                      {t(tier.nameKey)}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl lg:text-5xl font-bold text-platinum">
                        {t(tier.priceKey)}
                      </span>
                      <span className="text-sm text-silver/50">SAR</span>
                    </div>
                  </div>

                  <p className="text-base text-silver/60 leading-relaxed">
                    {t(tier.descKey)}
                  </p>

                  <ul className="space-y-4">
                    {tier.features.map((featureKey, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-platinum/70 flex-shrink-0 mt-0.5" />
                        <span className="text-base text-silver/80">{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.available && (
                    <Link
                      to="/contact"
                      className={`block w-full text-center py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        tier.popular
                          ? 'bg-platinum text-void hover:bg-platinum/90 hover:shadow-glow'
                          : 'btn-primary'
                      }`}
                    >
                      {t('pricing.cta')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-platinum text-center mb-16">
            {t('pricing.compareTitle') || 'Compare Plans'}
          </h2>
          <div className="glass rounded-2xl overflow-hidden glow-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-6 py-4 text-platinum font-semibold">Feature</th>
                    <th className="text-center px-6 py-4 text-platinum font-semibold">Essential</th>
                    <th className="text-center px-6 py-4 text-platinum font-semibold">Professional</th>
                    <th className="text-center px-6 py-4 text-silver/40 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Responsive Design', essential: true, professional: true, enterprise: true },
                    { feature: 'Up to 5 Pages', essential: true, professional: true, enterprise: true },
                    { feature: 'Basic SEO', essential: true, professional: true, enterprise: true },
                    { feature: 'Contact Form', essential: true, professional: true, enterprise: true },
                    { feature: 'Custom Animations', essential: false, professional: true, enterprise: true },
                    { feature: 'Advanced Forms', essential: false, professional: true, enterprise: true },
                    { feature: 'Social Media Integration', essential: false, professional: true, enterprise: true },
                    { feature: 'Multilingual Support', essential: false, professional: false, enterprise: true },
                    { feature: 'Priority Support', essential: false, professional: false, enterprise: true },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="px-6 py-3 text-silver/80">{row.feature}</td>
                      <td className="text-center px-6 py-3">
                        {row.essential ? <Check className="w-5 h-5 text-platinum mx-auto" /> : <span className="text-silver/30">—</span>}
                      </td>
                      <td className="text-center px-6 py-3">
                        {row.professional ? <Check className="w-5 h-5 text-platinum mx-auto" /> : <span className="text-silver/30">—</span>}
                      </td>
                      <td className="text-center px-6 py-3">
                        {row.enterprise ? <Check className="w-5 h-5 text-silver/40 mx-auto" /> : <span className="text-silver/30">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-platinum text-center mb-16">
            {t('pricing.faqTitle') || 'Frequently Asked Questions'}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-silver/40 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-platinum mb-2">{faq.q}</h3>
                    <p className="text-sm text-silver/60">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <CTASection />
    </div>
  );
}
