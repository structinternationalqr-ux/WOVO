import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-white/5 bg-charcoal/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white/[0.05] border border-white/10 p-1.5">
              <img
                src="/Gemini_Generated_Image_10pseu10pseu10ps-removebg-preview.png"
                alt="WOVO"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <a
              href="mailto:wovo.website.developer@gmail.com"
              className="flex items-center gap-2 text-sm text-silver/70 hover:text-platinum transition-colors"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#EA4335"/>
              </svg>
              <span className="hidden sm:inline">wovo.website.developer@gmail.com</span>
            </a>
            <a
              href="https://instagram.com/wovo_official"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-silver/70 hover:text-platinum transition-colors"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-foot)" strokeWidth="2"/>
                <circle cx="12" cy="12" r="5" stroke="url(#ig-foot)" strokeWidth="2"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-foot)"/>
                <defs>
                  <linearGradient id="ig-foot" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
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

          <p className="text-xs text-silver/50">
            &copy; {new Date().getFullYear()} WOVO. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
