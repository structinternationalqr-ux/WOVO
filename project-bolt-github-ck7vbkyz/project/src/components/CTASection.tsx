import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-platinum mb-4">
            {t('ctaSection.title')}
          </h2>
          <p className="text-silver/70 text-lg sm:text-xl max-w-xl mx-auto">
            {t('ctaSection.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4"
          >
            {t('ctaSection.button')}
            <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="flex flex-col items-center gap-3 mt-4">
            <a
              href="mailto:wovo.website.developer@gmail.com"
              className="flex items-center gap-2 text-sm text-silver/60 hover:text-platinum transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#EA4335"/>
              </svg>
              <span>wovo.website.developer@gmail.com</span>
            </a>
            <a
              href="https://instagram.com/wovo_official"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-silver/60 hover:text-platinum transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-cta-grad)" strokeWidth="2"/>
                <circle cx="12" cy="12" r="5" stroke="url(#ig-cta-grad)" strokeWidth="2"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-cta-grad)"/>
                <defs>
                  <linearGradient id="ig-cta-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f09433"/>
                    <stop offset="0.25" stopColor="#e6683c"/>
                    <stop offset="0.5" stopColor="#dc2743"/>
                    <stop offset="0.75" stopColor="#cc2366"/>
                    <stop offset="1" stopColor="#bc1888"/>
                  </linearGradient>
                </defs>
              </svg>
              <span>@wovo_official</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
