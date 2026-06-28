import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, CheckCircle, MessageSquare, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const mailtoLink = `mailto:wovo.website.developer@gmail.com?subject=${encodeURIComponent(
      `New Contact Form Message from ${formData.name || 'Visitor'}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name || 'Not provided'}\nEmail: ${formData.email || 'Not provided'}\n\nMessage:\n${formData.message || 'No message'}`
    )}`;
    window.location.href = mailtoLink;

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.02, 0.03, 0.02] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-platinum mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-silver/70 text-xl sm:text-2xl max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-8 lg:p-10 glow-border">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle className="w-20 h-20 text-platinum mb-6" />
                  <h3 className="text-2xl font-semibold text-platinum mb-3">
                    {t('contact.success')}
                  </h3>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-base font-medium text-silver mb-2">
                      {t('contact.formName')}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-graphite/50 border border-white/10 text-platinum placeholder:text-silver/30 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-silver mb-2">
                      {t('contact.formEmail')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-graphite/50 border border-white/10 text-platinum placeholder:text-silver/30 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-silver mb-2">
                      {t('contact.formMessage')}
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-graphite/50 border border-white/10 text-platinum placeholder:text-silver/30 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all resize-none"
                      placeholder=""
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2 py-4"
                  >
                    <Send className="w-4 h-4" />
                    {t('contact.formSubmit')}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-semibold text-platinum mb-8 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-silver" />
                {t('contact.direct')}
              </h3>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:wovo.website.developer@gmail.com"
                className="group flex items-center gap-4 p-6 rounded-xl glass hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                    <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#EA4335"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-silver/50 mb-1">{t('contact.email')}</p>
                  <p className="text-platinum font-medium text-lg">wovo.website.developer@gmail.com</p>
                </div>
              </a>

              <a
                href="https://instagram.com/wovo_official"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 rounded-xl glass hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-grad)" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="5" stroke="url(#ig-grad)" strokeWidth="2"/>
                    <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad)"/>
                    <defs>
                      <linearGradient id="ig-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#f09433"/>
                        <stop offset="0.25" stopColor="#e6683c"/>
                        <stop offset="0.5" stopColor="#dc2743"/>
                        <stop offset="0.75" stopColor="#cc2366"/>
                        <stop offset="1" stopColor="#bc1888"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-silver/50 mb-1">{t('contact.instagram')}</p>
                  <p className="text-platinum font-medium text-lg">@wovo_official</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-6 rounded-xl glass">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-platinum" />
                </div>
                <div>
                  <p className="text-sm text-silver/50 mb-1">{t('contact.location')}</p>
                  <p className="text-platinum font-medium text-lg">{t('contact.locationValue')}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 rounded-xl glass">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-platinum" />
                </div>
                <div>
                  <p className="text-sm text-silver/50 mb-1">{t('contact.responseTime')}</p>
                  <p className="text-platinum font-medium text-lg">{t('contact.responseTimeValue')}</p>
                </div>
              </div>
            </div>

            <div className="relative mt-12 p-8 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <div className="relative">
                <p className="text-base text-silver/60 leading-relaxed">
                  {t('contact.responseNote')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
